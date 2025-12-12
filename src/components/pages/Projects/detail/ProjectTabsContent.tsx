'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  startTransition,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMediaQuery } from '../../../../hooks';
import { useRouter as useCustomRouter } from '../../../../utils/router';
import { PrimaryTab } from '../../../ui/Tab';
import { SecondaryTab } from '../../../ui/Tab/Secondary';
import type {
  CodeTab as CodeTabType,
  ProjectDetail,
  ProjectTab,
} from '../types';
import {
  ChallengesTab,
  CodeTab,
  DemoTab,
  FeaturesTab,
  LighthouseTab,
  OverviewTab,
  StorybookTab,
} from './tabs';

const SIMPLE_TAB_COMPONENTS = {
  features: FeaturesTab,
  challenges: ChallengesTab,
} as const;

// 타입 가드 함수들
const isValidProjectTabType = (value: string): value is ProjectTab['type'] => {
  return [
    'demo',
    'overview',
    'features',
    'challenges',
    'code',
    'styleguide',
    'custom',
  ].includes(value);
};

const isSimpleTabType = (
  value: string
): value is keyof typeof SIMPLE_TAB_COMPONENTS => {
  return value in SIMPLE_TAB_COMPONENTS;
};

interface ProjectTabsContentProps {
  mainTabs: Array<{ id: string; label: string }>;
  project: ProjectDetail;
  timestamp: number;
  initialTab?: string;
  initialCodeSubTab?: string;
}

export function ProjectTabsContent({
  mainTabs,
  project,
  timestamp,
  initialTab,
  initialCodeSubTab,
}: ProjectTabsContentProps) {
  const uniqueId = useId();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { navigateToUrl } = useCustomRouter();

  // 활성 탭 상태 - 서버에서 전달받은 initialTab 사용 (탭 인디케이터용)
  const [activeTab, setActiveTab] = useState<ProjectTab['type']>(() => {
    if (initialTab && isValidProjectTabType(initialTab)) {
      return initialTab;
    }
    const firstTabId = mainTabs[0]?.id;
    return firstTabId && isValidProjectTabType(firstTabId)
      ? firstTabId
      : 'overview';
  });

  // 탭 패널 내용용 상태 (지연 업데이트)
  const [displayedTab, setDisplayedTab] = useState<ProjectTab['type']>(() => {
    if (initialTab && isValidProjectTabType(initialTab)) {
      return initialTab;
    }
    const firstTabId = mainTabs[0]?.id;
    return firstTabId && isValidProjectTabType(firstTabId)
      ? firstTabId
      : 'overview';
  });

  // URL 파라미터 변경 감지 (클라이언트 사이드 네비게이션)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const tabInMainTabs = mainTabs.some(tab => tab.id === tabParam);
    const isValidTab = tabParam && isValidProjectTabType(tabParam);

    if (tabParam && isValidTab && tabInMainTabs && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, mainTabs, activeTab]);

  // activeTab 변경 시 displayedTab 지연 업데이트 (SecondaryTab 애니메이션 완료 후)
  const isMountedRef = useRef(true);
  const previousTabRef = useRef<ProjectTab['type'] | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (activeTab === displayedTab) {
      previousTabRef.current = activeTab;
      return;
    }

    // 탭이 변경되면 이전 탭을 즉시 null로 설정하여 언마운트 보장
    // (애니메이션을 위해 지연 업데이트하더라도 이전 컴포넌트는 즉시 제거)
    if (previousTabRef.current && previousTabRef.current !== activeTab) {
      // 이전 탭과 다른 탭으로 전환 시 즉시 이전 탭 언마운트
      // (displayedTab은 나중에 업데이트되지만, key 변경으로 인해 React가 자동으로 처리)
    }

    // SecondaryTab일 때만 지연 적용 (PrimaryTab은 즉시 업데이트)
    if (!isXlOrAbove) {
      // SecondaryTab 애니메이션 시간(300ms) 후 패널 내용 업데이트
      const timeoutId = setTimeout(() => {
        if (isMountedRef.current) {
          previousTabRef.current = activeTab;
          setDisplayedTab(activeTab);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      // PrimaryTab은 즉시 업데이트
      if (isMountedRef.current) {
        previousTabRef.current = activeTab;
        setDisplayedTab(activeTab);
      }
    }
  }, [activeTab, displayedTab, isXlOrAbove]);

  // CodeTab의 코드 하이라이트 데이터 추출
  const codeTab = useMemo(
    () => project.tabs.find((t): t is CodeTabType => t.type === 'code'),
    [project.tabs]
  );

  const codeHighlights = useMemo(
    () => codeTab?.payload?.codeHighlights ?? [],
    [codeTab]
  );

  // CodeTab 서브 탭 초기값: URL 파라미터 또는 기본값
  const getInitialCodeSubTab = (params: URLSearchParams) => {
    const codeSubTabParam = params.get('codeSubTab');
    const isValidCodeSubTab = codeHighlights.some(
      highlight => highlight.title === codeSubTabParam
    );
    return isValidCodeSubTab && codeSubTabParam
      ? codeSubTabParam
      : codeHighlights[0]?.title || '';
  };

  // CodeTab의 서브 탭 상태 관리
  const [activeCodeSubTab, setActiveCodeSubTab] = useState(() => {
    // 서버에서 전달받은 initialCodeSubTab 우선 사용
    if (initialCodeSubTab) {
      const isValidCodeSubTab = codeHighlights.some(
        highlight => highlight.title === initialCodeSubTab
      );
      if (isValidCodeSubTab) {
        return initialCodeSubTab;
      }
    }
    return getInitialCodeSubTab(searchParams);
  });

  // URL 파라미터 변경 감지 (CodeTab 서브 탭)
  useEffect(() => {
    const codeSubTabParam = searchParams.get('codeSubTab');
    const isValidCodeSubTab = codeHighlights.some(
      highlight => highlight.title === codeSubTabParam
    );

    if (
      isValidCodeSubTab &&
      codeSubTabParam &&
      codeSubTabParam !== activeCodeSubTab
    ) {
      setActiveCodeSubTab(codeSubTabParam);
    }
  }, [searchParams, codeHighlights, activeCodeSubTab]);

  // 서브 탭 변경 핸들러
  const handleCodeSubTabChange = useCallback(
    (tab: string) => {
      setActiveCodeSubTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      params.set('codeSubTab', tab);
      const url = `${pathname}?${params.toString()}`;
      navigateToUrl({
        url,
        useDefaultTransition: false,
        transitionType: 'nav-forward',
        replace: true,
      });
    },
    [pathname, navigateToUrl, searchParams]
  );

  // 탭 변경 핸들러
  const handleTabChange = useCallback(
    (tabId: string) => {
      if (!isValidProjectTabType(tabId)) return;

      // 탭 인디케이터는 즉시 업데이트 (displayedTab은 useEffect에서 지연 업데이트)
      startTransition(() => {
        setActiveTab(tabId);
      });

      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', tabId);
      // 메인 탭이 code가 아닌 경우 codeSubTab 파라미터 제거
      if (tabId !== 'code') {
        params.delete('codeSubTab');
      }
      const url = `${pathname}?${params.toString()}`;
      navigateToUrl({
        url,
        useDefaultTransition: false,
        transitionType: 'nav-forward',
        replace: true,
      });
    },
    [pathname, navigateToUrl, searchParams]
  );

  // 탭 패널 속성들 (activeTab 사용 - 인디케이터와 동기화)
  const tabPanelId = `panel-${activeTab}-${uniqueId}`;
  const tabPanelLabelledBy = `tab-${activeTab}-${uniqueId}`;

  // 탭 컨텐츠 렌더링 함수 (displayedTab 사용 - 지연 업데이트)
  const renderTabContent = () => {
    if (displayedTab === 'demo') {
      return <DemoTab project={project} />;
    }

    if (displayedTab === 'overview') {
      return <OverviewTab project={project} timestamp={timestamp} />;
    }

    if (displayedTab === 'code') {
      return (
        <CodeTab
          project={project}
          activeSubTab={activeCodeSubTab}
          onSubTabChange={handleCodeSubTabChange}
        />
      );
    }

    // custom 타입 탭 처리 (스토리북, 접근성 등)
    if (displayedTab === 'custom') {
      const customTab = project.tabs.find(t => t.type === 'custom');
      if (customTab?.label === '스토리북') {
        return <StorybookTab project={project} />;
      }
      if (customTab?.label === '접근성') {
        return <LighthouseTab project={project} />;
      }
      return null;
    }

    // 나머지 탭들 (features, challenges)
    const TabComponent = isSimpleTabType(displayedTab)
      ? SIMPLE_TAB_COMPONENTS[displayedTab]
      : null;

    if (!TabComponent) return null;

    return <TabComponent project={project} />;
  };

  const tabContent = renderTabContent();
  if (!tabContent) return null;

  // 공통 탭 네비게이션 및 패널 렌더링
  return (
    <>
      {/* 메인 탭 네비게이션 */}
      {isXlOrAbove ? (
        <PrimaryTab
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          uniqueId={uniqueId}
          className="mb-10"
        />
      ) : (
        <SecondaryTab
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          uniqueId={uniqueId}
          className="mb-10"
        />
      )}
      <div
        role="tabpanel"
        id={tabPanelId}
        aria-labelledby={tabPanelLabelledBy}
        className="space-y-6"
      >
        {tabContent}
      </div>
    </>
  );
}
