'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
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

  const tabIdToIndex = new Map<string, number>();
  tabs.forEach((tab, index) => {
    tabIdToIndex.set(tab.id, index);
  });

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

  const handleResize = useEventCallback(
    debounce(() => {
      // if (isDocumentHiddenRef.current) return;
      // if (isInitialMountRef.current) return;
      // if (scrollContainerRef.current) {
      //   updateIndicatorState('handleResize');
      //   updateScrollState();
      // }
    }, 166)
  );

  useTabObservers({
    scrollContainerRef,
    tabListRef,
    isInitialMountRef,
    setMounted,
    updateIndicatorState,
    updateScrollState,
    handleResize,
    scrollAnimationCancelRef,
  });

  // useEffect(() => {
  //   const handleVisibility = () => {
  //     isDocumentHiddenRef.current = document.visibilityState === 'hidden';
  //     if (!isDocumentHiddenRef.current) {
  //       requestAnimationFrame(() => {
  //         updateIndicatorState('visibilityChange');
  //       });
  //     }
  //   };
  //   document.addEventListener('visibilitychange', handleVisibility);
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibility);
  //   };
  // }, [updateIndicatorState]);

  useEffect(() => {
    if (!mounted || isInitialMountRef.current) {
      return;
    }

    const didScroll = scrollSelectedIntoView(true);
    scheduleIndicatorUpdate(didScroll ? 320 : 50, 'activeTabChange');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, mounted]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldShowTransition = mounted && !isInitialMountRef.current;

  return {
    tabsRef,
    scrollContainerRef,
    tabListRef,
    isInitialized: mounted,
    indicatorStyle,
    scrollState,
    shouldShowTransition,
    isMoving: false,
    handleTabClick,
    handleButtonKeydown,
    handleButtonFocusSync,
    handleArrowClick,
  };
};
