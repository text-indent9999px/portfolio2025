'use client';

import { useEffect } from 'react';

export interface UseTabObserversProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  tabListRef: React.RefObject<HTMLDivElement | null>;
  isInitialMountRef: React.MutableRefObject<boolean>;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  updateIndicatorState: (source?: string) => void;
  updateScrollState: () => void;
  handleResize: () => void;
  scrollAnimationCancelRef: React.MutableRefObject<(() => void) | null>;
}

export function useTabObservers({
  scrollContainerRef,
  tabListRef,
  isInitialMountRef,
  setMounted,
  updateIndicatorState,
  updateScrollState,
  handleResize,
  scrollAnimationCancelRef,
}: UseTabObserversProps) {
  useEffect(() => {
    const container = scrollContainerRef.current;
    const tabList = tabListRef.current;
    if (!container || !tabList) return;

    isInitialMountRef.current = true;

    updateIndicatorState('initialMount');
    updateScrollState();

    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isInitialMountRef.current = false;
      });
    });

    const handleMutation: MutationCallback = records => {
      records.forEach(record => {
        record.removedNodes.forEach(node => {
          if (node instanceof Element && resizeObserver) {
            resizeObserver.unobserve(node);
          }
        });
        record.addedNodes.forEach(node => {
          if (node instanceof Element && resizeObserver) {
            resizeObserver.observe(node);
          }
        });
      });
      handleResize();
    };

    const win = container.ownerDocument.defaultView;
    if (win) {
      win.addEventListener('resize', handleResize);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabList.children).forEach(child => {
        resizeObserver!.observe(child);
      });
      resizeObserver.observe(container);
    }

    let mutationObserver: MutationObserver | null = null;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabList, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (win) {
        win.removeEventListener('resize', handleResize);
      }
      if (scrollAnimationCancelRef.current) {
        scrollAnimationCancelRef.current();
        scrollAnimationCancelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
