import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { TabIndicatorState, UseTabIndicatorProps } from './types';

// classes.ts의 indicator transition duration-300과 맞춘 상호작용 플래그 유지 시간
const INTERACTION_TRANSITION_MS = 300;

export const useTabIndicator = ({
  activeTab,
  tabs,
  enableTransition = false,
  orientation = 'horizontal',
}: UseTabIndicatorProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  // 첫 측정 이후 indicator를 렌더에 올리기 위한 state.
  // updateIndicator 콜백은 isInitialized를 의존하지 않기 때문에
  // stale setState 중복 호출을 피하려고 ref 가드를 함께 둔다.
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
      // indicator 기준축이 탭 중앙에 맞도록 gap 절반만 보정한다.
      const gapOffset = gapValue ? parseFloat(gapValue) / 2 : 0;

      if (orientation === 'vertical') {
        // Vertical에서는 left 필드가 Y축 translate 값으로 소비된다(classes.ts 참고).
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
    let rafId: number | null = null;

    // resize 연속 이벤트를 프레임 단위로 합쳐 getComputedStyle 호출 빈도를 줄인다.
    const handleResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateIndicator();
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [updateIndicator]);

  // 사용자 상호작용 상태 리셋
  useEffect(() => {
    if (!isUserInteracting) return;
    const timer = setTimeout(
      () => setIsUserInteracting(false),
      INTERACTION_TRANSITION_MS
    );
    return () => clearTimeout(timer);
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
