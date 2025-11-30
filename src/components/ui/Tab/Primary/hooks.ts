import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { TabIndicatorState, UseTabIndicatorProps } from './types';

export const useTabIndicator = ({
  activeTab,
  tabs,
  enableTransition = false,
  orientation = 'horizontal',
}: UseTabIndicatorProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<TabIndicatorState>({
    width: 0,
    left: 0,
  });

  const updateIndicator = useCallback(() => {
    if (!tabsRef.current) return;

    const activeTabElement = tabsRef.current.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement;

    if (activeTabElement) {
      const tabsContainer = tabsRef.current;
      const containerRect = tabsContainer.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();

      // 실제 CSS gap 값을 가져와서 보정
      const computedStyle = getComputedStyle(tabsContainer);
      const gapValue = computedStyle.gap;
      const gapOffset = gapValue ? parseFloat(gapValue) / 2 : 0; // gap의 절반만큼 보정

      if (orientation === 'vertical') {
        // Vertical orientation: 실제 CSS padding 값을 가져와서 계산
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.top - containerRect.top - paddingTop - gapOffset,
        });
      } else {
        // Horizontal orientation: 기존 로직
        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.left - containerRect.left - gapOffset,
        });
      }

      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
        setIsInitialized(true);
      }
    }
  }, [activeTab, orientation]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab, tabs, updateIndicator]);

  // Window resize 시 indicator 위치 업데이트
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateIndicator]);

  // 사용자 상호작용 상태 리셋
  useEffect(() => {
    if (isUserInteracting) {
      const timer = setTimeout(() => setIsUserInteracting(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isUserInteracting]);

  const handleTabChange = useCallback(
    (tabId: string, onTabChange: (tabId: string) => void) => {
      setIsUserInteracting(true);
      onTabChange(tabId);
    },
    []
  );

  const shouldShowTransition = enableTransition || isUserInteracting;

  return {
    tabsRef,
    isInitialized,
    indicatorStyle,
    shouldShowTransition,
    handleTabChange,
  };
};
