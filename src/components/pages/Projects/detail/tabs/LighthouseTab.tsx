'use client';

import React from 'react';
import Blank from '../../../../ui/Blank';
import { SectionHeader } from '../../../../ui/Heading';
import { Image } from '../../../../ui/Image';
import type { AccessibilityCustomTab, ProjectDetail } from '../../types';

interface LighthouseTabProps {
  project: ProjectDetail;
}

const LighthouseTab: React.FC<LighthouseTabProps> = ({ project }) => {
  const tab = project.tabs.find(
    (t): t is AccessibilityCustomTab =>
      t.type === 'custom' && t.label === '접근성'
  );

  if (!tab) {
    return null;
  }

  const title = tab.label ?? '접근성';
  const { description } = tab.payload;
  const lighthouseImages = [
    {
      src: '/assets/images/lighthouse-home.png',
      title: 'home',
      description:
        '클릭하면 큰 이미지로 열리며, 핀치줌 동작을 통해 확대하여 볼 수 있습니다',
    },
    {
      src: '/assets/images/lighthouse-profile.png',
      title: 'profile',
      description:
        '클릭하면 큰 이미지로 열리며, 핀치줌 동작을 통해 확대하여 볼 수 있습니다',
    },
    {
      src: '/assets/images/lighthouse-project.png',
      title: 'project',
      description:
        '클릭하면 큰 이미지로 열리며, 핀치줌 동작을 통해 확대하여 볼 수 있습니다',
    },
    {
      src: '/assets/images/lighthouse-project-detail.png',
      title: 'project-detail',
      description:
        '클릭하면 큰 이미지로 열리며, 핀치줌 동작을 통해 확대하여 볼 수 있습니다',
    },
    {
      src: '/assets/images/lighthouse-contact.png',
      title: 'contact',
      description:
        '클릭하면 큰 이미지로 열리며, 핀치줌 동작을 통해 확대하여 볼 수 있습니다',
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
      {description && (
        <p className="text-text-secondary whitespace-pre-line">{description}</p>
      )}
      <Blank height="2rem" bgColor="transparent" />
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
            width={1866}
            height={947}
            placeholder="blur"
            blurDataURL={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUqwcAAMEAnwarUJAAAAAASUVORK5CYII='
            }
          />
        ))}
      </div>
    </div>
  );
};

export default LighthouseTab;
