import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Blank from '../../../../ui/Blank';
import CustomButton from '../../../../ui/Button';
import { SectionHeader } from '../../../../ui/Heading';
import { Description } from '../../../../ui/Description';
import Image from '../../../../ui/Image/Image';
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
  const image = tab.payload.image;

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
      {image && (
        <>
          <Blank height="1.5rem" bgColor="transparent" />
          <Image
            src={image.path}
            title={image.title}
            description={image.description}
            contextTitle={project.meta.title}
            width={image.width ?? 1200}
            height={image.height ?? 800}
          />
        </>
      )}
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
