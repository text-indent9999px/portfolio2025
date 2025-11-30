'use client';

import { useId } from 'react';
import { skillCategories, skillTabItems } from '../../../../data/profile';
import { SecondaryTab } from '../../../ui/Tab/Secondary';
import SkillList from './SkillList';

interface SkillSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SkillSection({
  activeTab,
  onTabChange,
}: SkillSectionProps) {
  const uniqueId = useId();

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
          className={activeTab === key ? 'block' : 'hidden'}
          aria-hidden={activeTab !== key}
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
