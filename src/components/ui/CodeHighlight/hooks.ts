'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { detectLanguage } from './utils';

// 진행 중인 요청을 추적하는 전역 맵
interface PendingRequest {
  promise: Promise<string>;
  abortController: AbortController;
  subscribers: Set<() => void>;
  isCompleted: boolean;
}

const pendingRequests = new Map<string, PendingRequest>();

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
      }
      return text;
    });
};

/**
 * 구독 해제 함수 생성
 */
const createUnsubscribe = (
  filename: string,
  request: PendingRequest
): (() => void) => {
  return () => {
    request.subscribers.delete(() => {});
    if (request.subscribers.size === 0 && !request.isCompleted) {
      request.abortController.abort();
      pendingRequests.delete(filename);
    }
  };
};

/**
 * 코드 파일을 가져오는 훅
 */
export const useCodeFetch = (filename: string) => {
  const [code, setCode] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const currentFilenameRef = useRef<string>(filename);

  useEffect(() => {
    if (!filename) {
      setLoading(false);
      setCode(undefined);
      setError(null);
      return;
    }

    const filenameChanged = currentFilenameRef.current !== filename;
    currentFilenameRef.current = filename;

    isMountedRef.current = true;
    setLoading(true);

    if (filenameChanged) {
      setError(null);
      setCode(undefined);
    }

    // 이미 같은 filename에 대한 요청이 진행 중이면 그 Promise를 재사용
    let request = pendingRequests.get(filename);

    if (!request) {
      const abortController = new AbortController();
      const requestPromise = createFetchRequest(filename, abortController);

      request = {
        promise: requestPromise,
        abortController,
        subscribers: new Set(),
        isCompleted: false,
      };

      pendingRequests.set(filename, request);
    }

    const unsubscribe = createUnsubscribe(filename, request);
    request.subscribers.add(unsubscribe);

    request.promise
      .then(text => {
        if (isMountedRef.current && currentFilenameRef.current === filename) {
          setCode(text);
          setLoading(false);
          setError(null);
        }
      })
      .catch(err => {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        if (isMountedRef.current && currentFilenameRef.current === filename) {
          setError(
            err instanceof Error ? err : new Error('Failed to load code')
          );
          setLoading(false);
        }
      });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [filename]);

  return { code, loading, error };
};

/**
 * 다크 모드 감지 훅
 */
export const useThemeDetection = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};

/**
 * 언어 감지 훅
 */
export const useLanguage = (
  language: string | undefined,
  filename: string
) => {
  return useMemo(
    () => language || detectLanguage(filename),
    [language, filename]
  );
};

