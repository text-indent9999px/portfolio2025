'use client';

import React, { useCallback, useId, useMemo } from 'react';
import { useMediaQuery } from '../../../../../hooks';
import { SectionHeader } from '../../../../ui/Heading';
import { SecondaryTab } from '../../../../ui/Tab/Secondary';
import type { CodeTab as CodeTabType, ProjectDetail } from '../../types';
import { CodeHighlightContent } from './CodeTab.components';
import { useCodeTabState, useDemoLoader } from './CodeTab.hooks';

interface CodeTabProps {
  project: ProjectDetail;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
}

const CodeTab: React.FC<CodeTabProps> = React.memo(
  ({ project, activeSubTab, onSubTabChange }) => {
    const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
    const uniqueId = useId();

    // 코드 탭 데이터 추출
    const codeTab = useMemo(
      () => project.tabs.find((t): t is CodeTabType => t.type === 'code'),
      [project.tabs]
    );

    const codeHighlights = useMemo(
      () => codeTab?.payload?.codeHighlights ?? [],
      [codeTab?.payload?.codeHighlights]
    );

    const title = useMemo(
      () => codeTab?.label ?? '코드 보기',
      [codeTab?.label]
    );

    // 탭 상태 관리
    const { activeTab, setActiveTab, activeHighlight } = useCodeTabState(
      codeHighlights,
      activeSubTab,
      onSubTabChange
    );

    // 데모 로더
    const demoLoader = useDemoLoader(activeHighlight?.demoPath, activeTab);

    // 탭 배열 생성
    const tabsArray = useMemo(
      () =>
        codeHighlights.map(highlight => ({
          id: highlight.title,
          label: highlight.title,
        })),
      [codeHighlights]
    );

    // 탭 변경 핸들러
    const handleTabChange = useCallback(
      (tab: string) => {
        setActiveTab(tab);
      },
      [setActiveTab]
    );

    // 탭 패널 속성
    const tabPanelId = useMemo(
      () => `panel-${activeTab}-${uniqueId}`,
      [activeTab, uniqueId]
    );
    const tabPanelLabelledBy = useMemo(
      () => `tab-${activeTab}-${uniqueId}`,
      [activeTab, uniqueId]
    );

    if (!codeHighlights.length) return null;

    return (
      <div>
        <SectionHeader
          size={2}
          title={title}
          bottomSpacing={isXlOrAbove ? 'xs' : 'sm'}
          visualSize="lg"
        />

        <SecondaryTab
          uniqueId={uniqueId}
          tabs={tabsArray}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-4"
        />

        <div
          role="tabpanel"
          id={tabPanelId}
          aria-labelledby={tabPanelLabelledBy}
          className="border border-surface-level-2 rounded-lg p-4"
        >
          {activeHighlight && (
            <CodeHighlightContent
              highlight={activeHighlight}
              demoLoader={demoLoader}
            />
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.project === nextProps.project &&
    prevProps.activeSubTab === nextProps.activeSubTab &&
    prevProps.onSubTabChange === nextProps.onSubTabChange
);

CodeTab.displayName = 'CodeTab';

export default CodeTab;
