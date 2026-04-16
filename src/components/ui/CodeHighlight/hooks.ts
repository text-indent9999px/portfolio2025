'use client';

import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import { detectLanguage } from './utils';

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

const pendingRequests = new Map<string, PendingRequest>();
const MAX_CACHE_SIZE = 50; // 최대 캐시 크기
const CACHE_CLEANUP_INTERVAL = 60000; // 1분마다 정리

// 주기적으로 완료된 요청 정리
if (typeof window !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5분 이상 된 완료된 요청 삭제

    for (const [filename, request] of pendingRequests.entries()) {
      // 구독자가 없고 완료된 요청이 오래된 경우 삭제
      if (
        request.subscribers.size === 0 &&
        request.isCompleted &&
        request.completedAt &&
        now - request.completedAt > maxAge
      ) {
        pendingRequests.delete(filename);
      }
    }

    // 캐시 크기가 너무 크면 오래된 완료된 요청부터 삭제
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
  }, CACHE_CLEANUP_INTERVAL);
}

/**
 * 코드 파일 fetch 요청 생성
 */
const createFetchRequest = (
  filename: string,
  abortController: AbortController
): Promise<string> => {
  return fetch(`/api/code/${filename}`, {
    signal: abortController.signal,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      return response.text();
    })
    .then(text => {
      const request = pendingRequests.get(filename);
      if (request) {
        request.isCompleted = true;
        request.completedAt = Date.now();
        request.result = text; // 결과값 저장 (캐시)
        request.error = undefined;
      }
      return text;
    })
    .catch(err => {
      const request = pendingRequests.get(filename);
      if (request) {
        request.isCompleted = true;
        request.completedAt = Date.now();
        request.error = err instanceof Error ? err : new Error(String(err));
      }
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
    // 구독자가 없으면:
    // 1. 진행 중인 요청이면 취소하고 삭제
    // 2. 완료된 요청은 캐시로 유지 (다음 요청 시 재사용)
    if (request.subscribers.size === 0) {
      if (!request.isCompleted) {
        request.abortController.abort();
        pendingRequests.delete(filename);
      }
      // 완료된 요청은 Map에 유지하여 캐시로 사용
    }
  };
  return unsubscribe;
};

/**
 * 코드 파일을 가져오는 훅
 */
// 상태를 하나의 객체로 통합하여 단일 업데이트로 처리
interface CodeFetchState {
  code: string | undefined;
  loading: boolean;
  error: Error | null;
}

export const useCodeFetch = (filename: string) => {
  const [state, setState] = useState<CodeFetchState>({
    code: undefined,
    loading: true,
    error: null,
  });
  const isMountedRef = useRef<boolean>(true);
  const currentFilenameRef = useRef<string>(filename);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // 반환값을 useMemo로 메모이제이션하여 불필요한 재렌더링 방지
  const returnValue = useMemo(
    () => ({
      code: state.code,
      loading: state.loading,
      error: state.error,
    }),
    [state.code, state.loading, state.error]
  );

  useEffect(() => {
    // 컴포넌트 마운트 시 마운트 상태 설정
    isMountedRef.current = true;

    if (!filename) {
      if (isMountedRef.current) {
        // 상태를 하나의 객체로 통합하여 단일 업데이트
        setState({
          code: undefined,
          loading: false,
          error: null,
        });
      }
      return;
    }

    const filenameChanged = currentFilenameRef.current !== filename;
    currentFilenameRef.current = filename;

    if (filenameChanged && isMountedRef.current) {
      // 상태를 하나의 객체로 통합하여 단일 업데이트
      setState({
        code: undefined,
        loading: true,
        error: null,
      });
    } else if (isMountedRef.current) {
      // loading만 업데이트 (filename이 변경되지 않은 경우)
      setState(prev => ({ ...prev, loading: true }));
    }

    // 이미 같은 filename에 대한 요청이 있는지 확인
    let request = pendingRequests.get(filename);

    // 완료된 요청이 있고 결과값이 있으면 즉시 사용 (캐시 히트)
    if (request && request.isCompleted && request.result !== undefined) {
      if (isMountedRef.current && currentFilenameRef.current === filename) {
        // 상태를 하나의 객체로 통합하여 단일 업데이트
        const cachedResult = request.result;
        startTransition(() => {
          setState({
            code: cachedResult,
            loading: false,
            error: null,
          });
        });
      }
      return;
    }

    // 완료된 요청이 있지만 에러가 있으면 에러 반환
    if (request && request.isCompleted && request.error) {
      if (isMountedRef.current && currentFilenameRef.current === filename) {
        // 상태를 하나의 객체로 통합하여 단일 업데이트
        const cachedError = request.error;
        startTransition(() => {
          setState({
            code: undefined,
            loading: false,
            error: cachedError,
          });
        });
      }
      return;
    }

    // 진행 중인 요청이 있으면 구독자로 추가
    if (request && !request.isCompleted) {
      const unsubscribe = createUnsubscribe(filename, request);
      unsubscribeRef.current = unsubscribe;
      request.subscribers.add(unsubscribe);

      request.promise
        .then(text => {
          if (isMountedRef.current && currentFilenameRef.current === filename) {
            // 상태를 하나의 객체로 통합하여 단일 업데이트
            startTransition(() => {
              setState({
                code: text,
                loading: false,
                error: null,
              });
            });
          }
        })
        .catch(err => {
          if (err instanceof Error && err.name === 'AbortError') {
            return;
          }

          if (isMountedRef.current && currentFilenameRef.current === filename) {
            // 상태를 하나의 객체로 통합하여 단일 업데이트
            startTransition(() => {
              setState({
                code: undefined,
                loading: false,
                error:
                  err instanceof Error ? err : new Error('Failed to load code'),
              });
            });
          }
        });
      return;
    }

    // 새로운 요청 생성
    const abortController = new AbortController();
    const requestPromise = createFetchRequest(filename, abortController);

    request = {
      promise: requestPromise,
      abortController,
      subscribers: new Set(),
      isCompleted: false,
    };

    pendingRequests.set(filename, request);

    const unsubscribe = createUnsubscribe(filename, request);
    unsubscribeRef.current = unsubscribe;
    request.subscribers.add(unsubscribe);

    request.promise
      .then(text => {
        if (isMountedRef.current && currentFilenameRef.current === filename) {
          // 상태를 하나의 객체로 통합하여 단일 업데이트
          startTransition(() => {
            setState({
              code: text,
              loading: false,
              error: null,
            });
          });
        }
      })
      .catch(err => {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        if (isMountedRef.current && currentFilenameRef.current === filename) {
          // 상태를 하나의 객체로 통합하여 단일 업데이트
          startTransition(() => {
            setState({
              code: undefined,
              loading: false,
              error:
                err instanceof Error ? err : new Error('Failed to load code'),
            });
          });
        }
      });

    return () => {
      isMountedRef.current = false;
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [filename]);

  return returnValue;
};

/**
 * 다크 모드 감지 훅
 */
export const useThemeDetection = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 초기값을 함수로 설정하여 SSR 안전성 확보 및 초기 렌더링 최소화
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const isMountedRef = useRef<boolean>(true);
  const previousIsDarkRef = useRef<boolean>(isDark);

  useEffect(() => {
    isMountedRef.current = true;

    const checkTheme = () => {
      if (isMountedRef.current) {
        const newIsDark = document.documentElement.classList.contains('dark');
        // 값이 실제로 변경된 경우에만 상태 업데이트
        if (previousIsDarkRef.current !== newIsDark) {
          previousIsDarkRef.current = newIsDark;
          setIsDark(newIsDark);
        }
      }
    };

    // 초기 체크는 이미 useState에서 처리했으므로 스킵
    // checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      isMountedRef.current = false;
      observer.disconnect();
    };
  }, []);

  return isDark;
};

/**
 * 언어 감지 훅
 */
export const useLanguage = (language: string | undefined, filename: string) => {
  return useMemo(
    () => language || detectLanguage(filename),
    [language, filename]
  );
};
