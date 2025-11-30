'use client';

import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { useDevice } from '../../contexts/DeviceContext';
import { SplitLayoutContent } from './SplitLayoutContent';

interface SplitLayoutClientProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  showLeftSection?: boolean;
  leftClassName?: string;
  rightClassName?: string;
  useViewTransition?: boolean;
  viewTransitionName?: string;
}

export function SplitLayoutClient({
  leftContent,
  rightContent,
  showLeftSection = true,
  leftClassName,
  rightClassName,
  useViewTransition = true,
  viewTransitionName = 'page-content',
}: SplitLayoutClientProps) {
  const { isXlOrAbove } = useDevice();
  const shouldShowLeftSection = showLeftSection && isXlOrAbove;

  const content = (
    <div
      className={`
        relative z-0
        flex flex-col items-center
        xl:flex-row xl:justify-center
        w-full h-full
        inset-0
        transition-opacity duration-300 ease
      `}
    >
      <SplitLayoutContent
        leftContent={leftContent}
        rightContent={rightContent}
        leftClassName={leftClassName}
        rightClassName={rightClassName}
        showLeftSection={shouldShowLeftSection}
      />
    </div>
  );

  return useViewTransition ? (
    <ViewTransition
      name={viewTransitionName}
      share={{
        default: 'fade',
        'nav-forward': 'slide-in',
        'nav-back': 'slide-out',
      }}
      update="none"
    >
      {content}
    </ViewTransition>
  ) : (
    content
  );
}
