'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { EXTERNAL_LINKS } from '../../../../../config/links';
import Blank from '../../../../ui/Blank';
import CustomButton from '../../../../ui/Button';
import { SectionHeader } from '../../../../ui/Heading';
import { Video } from '../../../../ui/Video';
import type { ProjectDetail, StorybookCustomTab } from '../../types';

interface StorybookTabProps {
  project: ProjectDetail;
}

const StorybookTab: React.FC<StorybookTabProps> = ({ project }) => {
  const tab = project.tabs.find(
    (t): t is StorybookCustomTab =>
      t.type === 'custom' && t.label === '스토리북'
  );

  if (!tab || !tab.payload) {
    return null;
  }

  const video = tab.payload.videos?.[0];
  const storybookUrl = tab.payload.storybookUrl ?? EXTERNAL_LINKS.storybook;
  const title = tab.label ?? '스토리북';

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing="xs"
        visualSize="lg"
      />
      {video && (
        <Video
          src={video.path}
          title={video.title}
          description={video.description ?? tab.payload.description}
          contextTitle={project.meta.title}
          width={video.width}
          height={video.height}
          thumbnail={video.thumbnail}
        />
      )}
      <Blank height="2rem" bgColor="transparent" />
      <CustomButton
        color="primary"
        variant="filled"
        data-cursor="hover"
        href={storybookUrl}
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
