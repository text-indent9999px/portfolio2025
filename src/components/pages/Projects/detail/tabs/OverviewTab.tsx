'use client';

import React from 'react';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import { useMediaQuery } from '../../../../../hooks';
import { SectionHeader } from '../../../../ui/Heading';
import type {
  OverviewTab as OverviewTabType,
  ProjectDetail,
} from '../../types';

interface OverviewTabProps {
  project: ProjectDetail;
  timestamp: string | number;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project, timestamp }) => {
  const tab = project.tabs.find(
    (t): t is OverviewTabType => t.type === 'overview'
  );
  const title = tab?.label ?? '제작 배경';
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');
  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing={isXlOrAbove ? 'xs' : 'xs'}
        visualSize="lg"
      />
      <ViewTransition
        name={`project-description-${project.meta.id}-${timestamp}`}
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
