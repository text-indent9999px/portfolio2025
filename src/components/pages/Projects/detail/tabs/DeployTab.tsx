'use client';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Blank from '../../../../ui/Blank';
import CustomButton from '../../../../ui/Button';
import { SectionHeader } from '../../../../ui/Heading';
import { Description } from '../../../../ui/Description';
import type { ProjectDetail, DeployCustomTab } from '../../types';

interface DeployTabProps {
  project: ProjectDetail;
}

const DeployTab: React.FC<DeployTabProps> = ({ project }) => {
  const tab = project.tabs.find(
    (t): t is DeployCustomTab =>
      t.type === 'custom' && t.label === '배포 사이트'
  );

  if (!tab || !tab.payload) {
    return null;
  }

  const deployUrl = tab.payload.deployUrl;
  const description = tab.payload.description ?? '프로젝트의 배포 사이트로 바로 이동하여 동작을 테스트해볼 수 있습니다.';
  const title = tab.label ?? '배포 사이트';

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing="xs"
        visualSize="lg"
      />
      <Description size={4} leading="7">
        {description}
      </Description>
      <Blank height="2rem" bgColor="transparent" />
      <CustomButton
        color="brand"
        variant="solid"
        data-cursor="hover"
        href={deployUrl}
        cursorTrigger={true}
        rounded="pill"
        icon={<FontAwesomeIcon icon={faArrowRight} />}
      >
        배포 사이트 바로가기
      </CustomButton>
    </div>
  );
};

export default DeployTab;
