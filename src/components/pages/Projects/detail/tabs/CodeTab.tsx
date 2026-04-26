'use client';

import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useMediaQuery } from '../../../../../hooks';
import { SectionHeader } from '../../../../ui/Heading';
import { SecondaryTab } from '../../../../ui/Tab/Secondary';
import type { CodeTab as CodeTabType, ProjectDetail } from '../../types';
import { CodeSection, DemoSection } from './CodeTab.components';
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
    const { activeTab, setActiveTab } = useCodeTabState(
      codeHighlights,
      activeSubTab,
      onSubTabChange
    );

    // 탭 패널 내용용 상태 (지연 업데이트)
    const [displayedTab, setDisplayedTab] = useState(() => {
      if (activeSubTab) return activeSubTab;
      return codeHighlights[0]?.title || '';
    });

    // 코드 로드 완료 상태
    const [isCodeLoaded, setIsCodeLoaded] = useState(true);
    const panelRef = React.useRef<HTMLDivElement>(null);

    // activeSubTab prop 변경 시 displayedTab 동기화
    useEffect(() => {
      if (activeSubTab && activeSubTab !== displayedTab) {
        setIsCodeLoaded(false);
        const timeoutId = setTimeout(() => {
          setDisplayedTab(activeSubTab);
        }, 400);
        return () => clearTimeout(timeoutId);
      }
    }, [activeSubTab, displayedTab]);

    // activeTab 변경 시: 스피너 표시, displayedTab 지연 업데이트
    useEffect(() => {
      if (activeTab === displayedTab) return;

      const timeoutId = setTimeout(() => {
        setIsCodeLoaded(false);
        setDisplayedTab(activeTab);
      }, 400);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [activeTab, displayedTab]);

    // displayedTab에 해당하는 highlight 찾기
    const displayedHighlight = useMemo(
      () => codeHighlights.find(highlight => highlight.title === displayedTab),
      [codeHighlights, displayedTab]
    );

    // 데모 로더
    const demoLoader = useDemoLoader(
      displayedHighlight?.demoPath,
      displayedTab
    );

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
        if (tab === activeTab) return;
        setIsCodeLoaded(false);
        // useCodeTabState 내부에서 onSubTabChange를 호출하므로 여기서 중복 호출하지 않는다.
        setActiveTab(tab);
      },
      [setActiveTab, activeTab]
    );

    // 코드 로드 완료 핸들러 (displayedTab이 변경될 때마다 새로운 콜백 생성)
    const handleCodeLoadComplete = useCallback(() => {
      if (displayedTab === activeTab) {
        setIsCodeLoaded(true);
      }
    }, [displayedTab, activeTab]);

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
          ref={panelRef}
          role="tabpanel"
          id={tabPanelId}
          aria-labelledby={tabPanelLabelledBy}
          className={`relative border border-surface-level-2 rounded-lg p-4 ${
            !isCodeLoaded ? 'min-h-[70vh]' : ''
          }`}
        >
          {displayedHighlight && (
            <>
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {displayedHighlight.title}
                </h3>
                {displayedHighlight.description && (
                  <p className="text-text-secondary mb-4">
                    {displayedHighlight.description}
                  </p>
                )}
              </div>

              <DemoSection
                demoPath={displayedHighlight.demoPath}
                shouldLoadDemo={demoLoader.shouldLoadDemo}
                LazyDemoComponent={demoLoader.LazyDemoComponent}
              />

              <CodeSection
                codeFile={displayedHighlight.codeFile}
                language={displayedHighlight.language}
                enableObserver={demoLoader.enableCodeObserver}
                onLoadComplete={handleCodeLoadComplete}
                showSpinner={!isCodeLoaded || displayedTab !== activeTab}
              />
            </>
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
