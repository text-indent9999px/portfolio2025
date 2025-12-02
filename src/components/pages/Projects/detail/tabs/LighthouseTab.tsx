'use client';

import React from 'react';
import { SectionHeader } from '../../../../ui/Heading';
import { Image } from '../../../../ui/Image';
import type { ProjectDetail, ProjectTab } from '../../types';

interface LighthouseTabProps {
  project: ProjectDetail;
}

const LighthouseTab: React.FC<LighthouseTabProps> = ({ project }) => {
  const tab = project.tabs.find(
    t => t.type === 'custom' && t.label === 'Lighthouse'
  ) as Extract<ProjectTab, { type: 'custom' }> | undefined;

  if (!tab) {
    return null;
  }

  const title = tab.label ?? 'Lighthouse';

  const lighthouseImages = [
    {
      src: '/assets/images/lighthouse-home.png',
      title: 'home',
      description: '홈 Lighthouse 결과',
    },
    {
      src: '/assets/images/lighthouse-profile.png',
      title: 'profile',
      description: '프로필 Lighthouse 결과',
    },
    {
      src: '/assets/images/lighthouse-project.png',
      title: 'project',
      description: '프로젝트 Lighthouse 결과',
    },
    {
      src: '/assets/images/lighthouse-project-detail.png',
      title: 'project-detail',
      description: '프로젝트 상세 Lighthouse 결과',
    },
    {
      src: '/assets/images/lighthouse-contact.png',
      title: 'contact',
      description: '연락처 Lighthouse 결과',
    },
  ];

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing="xs"
        visualSize="lg"
      />
      <div className="space-y-6">
        {lighthouseImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            title={image.title}
            description={image.description}
            contextTitle={project.meta.title}
            index={index + 1}
            alt={`${image.title} Lighthouse 접근성 점수`}
          />
        ))}
      </div>
    </div>
  );
};

export default LighthouseTab;
