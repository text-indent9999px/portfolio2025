import React from 'react';
import { SectionHeader } from '../../../../ui/Heading';
import { Label } from '../../../../ui/Label';
import type { ProjectDetail, ProjectTab } from '../../types';

interface ChallengesTabProps {
  project: ProjectDetail;
}

const ChallengesTab: React.FC<ChallengesTabProps> = ({ project }) => {
  const challengesTab = project.tabs.find(t => t.type === 'challenges') as
    | Extract<ProjectTab, { type: 'challenges' }>
    | undefined;
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
                  <Label
                    variant="filled"
                    color="warning"
                    size="sm"
                    className="shrink-0"
                  >
                    문제
                  </Label>
                  <div className="text-text-secondary leading-relaxed">
                    {item.challenge}
                  </div>
                </div>

                {item.solution && (
                  <div className="flex items-start gap-2">
                    <Label
                      variant="filled"
                      color="success"
                      size="sm"
                      className="shrink-0"
                    >
                      해결
                    </Label>
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
