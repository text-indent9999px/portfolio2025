'use client';

import { useRef, useState } from 'react';
import { useEventCallback } from '../../../../utils/useEventCallback';
import type { IndicatorStyle } from './types';

export interface UseIndicatorProps {
  tabListRef: React.RefObject<HTMLDivElement | null>;
  activeTab: string;
  isInitialMountRef: React.MutableRefObject<boolean>;
}

export function useIndicator({
  tabListRef,
  activeTab,
  isInitialMountRef,
}: UseIndicatorProps) {
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    width: 0,
    left: 0,
  });

  const updateIndicatorState = useEventCallback<(source?: string) => void>(
    (source?: string) => {
      if (isInitialMountRef.current && source !== 'initialMount') {
        return;
      }

    const tabList = tabListRef.current;
    if (!tabList || !activeTab) {
      return;
    }

    const activeTabEl = tabList.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement | null;

    if (!activeTabEl) {
      return;
    }

    const tabWrapper = activeTabEl.closest('.w-fit') as HTMLElement | null;
    if (!tabWrapper) {
      return;
    }

    const startValue = tabWrapper.offsetLeft;
    const tabWidth = activeTabEl.getBoundingClientRect().width;

    setIndicatorStyle(prev => {
      if (prev.width > 0 && tabWidth === 0) {
        return prev;
      }

      let transformOrigin: 'left' | 'right' = 'left';
      if (typeof prev.left === 'number' && prev.left !== startValue) {
        if (prev.left > startValue) {
          transformOrigin = 'right';
        }
      }

      const newIndicatorStyle: IndicatorStyle = {
        left: startValue,
        width: tabWidth,
        transformOrigin,
      };

      if (typeof prev.left !== 'number' || typeof prev.width !== 'number') {
        return newIndicatorStyle;
      }
      const dStart = Math.abs(prev.left - newIndicatorStyle.left);
      const dSize = Math.abs(prev.width - newIndicatorStyle.width);
      if (dStart >= 1 || dSize >= 1) {
        return newIndicatorStyle;
      }
      return prev;
    });
    }
  );

  const indicatorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleIndicatorUpdate = useEventCallback<
    (delay?: number, source?: string) => void
  >((delay: number = 0, source?: string) => {
    if (indicatorUpdateTimeoutRef.current) {
      clearTimeout(indicatorUpdateTimeoutRef.current);
    }
    indicatorUpdateTimeoutRef.current = setTimeout(() => {
      updateIndicatorState(source);
      indicatorUpdateTimeoutRef.current = null;
    }, delay);
  });

  return {
    indicatorStyle,
    updateIndicatorState,
    scheduleIndicatorUpdate,
    indicatorUpdateTimeoutRef,
  };
}
