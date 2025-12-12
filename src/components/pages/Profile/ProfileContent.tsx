'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { profileTabItems, skillTabItems } from '../../../data/profile';
import { useRouter as useCustomRouter } from '../../../utils/router';
import Blank from '../../ui/Blank';
import { SectionHeader } from '../../ui/Heading';
import { PrimaryTab } from '../../ui/Tab';
import { ExperienceSection } from './Experience';
import { IntroSection } from './Intro';
import { SkillSection } from './Skill';

export function ProfileContent() {
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

  const [activeTab, setActiveTab] = useState(() => getInitialTab(searchParams));
  const activeTabConfig = profileTabItems.find(tab => tab.value === activeTab);

  // 활성 탭 상태 - 탭 인디케이터용 (즉시 업데이트)
  const [activeSkillTab, setActiveSkillTab] = useState(() =>
    getInitialSkillTab(searchParams)
  );
  // 탭 패널 내용용 상태 (지연 업데이트)
  const [displayedSkillTab, setDisplayedSkillTab] = useState(() =>
    getInitialSkillTab(searchParams)
  );

  // URL 파라미터 변경 감지 (메인 탭)
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const isValidTab = profileTabItems.some(tab => tab.value === tabParam);

    if (isValidTab && tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [searchParams, activeTab]);

  // URL 파라미터 변경 감지 (스킬 서브 탭)
  useEffect(() => {
    const skillTabParam = searchParams.get('skillTab');
    const isValidSkillTab = skillTabItems.some(tab => tab.id === skillTabParam);

    if (isValidSkillTab && skillTabParam && skillTabParam !== activeSkillTab) {
      setActiveSkillTab(skillTabParam);
    }
  }, [searchParams, activeSkillTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
  };

  const handleSkillTabChange = (skillTab: string) => {
    setActiveSkillTab(skillTab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('skillTab', skillTab);
    const url = `${pathname}?${params.toString()}`;
    navigateToUrl({
      url,
      useDefaultTransition: false,
      transitionType: 'nav-forward',
      replace: true,
    });
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

  if (!activeTabConfig) return null;

  const renderComponent = () => {
    switch (activeTab) {
      case 'introduction':
        return <IntroSection />;
      case 'skill':
        return (
          <SkillSection
            activeTab={activeSkillTab}
            displayedTab={displayedSkillTab}
            onTabChange={handleSkillTabChange}
          />
        );
      case 'experience':
        return <ExperienceSection />;
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
          title={activeTabConfig.title}
          size={2}
          fontFamily="eng-point"
          bottomSpacing={activeTabConfig.bottomSpacing}
          visualSize="2xl"
          description={activeTabConfig.description}
        />
        {renderComponent()}
        {activeTabConfig.needsBlank && (
          <Blank height="5rem" bgColor="transparent" />
        )}
      </div>
    </>
  );
}
