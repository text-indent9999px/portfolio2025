'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { EXTERNAL_LINKS } from '../../../../../config/links';
import { useMediaQuery } from '../../../../../hooks';
import Blank from '../../../../ui/Blank';
import CustomButton from '../../../../ui/Button';
import { SectionHeader } from '../../../../ui/Heading';
import type { ProjectDetail, ProjectTab } from '../../types';

interface OverviewTabProps {
  project: ProjectDetail;
  timestamp: number;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ project, timestamp }) => {
  const tab = project.tabs.find(t => t.type === 'overview') as
    | Extract<ProjectTab, { type: 'overview' }>
    | undefined;
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
      {project.meta.id === 'design-system' && (
        <div>
          <Blank height="2rem" bgColor="transparent" />
          <CustomButton
            color="primary"
            variant="filled"
            data-cursor="hover"
            href={EXTERNAL_LINKS.storybook}
            cursorTrigger={true}
            rounded="full"
            icon={<FontAwesomeIcon icon={faArrowRight} />}
          >
            Storybook 바로가기
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
