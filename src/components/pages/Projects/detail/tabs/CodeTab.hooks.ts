import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import { getDemoLoader } from '../../demos/demoRegistry';
import type { CodeHighlight as CodeHighlightType } from '../../types';

type LazyDemoComponent = React.LazyExoticComponent<
  React.ComponentType<Record<string, never>>
>;

// 데모 로딩 로직을 관리하는 커스텀 훅
export function useDemoLoader(demoPath: string | undefined, activeTab: string) {
  const [shouldLoadDemo, setShouldLoadDemo] = useState(false);
  const [LazyDemoComponent, setLazyDemoComponent] =
    useState<LazyDemoComponent | null>(null);
  const [enableCodeObserver, setEnableCodeObserver] = useState(false);

  // 탭 전환 시 상태 초기화
  useEffect(() => {
    setShouldLoadDemo(false);
    setLazyDemoComponent(null);
    setEnableCodeObserver(false);
  }, [activeTab]);

  // 데모 로드
  useEffect(() => {
    if (!demoPath) {
      setShouldLoadDemo(false);
      setLazyDemoComponent(null);
      setEnableCodeObserver(true);
      return;
    }

    const loader = getDemoLoader(demoPath);
    if (loader) {
      setLazyDemoComponent(React.lazy(loader));
      setShouldLoadDemo(true);
      setEnableCodeObserver(false);
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
  const [localActiveTab, setLocalActiveTab] = useState(
    () => codeHighlights[0]?.title || ''
  );

  const activeTab = activeSubTab ?? localActiveTab;
  const setActiveTab = onSubTabChange ?? setLocalActiveTab;

  // codeHighlights가 변경되었을 때 현재 탭이 유효한지 확인
  useEffect(() => {
    if (
      codeHighlights.length > 0 &&
      !codeHighlights.find(h => h.title === activeTab)
    ) {
      setActiveTab(codeHighlights[0].title);
    }
  }, [codeHighlights, activeTab, setActiveTab]);

  const activeHighlight = useMemo(
    () => codeHighlights.find(highlight => highlight.title === activeTab),
    [codeHighlights, activeTab]
  );

  return {
    activeTab,
    setActiveTab,
    activeHighlight,
  };
}

