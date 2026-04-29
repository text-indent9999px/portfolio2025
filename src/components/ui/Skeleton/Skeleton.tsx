'use client';

import { cn } from '@/utils/cn';
import React from 'react';
import styles from './Skeleton.module.scss';
import type { SkeletonProps } from './Skeleton.types';

const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '1rem';
const DEFAULT_RADIUS = '1.5rem';

function resolveRadius(radius: SkeletonProps['radius']) {
  if (radius === 'none') return '0';
  if (radius === 'full') return '9999px';
  return radius ?? DEFAULT_RADIUS;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius = DEFAULT_RADIUS,
  animated = true,
  className,
  style,
  ...props
}) => {
  const computedWidth = width ?? DEFAULT_WIDTH;
  const computedHeight = height ?? DEFAULT_HEIGHT;

  return (
    <div
      aria-hidden="true"
      className={cn(styles.skeleton, animated && styles.animated, className)}
      style={{
        width: computedWidth,
        height: computedHeight,
        borderRadius: resolveRadius(radius),
        ...style,
      }}
      {...props}
    />
  );
};

export default Skeleton;
