'use client';

import NextImage from 'next/image';
import React from 'react';
import { Card } from '../Card';
import { ImageProps } from './Image.types';

const Image: React.FC<ImageProps> = ({
  src,
  title,
  description,
  contextTitle,
  index,
  width,
  height,
  alt,
  className = '',
}) => {
  const ariaLabel = React.useMemo(() => {
    if (alt) return alt;
    if (title) return title;
    if (contextTitle && index) {
      return `${contextTitle} 이미지 ${index}`;
    }
    if (contextTitle) return `${contextTitle} 이미지`;
    return '이미지';
  }, [alt, title, contextTitle, index]);

  return (
    <Card className={className}>
      <Card.Body>
        <figure>
          {title && (
            <strong className="flex text-md text-text-primary mb-4">
              {title}
            </strong>
          )}
          <NextImage
            src={src}
            alt={ariaLabel}
            width={width || 1200}
            height={height || 800}
            className="w-full h-auto rounded-lg border-2 border-gray-800 dark:border-gray-500 p-5"
          />
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

export default Image;

