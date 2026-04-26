'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { debounce } from '../../../../utils/debounce';
import { useEventCallback } from '../../../../utils/useEventCallback';
import type { TabItem } from '../common.types';
import { useIndicator } from './useIndicator';
import { useScroll } from './useScroll';
import { useTabNavigation } from './useTabNavigation';
import { useTabObservers } from './useTabObservers';

export interface UseSecondaryTabProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  uniqueId: string;
}

export const useSecondaryTab = ({
  tabs,
  activeTab,
  onTabChange,
  uniqueId,
}: UseSecondaryTabProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const isInitialMountRef = useRef(true);
  const isDocumentHiddenRef = useRef(false);

  const tabIdToIndex = useMemo(() => {
    const map = new Map<string, number>();
    tabs.forEach((tab, index) => {
      map.set(tab.id, index);
    });
    return map;
  }, [tabs]);

  const {
    indicatorStyle,
    updateIndicatorState,
    scheduleIndicatorUpdate,
    indicatorUpdateTimeoutRef,
  } = useIndicator({
    tabListRef,
    activeTab,
    isInitialMountRef,
  });

  const {
    scrollState,
    scrollSelectedIntoView,
    updateScrollState,
    handleArrowClick,
    scrollAnimationCancelRef,
  } = useScroll({
    scrollContainerRef,
    tabListRef,
    activeTab,
    tabs,
    tabIdToIndex,
    isInitialMountRef,
    isDocumentHiddenRef,
    scheduleIndicatorUpdate,
    uniqueId,
  });

  const { handleTabClick, handleButtonKeydown, handleButtonFocusSync } =
    useTabNavigation({
      tabs,
      activeTab,
      onTabChange,
      uniqueId,
    });

  const debouncedResizeHandler = useMemo(
    () =>
      debounce(() => {
        if (isDocumentHiddenRef.current) return;
        if (isInitialMountRef.current) return;
        if (scrollContainerRef.current) {
          updateIndicatorState('handleResize');
          updateScrollState();
        }
      }, 166),
    [updateIndicatorState, updateScrollState]
  );

  const handleResize = useEventCallback(
    debouncedResizeHandler
  );

  useTabObservers({
    scrollContainerRef,
    tabListRef,
    isInitialMountRef,
    setMounted,
    updateIndicatorState,
    handleResize,
    scrollAnimationCancelRef,
  });

  useEffect(() => {
    const handleVisibility = () => {
      isDocumentHiddenRef.current = document.visibilityState === 'hidden';
      if (!isDocumentHiddenRef.current) {
        requestAnimationFrame(() => {
          updateIndicatorState('visibilityChange');
          updateScrollState();
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [updateIndicatorState, updateScrollState]);

  useEffect(() => {
    if (!mounted || isInitialMountRef.current) {
      return;
    }

    const didScroll = scrollSelectedIntoView(true);
    scheduleIndicatorUpdate(didScroll ? 320 : 50, 'activeTabChange');
  }, [activeTab, mounted, scheduleIndicatorUpdate, scrollSelectedIntoView]);

  useLayoutEffect(() => {
    if (!mounted || !isInitialMountRef.current) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    // 초기 마운트 시 스크롤 설정을 한 프레임 지연하여 DOM이 완전히 렌더링된 후 실행
    requestAnimationFrame(() => {
      scrollSelectedIntoView(false);
      // 스크롤 설정 완료 후 상태 업데이트 (animation: false이므로 즉시 완료)
      requestAnimationFrame(() => {
        updateScrollState();
      });
    });
  }, [mounted, scrollSelectedIntoView, updateScrollState]);

  const onScroll = useCallback(
    (e: Event) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      updateScrollState();
      scheduleIndicatorUpdate(80, 'scrollEvent');
    },
    [updateScrollState, scheduleIndicatorUpdate]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    return () => {
      if (indicatorUpdateTimeoutRef.current) {
        clearTimeout(indicatorUpdateTimeoutRef.current);
        indicatorUpdateTimeoutRef.current = null;
      }
    };
  }, [indicatorUpdateTimeoutRef]);

  const shouldShowTransition = mounted && !isInitialMountRef.current;
  const handleArrowLeft = useCallback(
    () => handleArrowClick('left'),
    [handleArrowClick]
  );
  const handleArrowRight = useCallback(
    () => handleArrowClick('right'),
    [handleArrowClick]
  );

  return {
    tabsRef,
    scrollContainerRef,
    tabListRef,
    isInitialized: mounted,
    indicatorStyle,
    scrollState,
    shouldShowTransition,
    handleArrowLeft,
    handleArrowRight,
    handleTabClick,
    handleButtonKeydown,
    handleButtonFocusSync,
  };
};
