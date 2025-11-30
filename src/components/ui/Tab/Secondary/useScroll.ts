'use client';

import { useRef, useState } from 'react';
import { useEventCallback } from '../../../../utils/useEventCallback';
import type { TabItem } from '../common.types';
import { animate } from './animation';
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
}: UseScrollProps) {
  const scrollAnimationCancelRef = useRef<(() => void) | null>(null);

  const scrollStart = 'scrollLeft';
  const start = 'left';
  const end = 'right';

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
    const { animation = true } = options;
    const container = scrollContainerRef.current;
    if (!container) {
      cb?.(new Error('Container not found'));
      return;
    }

    if (animation) {
      if (scrollAnimationCancelRef.current) {
        scrollAnimationCancelRef.current();
      }
      scrollAnimationCancelRef.current = animate(
        scrollStart,
        container,
        scrollValue,
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
      container[scrollStart] = scrollValue;

      requestAnimationFrame(() => {
        const currentScroll = container[scrollStart];
        if (Math.abs(currentScroll - scrollValue) > 1) {
          container[scrollStart] = scrollValue;
        }
        container.style.scrollBehavior = originalScrollBehavior;
        scheduleIndicatorUpdate(0, 'scrollImmediate');
        cb?.(null);
      });
    }
  };

  const scrollSelectedIntoView = useEventCallback(
    (animation: boolean = true) => {
      let didScroll = false;
      const { tabsMeta, tabMeta } = getTabsMeta();
      if (!tabMeta || !tabsMeta) {
        return didScroll;
      }

      const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
      const isFirstTab = currentTabIndex === 0;
      const isLastTab = currentTabIndex === tabs.length - 1;

      const needsScroll =
        tabMeta[start] < tabsMeta[start] || tabMeta[end] > tabsMeta[end];

      if (needsScroll) {
        if (tabMeta[start] < tabsMeta[start]) {
          let nextScrollStart =
            tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
          if (!isFirstTab) {
            nextScrollStart -= 15;
          }
          scroll(nextScrollStart, { animation });
          didScroll = true;
        } else if (tabMeta[end] > tabsMeta[end]) {
          let nextScrollStart =
            tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
          if (!isLastTab) {
            nextScrollStart += 15;
          }
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
