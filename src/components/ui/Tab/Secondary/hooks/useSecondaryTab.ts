'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TabItem } from '../../common.types';
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
  /**
   * `isInitialMountRef`와 항상 같은 값을 들고 다니는 state 짝. ref는 effect·콜백에서
   * 리렌더 없이 즉시 읽을 때 쓰고, 렌더 중 값이 필요한 `shouldShowTransition`은
   * 반드시 이 state로만 읽는다(ref.current를 렌더 중에 읽으면 안 됨).
   */
  const [isInitialMount, setIsInitialMount] = useState(true);

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
  });

  const { handleTabClick, handleButtonKeydown, handleButtonFocusSync } =
    useTabNavigation({
      tabs,
      activeTab,
      onTabChange,
      uniqueId,
    });

  // 디바운스를 직접 만든다(외부 debounce()에 ref를 읽는 콜백을 넘기면 정적 분석이
  // 렌더 중 ref 접근으로 오인한다). 타이머는 이 useCallback 안에서만 쓰는 구현 세부라
  // ref로 들고, 실제 ref 읽기는 setTimeout 콜백 안, 즉 리사이즈가 실제로 일어난
  // 한참 뒤에만 일어난다. updateIndicatorState/updateScrollState는 이미 안정된
  // 참조라 이 함수 자체도 재생성되지 않는다.
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      if (isDocumentHiddenRef.current) return;
      if (isInitialMountRef.current) return;
      if (scrollContainerRef.current) {
        updateIndicatorState('handleResize');
        updateScrollState();
      }
    }, 166);
  }, [updateIndicatorState, updateScrollState]);

  useEffect(() => {
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useTabObservers({
    scrollContainerRef,
    tabListRef,
    isInitialMountRef,
    setIsInitialMount,
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

  const shouldShowTransition = mounted && !isInitialMount;
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
