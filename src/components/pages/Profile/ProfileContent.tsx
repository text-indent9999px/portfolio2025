'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { profileTabItems } from '../../../data/profile';
import Blank from '../../ui/Blank';
import { SectionHeader } from '../../ui/Heading';
import { PrimaryTab } from '../../ui/Tab';
import { ExperienceSection } from './Experience';
import { IntroSection } from './Intro';
import { SkillSection } from './Skill';

export function ProfileContent() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activeSkillTab, setActiveSkillTab] = useState('language');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const uniqueId = useId();
  const activeTabConfig = profileTabItems.find(tab => tab.value === activeTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    const isValidTab = profileTabItems.some(tab => tab.value === tabParam);

    if (isValidTab && tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!activeTabConfig) return null;

  const renderComponent = () => {
    switch (activeTab) {
      case 'introduction':
        return <IntroSection />;
      case 'skill':
        return (
          <SkillSection
            activeTab={activeSkillTab}
            onTabChange={setActiveSkillTab}
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
