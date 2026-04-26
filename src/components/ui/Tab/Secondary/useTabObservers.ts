'use client';

import { useEffect } from 'react';

export interface UseTabObserversProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  tabListRef: React.RefObject<HTMLDivElement | null>;
  isInitialMountRef: React.MutableRefObject<boolean>;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  updateIndicatorState: (source?: string) => void;
  handleResize: () => void;
  scrollAnimationCancelRef: React.MutableRefObject<(() => void) | null>;
}

export function useTabObservers({
  scrollContainerRef,
  tabListRef,
  isInitialMountRef,
  setMounted,
  updateIndicatorState,
  handleResize,
  scrollAnimationCancelRef,
}: UseTabObserversProps) {
  useEffect(() => {
    const container = scrollContainerRef.current;
    const tabList = tabListRef.current;
    if (!container || !tabList) return;

    isInitialMountRef.current = true;

    updateIndicatorState('initialMount');
    // 초기 마운트 시 스크롤 상태 업데이트는 useLayoutEffect에서 처리
    // updateScrollState();

    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isInitialMountRef.current = false;
      });
    });

    const win = container.ownerDocument.defaultView;
    if (win) {
      win.addEventListener('resize', handleResize);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver?.disconnect();

      if (win) {
        win.removeEventListener('resize', handleResize);
      }
      if (scrollAnimationCancelRef.current) {
        scrollAnimationCancelRef.current();
        scrollAnimationCancelRef.current = null;
      }
    };
  }, [
    handleResize,
    isInitialMountRef,
    scrollAnimationCancelRef,
    scrollContainerRef,
    setMounted,
    tabListRef,
    updateIndicatorState,
  ]);
}
