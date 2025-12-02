'use client';

import React from 'react';
import Blank from '../../../../ui/Blank';
import { SectionHeader } from '../../../../ui/Heading';
import { Video } from '../../../../ui/Video';
import type { ProjectDetail, ProjectTab } from '../../types';

interface DemoTabProps {
  project: ProjectDetail;
}

const DemoTab: React.FC<DemoTabProps> = ({ project }) => {
  const tab = project.tabs.find(t => t.type === 'demo') as
    | Extract<ProjectTab, { type: 'demo' }>
    | undefined;

  if (!tab || !tab.payload) {
    return null;
  }

  const { videoPath, videos, description } = tab.payload;
  const title = tab.label ?? '데모';

  // videos 배열이 있으면 그것을 사용, 없으면 videoPath 사용
  const videoList = videos || (videoPath ? [{ path: videoPath }] : []);

  if (videoList.length === 0) {
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
        {videoList.map((video, index) => (
          <Video
            key={video.path}
            src={video.path}
            title={video.title}
            description={video.description}
            contextTitle={project.meta.title}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoTab;
