'use client';

import * as React from 'react';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
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
  const shouldShowLeftSection = showLeftSection;
  const shouldUseViewTransition = useViewTransition;

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

  return shouldUseViewTransition ? (
    <ViewTransition name={viewTransitionName}>
      {content}
    </ViewTransition>
  ) : (
    content
  );
}
