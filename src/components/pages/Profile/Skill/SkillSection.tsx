'use client';

import { useId } from 'react';
import type { SkillCategory, SkillTabItem } from '../types';
import InfoText from '../../../ui/InfoText';
import { SecondaryTab } from '../../../ui/Tab/Secondary';
import SkillList from './SkillList';

interface SkillSectionProps {
  activeTab: string;
  displayedTab: string;
  onTabChange: (tab: string) => void;
  skillTabItems: SkillTabItem[];
  skillCategories: Record<string, SkillCategory>;
  errorMessage?: string | null;
}

export default function SkillSection({
  activeTab,
  displayedTab,
  onTabChange,
  skillTabItems,
  skillCategories,
  errorMessage,
}: SkillSectionProps) {
  const uniqueId = useId();

  if (errorMessage) {
    return (
      <InfoText type="danger" title="데이터를 불러오지 못했습니다">
        {errorMessage}
      </InfoText>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SecondaryTab
        uniqueId={uniqueId}
        tabs={skillTabItems}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="-mr-6 xl:mr-0 pr-6 xl:pr-0"
      />
      {Object.entries(skillCategories).map(([key, category]) => (
        <div
          key={key}
          className={displayedTab === key ? 'block' : 'hidden'}
          aria-hidden={displayedTab !== key}
        >
          <SkillList
            skills={category.skills}
            title={category.title}
            description={category.description}
          />
        </div>
      ))}
    </div>
  );
}
