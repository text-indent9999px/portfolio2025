'use client';

import React from 'react';
import { Card } from '../Card';
import { VideoProps } from './Video.types';

const Video: React.FC<VideoProps> = ({
  src,
  title,
  description,
  contextTitle,
  index,
  autoPlay = true,
  loop = true,
  muted = true,
  controls = true,
  className = '',
}) => {
  const ariaLabel = React.useMemo(() => {
    if (title) return title;
    if (contextTitle && index) {
      return `${contextTitle} 데모 비디오 ${index}`;
    }
    if (contextTitle) return `${contextTitle} 데모 비디오`;
    return '데모 비디오';
  }, [title, contextTitle, index]);

  return (
    <Card className={className}>
      <Card.Body>
        <figure>
          {title && (
            <strong className="flex text-md text-text-primary mb-4">
              {title}
            </strong>
          )}
          <video
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            controls={controls}
            className="w-full h-auto rounded-lg border-2 border-gray-800 dark:border-gray-500 p-5"
            aria-label={ariaLabel}
          >
            <source src={src} type="video/webm" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
          {description && (
            <figcaption className="mt-4 text-sm text-text-secondary dark:text-text-tertiary">
              {description}
            </figcaption>
          )}
        </figure>
      </Card.Body>
    </Card>
  );
};

export default Video;

