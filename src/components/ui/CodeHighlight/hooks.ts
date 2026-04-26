'use client';

import { startTransition, useEffect, useRef, useState } from 'react';

// 진행 중인 요청을 추적하는 전역 맵
interface PendingRequest {
  promise: Promise<string>;
  abortController: AbortController;
  subscribers: Set<() => void>;
  isCompleted: boolean;
  completedAt?: number; // 완료 시각 (메모리 정리용)
  result?: string; // 완료된 요청의 결과값 (캐시용)
  error?: Error; // 실패한 요청의 에러
}

interface CodeFetchState {
  code: string | undefined;
  loading: boolean;
  error: Error | null;
}

const pendingRequests = new Map<string, PendingRequest>();
const MAX_CACHE_SIZE = 50; // 최대 캐시 크기
const CACHE_CLEANUP_INTERVAL = 60000; // 1분마다 정리

let cacheCleanupIntervalId: ReturnType<typeof setInterval> | null = null;

const runPendingRequestsCacheCleanup = () => {
  const now = Date.now();
  const maxAge = 5 * 60 * 1000; // 5분 이상 된 완료된 요청 삭제

  for (const [filename, request] of pendingRequests.entries()) {
    if (
      request.subscribers.size === 0 &&
      request.isCompleted &&
      request.completedAt &&
      now - request.completedAt > maxAge
    ) {
      pendingRequests.delete(filename);
    }
  }

  if (pendingRequests.size > MAX_CACHE_SIZE) {
    const completedRequests = Array.from(pendingRequests.entries())
      .filter(([, req]) => req.isCompleted && req.completedAt)
      .sort((a, b) => (a[1].completedAt || 0) - (b[1].completedAt || 0));

    const toDelete = completedRequests.slice(
      0,
      pendingRequests.size - MAX_CACHE_SIZE
    );
    for (const [filename] of toDelete) {
      pendingRequests.delete(filename);
    }
  }

  if (pendingRequests.size === 0 && cacheCleanupIntervalId !== null) {
    clearInterval(cacheCleanupIntervalId);
    cacheCleanupIntervalId = null;
  }
};

/** 맵에 항목이 생길 때만 주기적 정리 타이머를 시작한다. 맵이 비면 타이머를 끈다. */
const ensurePendingRequestsCleanupScheduled = () => {
  if (typeof window === 'undefined') return;
  if (cacheCleanupIntervalId !== null) return;
  cacheCleanupIntervalId = setInterval(
    runPendingRequestsCacheCleanup,
    CACHE_CLEANUP_INTERVAL
  );
};

/** fetch만 수행 — 전역 맵은 건드리지 않는다. */
const fetchCodeFile = (
  filename: string,
  abortController: AbortController
): Promise<string> => {
  return fetch(`/api/code/${filename}`, {
    signal: abortController.signal,
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load ${filename}`);
    }
    return response.text();
  });
};

const markPendingRequestSuccess = (
  filename: string,
  request: PendingRequest,
  text: string
) => {
  const current = pendingRequests.get(filename);
  // 같은 filename의 더 최신 요청이 이미 들어왔으면 이전 결과를 버린다.
  if (current !== request) {
    return;
  }

  request.isCompleted = true;
  request.completedAt = Date.now();
  request.result = text;
  request.error = undefined;
};

const markPendingRequestFailure = (
  filename: string,
  request: PendingRequest,
  err: unknown
) => {
  const current = pendingRequests.get(filename);
  if (current !== request) {
    return;
  }

  // 취소는 사용자-visible 실패로 남기지 않는다.
  if (err instanceof Error && err.name === 'AbortError') {
    pendingRequests.delete(filename);
    return;
  }

  request.isCompleted = true;
  request.completedAt = Date.now();
  request.error =
    err instanceof Error ? err : new Error(String(err));
};

/** fetch 결과를 맵에 반영한 뒤 동일한 Promise 체인을 반환한다. */
const wireFetchIntoPendingMap = (
  filename: string,
  request: PendingRequest,
  rawPromise: Promise<string>
): Promise<string> => {
  return rawPromise
    .then(text => {
      markPendingRequestSuccess(filename, request, text);
      return text;
    })
    .catch(err => {
      markPendingRequestFailure(filename, request, err);
      throw err;
    });
};

/**
 * 구독 해제 함수 생성
 * unsubscribe 함수 자체를 Set에 저장하여 정확히 삭제할 수 있도록 함
 */
const createUnsubscribe = (
  filename: string,
  request: PendingRequest
): (() => void) => {
  const unsubscribe = () => {
    request.subscribers.delete(unsubscribe);
    if (request.subscribers.size === 0) {
      if (!request.isCompleted) {
        request.abortController.abort();
        pendingRequests.delete(filename);
        if (pendingRequests.size === 0 && cacheCleanupIntervalId !== null) {
          clearInterval(cacheCleanupIntervalId);
          cacheCleanupIntervalId = null;
        }
      }
    }
  };
  return unsubscribe;
};

/**
 * 코드 파일을 가져오는 훅
 *
 * - 즉시 반영: 빈 filename, loading, 캐시 히트(이전 파일 본문이 보이는 것 방지 — sync setState, transition 없음)
 * - 네트워크 완료: startTransition (데이터 표시는 덜 긴급)
 *
 * 이 effect 실행마다 `cancelled` 플래그를 둔다. cleanup에서만 true로 두어
 * Strict Mode의 effect 재실행·언마운트 이후에 끊긴 요청의 resolve/reject가
 * state를 덮어쓰지 않게 한다. (`isMountedRef`는 cleanup 후 다시 true로 돌리지 못해
 * 개발 모드에서 성공해도 로딩이 풀리지 않는 문제가 있었다.)
 *
 * `unsubscribeRef`: effect 본문 **처음에 null로 초기화하지 않는다.** (이전에 그랬을 때)
 * `filename`이 A→B로 바뀌면 React는 **먼저** 이전 effect의 cleanup에서 `unsubscribeRef`로 A 구독을 해제한 뒤
 * B effect가 돈다. 시작 시점에 ref를 비우면 그 전에 실행돼야 할 cleanup이 참조를 잃을 수 있다.
 * 새 구독을 등록할 때만 `unsubscribeRef.current`에 대입하고, 해제는 cleanup에서만 수행한다.
 *
 * 비동기 완료 처리(`bindPromiseToState`)는 이 effect 실행에 캡처된 `filename`과 `currentFilenameRef`로
 * “지금 보고 있는 파일에 대한 응답인지”를 함께 본다.
 */
export const useCodeFetch = (filename: string) => {
  const [state, setState] = useState<CodeFetchState>({
    code: undefined,
    loading: true,
    error: null,
  });
  const currentFilenameRef = useRef<string>(filename);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    const bindPromiseToState = (promise: Promise<string>) => {
      promise
        .then(text => {
          if (cancelled) return;
          if (currentFilenameRef.current !== filename) return;
          startTransition(() => {
            setState({
              code: text,
              loading: false,
              error: null,
            });
          });
        })
        .catch(err => {
          if (err instanceof Error && err.name === 'AbortError') {
            return;
          }

          if (cancelled) return;
          if (currentFilenameRef.current !== filename) return;
          startTransition(() => {
            setState({
              code: undefined,
              loading: false,
              error:
                err instanceof Error ? err : new Error('Failed to load code'),
            });
          });
        });
    };

    if (!filename) {
      setState({
        code: undefined,
        loading: false,
        error: null,
      });
      return;
    }

    currentFilenameRef.current = filename;
    let request = pendingRequests.get(filename);

    if (request?.isCompleted && request.result !== undefined) {
      const cachedResult = request.result;
      setState({
        code: cachedResult,
        loading: false,
        error: null,
      });
      return; // 맵에 구독을 등록하지 않았음 — cleanup 없이 종료
    }

    if (request?.isCompleted && request.error) {
      const cachedError = request.error;
      setState({
        code: undefined,
        loading: false,
        error: cachedError,
      });
      return; // 캐시된 에러만 반영; 구독 없음 — cleanup 불필요
    }

    setState({
      code: undefined,
      loading: true,
      error: null,
    });

    // setState는 pendingRequests를 바꾸지 않음 — 위에서 조회한 `request` 그대로 사용
    if (request && !request.isCompleted) {
      const unsubscribe = createUnsubscribe(filename, request);
      unsubscribeRef.current = unsubscribe;
      request.subscribers.add(unsubscribe);

      bindPromiseToState(request.promise);

      return () => {
        cancelled = true;
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
          unsubscribeRef.current = null;
        }
      };
    }

    const abortController = new AbortController();
    request = {
      promise: Promise.resolve(''),
      abortController,
      subscribers: new Set(),
      isCompleted: false,
    };
    const rawPromise = fetchCodeFile(filename, abortController);
    const requestPromise = wireFetchIntoPendingMap(filename, request, rawPromise);
    request.promise = requestPromise;

    pendingRequests.set(filename, request);
    ensurePendingRequestsCleanupScheduled();

    const unsubscribe = createUnsubscribe(filename, request);
    unsubscribeRef.current = unsubscribe;
    request.subscribers.add(unsubscribe);

    bindPromiseToState(requestPromise);

    return () => {
      cancelled = true;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [filename]);

  return state;
};

/**
 * 다크 모드 감지 훅
 */
export const useThemeDetection = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    const checkTheme = () => {
      const next = document.documentElement.classList.contains('dark');
      setIsDark(next);
    };

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDark;
};
