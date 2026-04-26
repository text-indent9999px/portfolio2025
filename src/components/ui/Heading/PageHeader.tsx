import React from 'react';

import { cn } from '@/utils/cn';
import Blank from '../Blank';
import { Description } from '../Description';
import { getPageHeaderHeadingSubtitleSpacing } from './Heading.config';
import Heading from './Heading';
import type { PageHeaderProps } from './Heading.types';
import { PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING } from './Heading.types';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
  layout,
  size = 1,
  visualSize,
  fontFamily,
  bottomSpacing,
}) => {
  const centered = layout?.centered ?? false;
  const actions = layout?.actions;

  const headingBottomSpacing = subtitle
    ? getPageHeaderHeadingSubtitleSpacing(visualSize, size)
    : 'none';

  const bottomSpacingHeight =
    bottomSpacing && bottomSpacing !== 'none'
      ? PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING[bottomSpacing]
      : undefined;

  const rootClassName = cn(
    centered && 'text-center',
    className?.root
  );
  const titleClassName = className?.title;

  return (
    <div className={rootClassName}>
      <Heading
        size={size}
        visualSize={visualSize}
        fontFamily={fontFamily}
        bottomSpacing={headingBottomSpacing}
        className={titleClassName}
      >
        {title}
      </Heading>
      {subtitle && (
        <Description
          size={size}
          textClassName={
            className?.subtitle ? undefined : 'text-text-secondary'
          }
          className={className?.subtitle || ''}
          preserveWhitespace
        >
          {subtitle}
        </Description>
      )}
      {actions && <div className="flex gap-2 justify-center">{actions}</div>}
      {bottomSpacingHeight && (
        <Blank
          height={bottomSpacingHeight}
          bgColor="transparent"
          className="w-full"
        />
      )}
    </div>
  );
};

export default PageHeader;
