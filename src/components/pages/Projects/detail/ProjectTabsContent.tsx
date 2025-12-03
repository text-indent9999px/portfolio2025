'use client';

import { startTransition, useCallback, useId, useMemo, useState } from 'react';
import { useMediaQuery } from '../../../../hooks';
import { PrimaryTab } from '../../../ui/Tab';
import { SecondaryTab } from '../../../ui/Tab/Secondary';
import type { ProjectDetail, ProjectTab } from '../types';
import {
  ChallengesTab,
  CodeTab,
  DemoTab,
  FeaturesTab,
  LighthouseTab,
  OverviewTab,
  StorybookTab,
} from './tabs';

// overview는 timestamp가 필요하므로 별도 처리
// 나머지 탭 타입과 컴포넌트 매핑 (overview, code, styleguide 제외)
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
}

export function ProjectTabsContent({
  mainTabs,
  project,
  timestamp,
}: ProjectTabsContentProps) {
  const uniqueId = useId();
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  const projectId = project.meta.id;

  // 활성 탭 상태
  const [activeTab, setActiveTab] = useState<ProjectTab['type']>(() => {
    const firstTabId = mainTabs[0]?.id;
    return firstTabId && isValidProjectTabType(firstTabId)
      ? firstTabId
      : 'overview';
  });

  // CodeTab의 서브 탭 상태 관리 (프로젝트별)
  const [codeSubTabs, setCodeSubTabs] = useState<Record<string, string>>(
    () => ({})
  );

  // 서브탭 값만 추출하여 useMemo로 메모이제이션 (객체 전체가 아닌 값만 의존)
  const codeSubTabValue = useMemo(
    () => codeSubTabs[projectId],
    [codeSubTabs, projectId]
  );

  // 서브 탭 변경 핸들러들을 useCallback으로 메모이제이션
  const handleCodeSubTabChange = useCallback(
    (tab: string) => {
      setCodeSubTabs(prev => ({ ...prev, [projectId]: tab }));
    },
    [projectId]
  );

  // 탭 변경 핸들러
  const handleTabChange = useCallback((tabId: string) => {
    startTransition(() => {
      if (isValidProjectTabType(tabId)) {
        setActiveTab(tabId);
      }
    });
  }, []);

  // 탭 패널 속성들
  const tabPanelId = `panel-${activeTab}-${uniqueId}`;
  const tabPanelLabelledBy = `tab-${activeTab}-${uniqueId}`;

  // 탭 컨텐츠 렌더링 함수
  const renderTabContent = () => {
    if (activeTab === 'demo') {
      return <DemoTab project={project} />;
    }

    if (activeTab === 'overview') {
      return <OverviewTab project={project} timestamp={timestamp} />;
    }

    if (activeTab === 'code') {
      return (
        <CodeTab
          project={project}
          activeSubTab={codeSubTabValue}
          onSubTabChange={handleCodeSubTabChange}
        />
      );
    }

    // custom 타입 탭 처리 (스토리북, 접근성 등)
    if (activeTab === 'custom') {
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
    const TabComponent = isSimpleTabType(activeTab)
      ? SIMPLE_TAB_COMPONENTS[activeTab]
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
