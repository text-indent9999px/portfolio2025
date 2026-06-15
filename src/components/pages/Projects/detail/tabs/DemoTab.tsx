import React from 'react';
import Blank from '../../../../ui/Blank';
import { SectionHeader } from '../../../../ui/Heading';
import { Video } from '../../../../ui/Video';
import Image from '../../../../ui/Image/Image';
import type { DemoTab as DemoTabType, ProjectDetail } from '../../types';

interface DemoTabProps {
  project: ProjectDetail;
}

const DemoTab: React.FC<DemoTabProps> = ({ project }) => {
  const tab = project.tabs.find((t): t is DemoTabType => t.type === 'demo');

  if (!tab || !tab.payload) {
    return null;
  }

  const { videos, images, description } = tab.payload;
  const title = tab.label ?? '데모';

  const hasVideos = videos && videos.length > 0;
  const hasImages = images && images.length > 0;

  if (!hasVideos && !hasImages) {
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
      
      {hasVideos && (
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
      )}

      {hasVideos && hasImages && <Blank height="2rem" bgColor="transparent" />}

      {hasImages && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Image
              key={image.path}
              src={image.path}
              contextTitle={project.meta.title}
              index={index + 1}
              width={image.width ?? 1200}
              height={image.height ?? 800}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoTab;
