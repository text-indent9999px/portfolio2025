import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getDemoLoader } from '../../demos/demoRegistry';
import type { CodeHighlight as CodeHighlightType } from '../../types';

type LazyDemoComponent = React.LazyExoticComponent<
  React.ComponentType<Record<string, never>>
>;

// Lazy 컴포넌트 캐시 (메모리 누수 방지)
const lazyComponentCache = new Map<
  string,
  React.LazyExoticComponent<React.ComponentType<Record<string, never>>>
>();

// 데모 로딩 로직을 관리하는 커스텀 훅
export function useDemoLoader(demoPath: string | undefined, activeTab: string) {
  const [shouldLoadDemo, setShouldLoadDemo] = useState(false);
  const [LazyDemoComponent, setLazyDemoComponent] =
    useState<LazyDemoComponent | null>(null);
  const [enableCodeObserver, setEnableCodeObserver] = useState(false);
  const currentDemoPathRef = useRef<string | undefined>(demoPath);
  const isMountedRef = useRef(true);

  // 컴포넌트 마운트 상태 추적
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 탭 전환 시 상태 초기화
  useEffect(() => {
    setShouldLoadDemo(false);
    setLazyDemoComponent(null);
    setEnableCodeObserver(false);
    currentDemoPathRef.current = undefined;
  }, [activeTab]);

  // 데모 로드
  useEffect(() => {
    if (!demoPath) {
      setShouldLoadDemo(false);
      setLazyDemoComponent(null);
      setEnableCodeObserver(true);
      currentDemoPathRef.current = undefined;
      return;
    }

    // 같은 demoPath면 캐시된 컴포넌트 재사용
    if (currentDemoPathRef.current === demoPath) {
      const cached = lazyComponentCache.get(demoPath);
      if (cached) {
        if (isMountedRef.current) {
          setLazyDemoComponent(cached);
          setShouldLoadDemo(true);
          setEnableCodeObserver(false);
        }
        return;
      }
    }

    const loader = getDemoLoader(demoPath);
    if (loader) {
      // 캐시 확인
      let lazyComponent = lazyComponentCache.get(demoPath);

      if (!lazyComponent) {
        // 캐시에 없으면 새로 생성하고 캐시에 저장
        lazyComponent = React.lazy(loader);
        lazyComponentCache.set(demoPath, lazyComponent);
      }

      currentDemoPathRef.current = demoPath;

      if (isMountedRef.current) {
        setLazyDemoComponent(lazyComponent);
        setShouldLoadDemo(true);
        setEnableCodeObserver(false);
      }
    }
  }, [demoPath, activeTab]);

  // 데모 로드 완료 후 Observer 활성화
  useEffect(() => {
    if (!demoPath) return;

    if (shouldLoadDemo && LazyDemoComponent) {
      setEnableCodeObserver(true);
    }
  }, [shouldLoadDemo, LazyDemoComponent, demoPath]);

  return {
    shouldLoadDemo,
    LazyDemoComponent,
    enableCodeObserver,
  };
}

// 탭 관리 로직을 관리하는 커스텀 훅
export function useCodeTabState(
  codeHighlights: CodeHighlightType[],
  activeSubTab?: string,
  onSubTabChange?: (tab: string) => void
) {
  // 로컬 상태로 activeTab 관리 (즉시 업데이트 가능)
  const [activeTab, setActiveTabState] = useState(() => {
    if (activeSubTab) return activeSubTab;
    return codeHighlights[0]?.title || '';
  });

  // activeSubTab prop이 변경되면 동기화 (외부에서 변경된 경우)
  useEffect(() => {
    if (activeSubTab && activeSubTab !== activeTab) {
      setActiveTabState(activeSubTab);
    }
  }, [activeSubTab, activeTab]);

  // setActiveTab: 로컬 상태 먼저 업데이트, 그 다음 부모 콜백 호출
  const setActiveTab = useCallback(
    (tab: string) => {
      setActiveTabState(tab);
      if (onSubTabChange) {
        onSubTabChange(tab);
      }
    },
    [onSubTabChange]
  );

  return {
    activeTab,
    setActiveTab,
  };
}
