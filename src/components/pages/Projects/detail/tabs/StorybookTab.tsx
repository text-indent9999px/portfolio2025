'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { EXTERNAL_LINKS } from '../../../../../config/links';
import Blank from '../../../../ui/Blank';
import CustomButton from '../../../../ui/Button';
import { SectionHeader } from '../../../../ui/Heading';
import { Video } from '../../../../ui/Video';
import type { ProjectDetail, ProjectTab } from '../../types';

interface StorybookTabProps {
  project: ProjectDetail;
}

const StorybookTab: React.FC<StorybookTabProps> = ({ project }) => {
  const tab = project.tabs.find(
    t => t.type === 'custom' && t.label === '스토리북'
  ) as Extract<ProjectTab, { type: 'custom' }> | undefined;

  if (!tab) {
    return null;
  }

  const title = tab.label ?? '스토리북';

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing="xs"
        visualSize="lg"
      />
      <Video
        src="/assets/videos/storybook-theme-toggle.webm"
        title="Storybook 테마 전환"
        description="Storybook 상단 패널에서 배경색 변경을 통해 라이트/다크 모드를 전환할 수 있습니다."
        contextTitle={project.meta.title}
      />
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
  );
};

export default StorybookTab;
