'use client';

import { useMediaQuery } from '../../../hooks';
import type { HeadingLevel, SizeType } from '../../ui/Heading/Heading.types';
import { StyleGuideSectionContent } from './StyleGuideSectionContent';

interface StyleGuideSectionClientProps {
  title?: string;
  size?: HeadingLevel;
  visualSize?: SizeType;
  description?: string;
  children: React.ReactNode;
  wrapperSpacing?: 'none' | 'sm' | 'md' | 'lg';
  contentSpacing?: 'none' | 'tight' | 'normal' | 'loose';
  className?: string;
}

export function StyleGuideSectionClient({
  title,
  size = 4,
  visualSize = 'xl',
  description,
  children,
  wrapperSpacing = 'none',
  contentSpacing = 'normal',
  className = '',
}: StyleGuideSectionClientProps) {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  return (
    <StyleGuideSectionContent
      title={title}
      size={size}
      visualSize={visualSize}
      description={description}
      wrapperSpacing={wrapperSpacing}
      contentSpacing={contentSpacing}
      className={className}
      isXlOrAbove={isXlOrAbove}
    >
      {children}
    </StyleGuideSectionContent>
  );
}
