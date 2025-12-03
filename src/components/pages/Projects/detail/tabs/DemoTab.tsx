'use client';

import React from 'react';
import Blank from '../../../../ui/Blank';
import { SectionHeader } from '../../../../ui/Heading';
import { Video } from '../../../../ui/Video';
import type { DemoTab as DemoTabType, ProjectDetail } from '../../types';

interface DemoTabProps {
  project: ProjectDetail;
}

const DemoTab: React.FC<DemoTabProps> = ({ project }) => {
  const tab = project.tabs.find((t): t is DemoTabType => t.type === 'demo');

  if (!tab || !tab.payload) {
    return null;
  }

  const { videos, description } = tab.payload;
  const title = tab.label ?? '데모';

  // videos 배열이 필수이므로 videos만 사용
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing={'xs'}
        visualSize="lg"
      />
      {description && (
        <p className="text-text-secondary whitespace-pre-line">{description}</p>
      )}
      <Blank height="2rem" bgColor="transparent" />
      <div className="space-y-6">
        {videos.map((video, index) => (
          <Video
            key={video.path}
            src={video.path}
            title={video.title}
            description={video.description}
            contextTitle={project.meta.title}
            index={index + 1}
            width={video.width}
            height={video.height}
            thumbnail={video.thumbnail}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoTab;
