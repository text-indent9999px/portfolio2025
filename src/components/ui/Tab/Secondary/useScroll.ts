'use client';

import { useRef, useState } from 'react';
import { useEventCallback } from '../../../../utils/useEventCallback';
import type { TabItem } from '../common.types';
import { animate } from './animation';
import { EDGE_OVERLAY_WIDTH, EDGE_SCROLL_OFFSET } from './constants';
import type { ScrollState } from './types';

export interface UseScrollProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  tabListRef: React.RefObject<HTMLDivElement | null>;
  activeTab: string;
  tabs: TabItem[];
  tabIdToIndex: Map<string, number>;
  isInitialMountRef: React.MutableRefObject<boolean>;
  isDocumentHiddenRef: React.MutableRefObject<boolean>;
  scheduleIndicatorUpdate: (delay?: number, source?: string) => void;
  uniqueId?: string;
}

export function useScroll({
  scrollContainerRef,
  tabListRef,
  activeTab,
  tabs,
  tabIdToIndex,
  isInitialMountRef,
  isDocumentHiddenRef,
  scheduleIndicatorUpdate,
  uniqueId = '',
}: UseScrollProps) {
  const scrollAnimationCancelRef = useRef<(() => void) | null>(null);

  const scrollStart = 'scrollLeft';

  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
  });

  const getTabsMeta = () => {
    const tabsNode = scrollContainerRef.current;
    if (isDocumentHiddenRef.current) {
      return { tabsMeta: null, tabMeta: null };
    }
    let tabsMeta: {
      clientWidth: number;
      scrollLeft: number;
      scrollTop: number;
      scrollWidth: number;
      top: number;
      bottom: number;
      left: number;
      right: number;
    } | null = null;

    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      };
    }

    let tabMeta: DOMRect | null = null;
    if (tabsNode && activeTab && tabListRef.current) {
      const index = tabIdToIndex.get(activeTab);
      if (index !== undefined) {
        const children = tabListRef.current.children;
        if (children[index]) {
          tabMeta = children[index].getBoundingClientRect();
        }
      }
    }

    return { tabsMeta, tabMeta };
  };

  const scroll = (
    scrollValue: number,
    options: { animation?: boolean } = {},
    cb?: (error: Error | null) => void
  ) => {
    let { animation = true } = options;
    const container = scrollContainerRef.current;
    if (!container) {
      cb?.(new Error('Container not found'));
      return;
    }

    // 초기 마운트 시에는 항상 즉시 스크롤 (애니메이션 없음)
    if (isInitialMountRef.current) {
      animation = false;
    }

    // 음수 스크롤 방지
    const safeScrollValue = Math.max(0, scrollValue);

    if (animation) {
      if (scrollAnimationCancelRef.current) {
        scrollAnimationCancelRef.current();
      }
      scrollAnimationCancelRef.current = animate(
        scrollStart,
        container,
        safeScrollValue,
        { duration: 300 },
        error => {
          scrollAnimationCancelRef.current = null;
          scheduleIndicatorUpdate(50, 'scrollAnimation');
          cb?.(error);
        }
      );
    } else {
      const originalScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = 'auto';
      
      // 초기 마운트 시에는 즉시 스크롤 (RAF 없이)
      if (isInitialMountRef.current) {
        container[scrollStart] = safeScrollValue;
        container.style.scrollBehavior = originalScrollBehavior;
        scheduleIndicatorUpdate(0, 'scrollImmediate');
        cb?.(null);
      } else {
        // 일반적인 경우에는 RAF 사용
        container[scrollStart] = safeScrollValue;
        requestAnimationFrame(() => {
          const currentScroll = container[scrollStart];
          if (Math.abs(currentScroll - safeScrollValue) > 1) {
            container[scrollStart] = safeScrollValue;
          }
          container.style.scrollBehavior = originalScrollBehavior;
          scheduleIndicatorUpdate(0, 'scrollImmediate');
          cb?.(null);
        });
      }
    }
  };

  const scrollSelectedIntoView = useEventCallback(
    (animation: boolean = true) => {
      // 초기 마운트 시에는 항상 즉시 스크롤 (애니메이션 없음)
      // scrollLeft가 0이고 animation이 true면 초기 마운트로 간주
      const container = scrollContainerRef.current;
      const currentScrollLeft = container?.scrollLeft ?? 0;
      const isInitialMount = isInitialMountRef.current || (currentScrollLeft === 0 && animation);
      
      if (isInitialMount) {
        animation = false;
      }

      let didScroll = false;
      const { tabsMeta, tabMeta } = getTabsMeta();
      if (!tabMeta || !tabsMeta) {
        return didScroll;
      }

      const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
      const isFirstTab = currentTabIndex === 0;
      const isLastTab = currentTabIndex === tabs.length - 1;

      // 스크롤 버튼/그라디언트 오버레이를 고려한 가시 영역 계산
      const visibleLeft = tabsMeta.left + EDGE_OVERLAY_WIDTH;
      const visibleRight = tabsMeta.right - EDGE_OVERLAY_WIDTH;

      const needsScroll =
        tabMeta.left < visibleLeft || tabMeta.right > visibleRight;

      if (needsScroll) {
        if (tabMeta.left < visibleLeft) {
          let nextScrollStart =
            tabsMeta.scrollLeft + (tabMeta.left - visibleLeft);
          if (!isFirstTab) {
            nextScrollStart -= EDGE_SCROLL_OFFSET;
          }
          // 음수 스크롤 방지
          nextScrollStart = Math.max(0, nextScrollStart);
          scroll(nextScrollStart, { animation });
          didScroll = true;
        } else if (tabMeta.right > visibleRight) {
          let nextScrollStart =
            tabsMeta.scrollLeft + (tabMeta.right - visibleRight);
          if (!isLastTab) {
            nextScrollStart += EDGE_SCROLL_OFFSET;
          }
          // 음수 스크롤 방지
          nextScrollStart = Math.max(0, nextScrollStart);
          scroll(nextScrollStart, { animation });
          didScroll = true;
        }
      } else {
        if (!isInitialMountRef.current) {
          scheduleIndicatorUpdate(50, 'scrollSelectedIntoView-noScroll');
        }
      }
      return didScroll;
    }
  );

  const updateScrollState = useEventCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft + clientWidth < scrollWidth - 1;

    setScrollState({
      canScrollLeft,
      canScrollRight,
    });
  });

  const handleArrowClick = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const currentScroll = container.scrollLeft;

    if (direction === 'left') {
      container.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth',
      });
    } else {
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return {
    scrollState,
    scrollSelectedIntoView,
    updateScrollState,
    handleArrowClick,
    scrollAnimationCancelRef,
  };
}
