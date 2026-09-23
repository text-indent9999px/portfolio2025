'use client';

import { useSyncExternalStore } from 'react';

// 마운트 여부는 한 번 정해지면 바뀌지 않으므로 구독할 것이 없다.
const subscribe = () => () => {};

/**
 * 클라이언트에 마운트된 뒤에만 true. 서버 렌더와 하이드레이션 첫 렌더를
 * 클라이언트의 실제 상태와 다르게 맞추고 싶을 때(예: 애니메이션 시작점을
 * 마운트 이후로 미루기) 쓴다. `useEffect` + `setState`로 같은 일을 하면
 * 마운트 직후 불필요한 리렌더가 한 번 더 생긴다.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
