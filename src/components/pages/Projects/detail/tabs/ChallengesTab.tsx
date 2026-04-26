import React from 'react';
import { SectionHeader } from '../../../../ui/Heading';
import { Pill } from '../../../../ui/Pill';
import type {
  ChallengesTab as ChallengesTabType,
  ProjectDetail,
} from '../../types';

interface ChallengesTabProps {
  project: ProjectDetail;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ project }) => {
  const challengesTab = project.tabs.find(
    (t): t is ChallengesTabType => t.type === 'challenges'
  );
  const items = challengesTab?.payload?.items ?? [];
  const titleChallenge = challengesTab?.label ?? '도전 과제';

  return (
    <div>
      <SectionHeader
        size={2}
        title={titleChallenge}
        bottomSpacing="sm"
        visualSize="lg"
      />
      <div className="relative">
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-2 pb-3 mb-9 border-b border-dashed border-surface-level-4 last:border-b-0 last:mb-0 last:pb-0"
            >
              {/* 내용 */}
              <div className="flex-1 space-y-4 pb-2">
                <div className="flex items-start gap-2">
                  <Pill
                    variant="solid"
                    color="warning"
                    size="sm"
                    className="shrink-0"
                  >
                    문제
                  </Pill>
                  <div className="text-text-secondary leading-relaxed">
                    {item.challenge}
                  </div>
                </div>

                {item.solution && (
                  <div className="flex items-start gap-2">
                    <Pill
                      variant="solid"
                      color="success"
                      size="sm"
                      className="shrink-0"
                    >
                      해결
                    </Pill>
                    <div className="text-text-secondary leading-relaxed  inline-flex">
                      {item.solution}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesTab;
