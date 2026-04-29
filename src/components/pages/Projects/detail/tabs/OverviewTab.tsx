'use client';

import React from 'react';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import { SectionHeader } from '../../../../ui/Heading';
import type {
  OverviewTab as OverviewTabType,
  ProjectDetail,
} from '../../types';

interface OverviewTabProps {
  project: ProjectDetail;
  timestamp?: string | number;
  transitionNameMode?: 'forward' | 'back';
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  project,
  timestamp,
  transitionNameMode = 'forward',
}) => {
  const tab = project.tabs.find(
    (t): t is OverviewTabType => t.type === 'overview'
  );
  const title = tab?.label ?? '제작 배경';
  const descriptionName = timestamp
    ? `project-description-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing="none"
        className={{ root: 'mb-4' }}
        visualSize="lg"
      />
      <ViewTransition
        name={descriptionName}
        update="none"
      >
        <p className="text-text-secondary whitespace-pre-line">
          {project.meta.description}
        </p>
      </ViewTransition>
    </div>
  );
};

export default OverviewTab;
