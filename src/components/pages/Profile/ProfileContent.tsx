'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useId, useRef, useState } from 'react';
import { profileTabItems } from '../../../data/profile/tabs';
import { useRouter as useCustomRouter } from '../../../utils/router';
import Blank from '../../ui/Blank';
import { SectionHeader } from '../../ui/Heading';
import { PrimaryTab } from '../../ui/Tab';
import { ExperienceSection } from './Experience';
import { IntroSection } from './Intro';
import { SkillSection } from './Skill';
import type {
  ExperienceItem,
  IntroSectionItem,
  SkillCategory,
  SkillTabItem,
} from './types';

const MAIN_TAB_URL_SYNC_DELAY_MS = 260;
const SKILL_TAB_URL_SYNC_DELAY_MS = 260;

interface ProfileContentProps {
  skillTabItems: SkillTabItem[];
  skillCategories: Record<string, SkillCategory>;
  skillDataError?: string | null;
  experienceData: ExperienceItem[];
  experienceDataError?: string | null;
  introSections: IntroSectionItem[];
  introDataError?: string | null;
}

export function ProfileContent({
  skillTabItems,
  skillCategories,
  skillDataError,
  experienceData,
  experienceDataError,
  introSections,
  introDataError,
}: ProfileContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { navigateToUrl } = useCustomRouter();
  const uniqueId = useId();

  // 메인 탭 초기값: URL 파라미터 또는 기본값
  const getInitialTab = (params: URLSearchParams) => {
    const tabParam = params.get('tab');
    const isValidTab = profileTabItems.some(tab => tab.value === tabParam);
    return isValidTab && tabParam ? tabParam : 'introduction';
  };

  // 스킬 탭 초기값: URL 파라미터 또는 기본값
  const getInitialSkillTab = (params: URLSearchParams) => {
    const skillTabParam = params.get('skillTab');
    const isValidSkillTab = skillTabItems.some(tab => tab.id === skillTabParam);
    return isValidSkillTab && skillTabParam ? skillTabParam : 'language';
  };

  // 메인 탭: 인디케이터용 즉시 상태
  const [activeTab, setActiveTab] = useState(() => getInitialTab(searchParams));
  // 메인 탭: 패널 내용용 지연 상태
  const [displayedTab, setDisplayedTab] = useState(() =>
    getInitialTab(searchParams)
  );
  const displayedTabConfig = profileTabItems.find(
    tab => tab.value === displayedTab
  );

  // 활성 탭 상태 - 탭 인디케이터용 (즉시 업데이트)
  const [activeSkillTab, setActiveSkillTab] = useState(() =>
    getInitialSkillTab(searchParams)
  );
  // 탭 패널 내용용 상태 (지연 업데이트)
  const [displayedSkillTab, setDisplayedSkillTab] = useState(() =>
    getInitialSkillTab(searchParams)
  );
  const pendingMainTabRef = useRef<string | null>(null);
  const pendingSkillTabRef = useRef<string | null>(null);
  const pendingMainTabUrlSyncRef = useRef<number | null>(null);
  const pendingSkillTabUrlSyncRef = useRef<number | null>(null);

  // URL 파라미터 변경 감지 (메인 탭)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const isValidTab = profileTabItems.some(tab => tab.value === tabParam);

    if (!isValidTab || !tabParam) {
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
  }, [searchParams, activeTab]);

  // activeTab 변경 시 패널 내용을 지연 업데이트
  useEffect(() => {
    if (activeTab === displayedTab) return;

    const timeoutId = setTimeout(() => {
      setDisplayedTab(activeTab);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [activeTab, displayedTab]);

  // URL 파라미터 변경 감지 (스킬 서브 탭)
  useEffect(() => {
    const skillTabParam = searchParams.get('skillTab');
    const isValidSkillTab = skillTabItems.some(tab => tab.id === skillTabParam);

    if (!isValidSkillTab || !skillTabParam) {
      return;
    }

    if (
      pendingSkillTabRef.current &&
      skillTabParam !== pendingSkillTabRef.current
    ) {
      return;
    }

    if (pendingSkillTabRef.current === skillTabParam) {
      pendingSkillTabRef.current = null;
    }

    if (skillTabParam !== activeSkillTab) {
      setActiveSkillTab(skillTabParam);
    }
  }, [searchParams, activeSkillTab]);

  const handleTabChange = (tab: string) => {
    // 인디케이터는 즉시 바꾸고, 패널은 effect에서 지연 반영
    pendingMainTabRef.current = tab;

    if (pendingMainTabUrlSyncRef.current !== null) {
      window.clearTimeout(pendingMainTabUrlSyncRef.current);
      pendingMainTabUrlSyncRef.current = null;
    }

    startTransition(() => {
      setActiveTab(tab);
    });

    pendingMainTabUrlSyncRef.current = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', tab);
      // 메인 탭이 skill이 아닌 경우 skillTab 파라미터 제거
      if (tab !== 'skill') {
        params.delete('skillTab');
      }
      const url = `${pathname}?${params.toString()}`;
      navigateToUrl({
        url,
        useDefaultTransition: false,
        transitionType: 'nav-forward',
        replace: true,
      });
      pendingMainTabUrlSyncRef.current = null;
    }, MAIN_TAB_URL_SYNC_DELAY_MS);
  };

  const handleSkillTabChange = (skillTab: string) => {
    pendingSkillTabRef.current = skillTab;

    if (pendingSkillTabUrlSyncRef.current !== null) {
      window.clearTimeout(pendingSkillTabUrlSyncRef.current);
      pendingSkillTabUrlSyncRef.current = null;
    }

    setActiveSkillTab(skillTab);

    pendingSkillTabUrlSyncRef.current = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('skillTab', skillTab);
      const url = `${pathname}?${params.toString()}`;
      navigateToUrl({
        url,
        useDefaultTransition: false,
        transitionType: 'nav-forward',
        replace: true,
      });
      pendingSkillTabUrlSyncRef.current = null;
    }, SKILL_TAB_URL_SYNC_DELAY_MS);
  };

  // activeSkillTab 변경 시 displayedSkillTab 지연 업데이트 (SecondaryTab 애니메이션 완료 후)
  useEffect(() => {
    if (activeSkillTab === displayedSkillTab) return;

    // SecondaryTab 애니메이션 시간(400ms) 후 패널 내용 업데이트
    const timeoutId = setTimeout(() => {
      setDisplayedSkillTab(activeSkillTab);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [activeSkillTab, displayedSkillTab]);

  useEffect(() => {
    return () => {
      if (pendingMainTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingMainTabUrlSyncRef.current);
      }
      if (pendingSkillTabUrlSyncRef.current !== null) {
        window.clearTimeout(pendingSkillTabUrlSyncRef.current);
      }
    };
  }, []);

  if (!displayedTabConfig) return null;

  const renderComponent = () => {
    switch (displayedTab) {
      case 'introduction':
        return (
          <IntroSection
            sections={introSections}
            errorMessage={introDataError}
          />
        );
      case 'skill':
        return (
          <SkillSection
            activeTab={activeSkillTab}
            displayedTab={displayedSkillTab}
            onTabChange={handleSkillTabChange}
            skillTabItems={skillTabItems}
            skillCategories={skillCategories}
            errorMessage={skillDataError}
          />
        );
      case 'experience':
        return (
          <ExperienceSection
            experienceData={experienceData}
            errorMessage={experienceDataError}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PrimaryTab
        tabs={profileTabItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="mt-5 mb-10"
        uniqueId={uniqueId}
      />
      <div
        id={`panel-${activeTab}-${uniqueId}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}-${uniqueId}`}
      >
        <SectionHeader
          title={displayedTabConfig.title}
          size={2}
          fontFamily="eng-point"
          bottomSpacing={displayedTabConfig.bottomSpacing}
          visualSize="2xl"
          description={displayedTabConfig.description}
        />
        {renderComponent()}
        {displayedTabConfig.needsBlank && (
          <Blank height="5rem" bgColor="transparent" />
        )}
      </div>
    </>
  );
}
