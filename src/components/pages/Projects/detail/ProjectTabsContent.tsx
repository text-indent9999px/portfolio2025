'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Skeleton } from '../../../ui/Skeleton';
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
const MAIN_TAB_PANEL_DELAY_MS = 300;
const MAIN_TAB_URL_SYNC_DELAY_MS = 260;
const CODE_SUB_TAB_URL_SYNC_DELAY_MS = 260;

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
  timestamp?: string | number;
  transitionNameMode?: 'forward' | 'back';
  initialTab?: string;
  initialCodeSubTab?: string;
}

export function ProjectTabsContent({
  mainTabs,
  project,
  timestamp,
  transitionNameMode = 'forward',
  initialTab,
  initialCodeSubTab,
}: ProjectTabsContentProps) {
  const uniqueId = useId();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const replaceQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      updater(params);
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      window.history.replaceState(window.history.state, '', url);
    },
    [pathname]
  );

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
  const pendingMainTabRef = useRef<string | null>(null);
  const pendingMainTabUrlSyncRef = useRef<number | null>(null);

  // URL 파라미터 변경 감지 (클라이언트 사이드 네비게이션)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const tabInMainTabs = mainTabs.some(tab => tab.id === tabParam);
    const isValidTab = tabParam && isValidProjectTabType(tabParam);

    if (!tabParam || !isValidTab || !tabInMainTabs) {
      return;
    }

    if (pendingMainTabRef.current && tabParam !== pendingMainTabRef.current) {
      return;
    }

    if (pendingMainTabRef.current === tabParam) {
      pendingMainTabRef.current = null;
    }

    if (tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, mainTabs, activeTab]);

  // activeTab 변경 시 displayedTab 지연 업데이트
  // 인디케이터 이동과 패널 재렌더를 분리해 탭 전환 끝 구간의 끊김을 줄인다.
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

    const timeoutId = setTimeout(() => {
      if (isMountedRef.current) {
        previousTabRef.current = activeTab;
        setDisplayedTab(activeTab);
      }
    }, MAIN_TAB_PANEL_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [activeTab, displayedTab]);

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
  const pendingCodeSubTabRef = useRef<string | null>(null);
  const pendingCodeSubTabUrlSyncRef = useRef<number | null>(null);

  // URL 파라미터 변경 감지 (CodeTab 서브 탭)
  useEffect(() => {
    const codeSubTabParam = searchParams.get('codeSubTab');
    const isValidCodeSubTab = codeHighlights.some(
      highlight => highlight.title === codeSubTabParam
    );

    if (!codeSubTabParam || !isValidCodeSubTab) {
      return;
    }

    // 로컬 클릭 직후 URL 반영 전 stale query(이전 탭)로 롤백되는 것을 방지
    if (
      pendingCodeSubTabRef.current &&
      codeSubTabParam !== pendingCodeSubTabRef.current
    ) {
      return;
    }

    if (pendingCodeSubTabRef.current === codeSubTabParam) {
      pendingCodeSubTabRef.current = null;
    }

    if (codeSubTabParam !== activeCodeSubTab) {
      setActiveCodeSubTab(codeSubTabParam);
    }
  }, [searchParams, codeHighlights, activeCodeSubTab]);

  // 서브 탭 변경 핸들러
  const handleCodeSubTabChange = useCallback(
    (tab: string) => {
      pendingCodeSubTabRef.current = tab;

      if (pendingCodeSubTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingCodeSubTabUrlSyncRef.current);
        pendingCodeSubTabUrlSyncRef.current = null;
      }

      setActiveCodeSubTab(tab);

      pendingCodeSubTabUrlSyncRef.current = window.setTimeout(() => {
        replaceQueryParams(params => {
          params.set('tab', 'code');
          params.set('codeSubTab', tab);
        });
        pendingCodeSubTabUrlSyncRef.current = null;
      }, CODE_SUB_TAB_URL_SYNC_DELAY_MS);
    },
    [replaceQueryParams]
  );

  // 탭 변경 핸들러
  const handleTabChange = useCallback(
    (tabId: string) => {
      if (!isValidProjectTabType(tabId)) return;
      pendingMainTabRef.current = tabId;

      if (pendingMainTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingMainTabUrlSyncRef.current);
        pendingMainTabUrlSyncRef.current = null;
      }

      // 탭 인디케이터는 즉시 업데이트 (displayedTab은 useEffect에서 지연 업데이트)
      setActiveTab(tabId);

      pendingMainTabUrlSyncRef.current = window.setTimeout(() => {
        replaceQueryParams(params => {
          params.set('tab', tabId);
          // 메인 탭이 code가 아닌 경우 codeSubTab 파라미터 제거
          if (tabId !== 'code') {
            params.delete('codeSubTab');
          }
        });
        pendingMainTabUrlSyncRef.current = null;
      }, MAIN_TAB_URL_SYNC_DELAY_MS);
    },
    [replaceQueryParams]
  );

  useEffect(() => {
    return () => {
      if (pendingMainTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingMainTabUrlSyncRef.current);
      }
      if (pendingCodeSubTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingCodeSubTabUrlSyncRef.current);
      }
    };
  }, []);

  // 탭 패널 속성들 (activeTab 사용 - 인디케이터와 동기화)
  const tabPanelId = `panel-${activeTab}-${uniqueId}`;
  const tabPanelLabelledBy = `tab-${activeTab}-${uniqueId}`;

  // 탭 컨텐츠 렌더링 함수 (displayedTab 사용 - 지연 업데이트)
  const renderTabContent = () => {
    if (displayedTab === 'demo') {
      return <DemoTab project={project} />;
    }

    if (displayedTab === 'overview') {
      return (
        <OverviewTab
          project={project}
          timestamp={timestamp}
          transitionNameMode={transitionNameMode}
        />
      );
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

  // 공통 탭 네비게이션 및 패널 렌더링
  return (
    <>
      {/* 메인 탭 네비게이션 */}
      <div className="hidden xl:block">
        <PrimaryTab
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          uniqueId={`${uniqueId}-primary`}
          className="mb-10 mt-8"
        />
      </div>
      <div className="block xl:hidden">
        <SecondaryTab
          tabs={mainTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          uniqueId={`${uniqueId}-secondary`}
          className="mb-5 mt-5"
        />
      </div>
      <div
        role="tabpanel"
        id={tabPanelId}
        aria-labelledby={tabPanelLabelledBy}
        className="space-y-6"
      >
        {tabContent ?? (
          <div className="space-y-5">
            <Skeleton width="34%" height="30px" radius="0.7rem" />
            <div className="flex flex-col gap-4">
              <Skeleton width="100%" height="18px" radius="0.6rem" />
              <Skeleton width="96%" height="18px" radius="0.6rem" />
              <Skeleton width="92%" height="18px" radius="0.6rem" />
              <Skeleton width="98%" height="18px" radius="0.6rem" />
              <Skeleton width="88%" height="18px" radius="0.6rem" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
