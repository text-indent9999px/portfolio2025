'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { profileTabItems } from '../../../data/profile/tabs';
import { useRouter as useCustomRouter } from '../../../utils/router';
import Blank from '../../ui/Blank';
import { SectionHeader } from '../../ui/Heading';
import { Skeleton } from '../../ui/Skeleton';
import { PrimaryTab } from '../../ui/Tab';
import { SecondaryTab } from '../../ui/Tab/Secondary';
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
const SKELETON_SHOW_DELAY_MS = 160;
const SKELETON_MIN_VISIBLE_MS = 280;

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
  const { isPending } = useCustomRouter();
  const uniqueId = useId();
  const [hasRenderedContent, setHasRenderedContent] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const skeletonShownAtRef = useRef<number | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPending) {
      setHasRenderedContent(true);
    }
  }, [isPending]);

  useEffect(() => {
    const shouldShowSkeleton = isPending && !hasRenderedContent;

    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (shouldShowSkeleton) {
      showTimerRef.current = window.setTimeout(() => {
        skeletonShownAtRef.current = Date.now();
        setShowSkeleton(true);
      }, SKELETON_SHOW_DELAY_MS);
      return;
    }

    if (!showSkeleton) {
      setShowSkeleton(false);
      return;
    }

    const shownAt = skeletonShownAtRef.current ?? Date.now();
    const elapsedMs = Date.now() - shownAt;
    const remainingMs = Math.max(SKELETON_MIN_VISIBLE_MS - elapsedMs, 0);

    hideTimerRef.current = window.setTimeout(() => {
      skeletonShownAtRef.current = null;
      setShowSkeleton(false);
    }, remainingMs);
  }, [isPending, hasRenderedContent, showSkeleton]);

  useEffect(() => {
    return () => {
      if (showTimerRef.current !== null) {
        window.clearTimeout(showTimerRef.current);
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

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

  const replaceQueryParams = (updater: (params: URLSearchParams) => void) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    updater(params);
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(window.history.state, '', url);
  };

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

    setActiveTab(tab);

    pendingMainTabUrlSyncRef.current = window.setTimeout(() => {
      replaceQueryParams(params => {
        params.set('tab', tab);
        // 메인 탭이 skill이 아닌 경우 skillTab 파라미터 제거
        if (tab !== 'skill') {
          params.delete('skillTab');
        }
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
      replaceQueryParams(params => {
        params.set('tab', 'skill');
        params.set('skillTab', skillTab);
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

  if (showSkeleton) {
    return (
      <>
        <Skeleton
          width="100%"
          height="60px"
          radius="3rem"
          className="max-xl:!h-[45px] max-xl:!rounded-[0.5rem] mb-10 mt-5"
        />
        <Skeleton width="36%" height="30px" radius="0.7rem" />
        <Blank height="1.5rem" bgColor="transparent" />
        <div className="flex flex-col gap-4">
          <Skeleton width="100%" height="18px" radius="0.6rem" />
          <Skeleton width="96%" height="18px" radius="0.6rem" />
          <Skeleton width="92%" height="18px" radius="0.6rem" />
          <Skeleton width="98%" height="18px" radius="0.6rem" />
          <Skeleton width="88%" height="18px" radius="0.6rem" />
          <Skeleton width="95%" height="18px" radius="0.6rem" />
          <Skeleton width="90%" height="18px" radius="0.6rem" />
          <Skeleton width="97%" height="18px" radius="0.6rem" />
          <Skeleton width="86%" height="18px" radius="0.6rem" />
          <Skeleton width="93%" height="18px" radius="0.6rem" />
          <Skeleton width="89%" height="18px" radius="0.6rem" />
        </div>
        <Blank height="1.5rem" bgColor="transparent" />
      </>
    );
  }

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
      <div className="hidden xl:block">
        <PrimaryTab
          tabs={profileTabItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-10 mt-5"
          uniqueId={`${uniqueId}-primary`}
        />
      </div>
      <div className="block xl:hidden">
        <SecondaryTab
          tabs={profileTabItems}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-8 mt-3"
          uniqueId={`${uniqueId}-secondary`}
        />
      </div>
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
