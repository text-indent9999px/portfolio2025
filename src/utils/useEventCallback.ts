'use client';

import { useRef, useLayoutEffect } from 'react';

/**
 * MUI의 useEventCallback과 유사한 훅
 * 이벤트 핸들러를 최적화하여 매 렌더마다 새로운 함수를 생성하지 않도록 합니다.
 * 함수 내부에서는 항상 최신 props/state를 참조할 수 있습니다.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEventCallback<T extends (...args: any[]) => any>(
  fn: T
): T {
  const ref = useRef<T>(fn);

  // ref를 항상 최신 함수로 업데이트 (layout effect로 동기적으로 업데이트)
  useLayoutEffect(() => {
    ref.current = fn;
  });

  // 안정적인 함수 참조 반환
  return ((...args: Parameters<T>) => {
    return ref.current(...args);
  }) as T;
}

