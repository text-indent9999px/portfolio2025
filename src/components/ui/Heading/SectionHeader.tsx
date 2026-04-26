import React from 'react';

import Blank from '../Blank';
import { Description } from '../Description';
import { VISUAL_SIZE_TO_LEVEL } from './Heading.config';
import Heading from './Heading';
import type {
  HeadingLevel,
  SectionHeaderProps,
  SpacingType,
} from './Heading.types';
import { PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING } from './Heading.types';

// Heading 레벨별 bottom spacing 매핑
const HEADING_BOTTOM_SPACING: Record<HeadingLevel, SpacingType> = {
  1: 'md',
  2: 'md',
  3: 'sm',
  4: 'sm',
  5: 'xs',
  6: 'xs',
  7: 'none',
  8: 'none',
} as const;

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  size = 2,
  className,
  descriptionPosition = 'below',
  fontFamily,
  bottomSpacing = 'none',
  visualSize,
}) => {
  // Heading 시각 레벨(1~8)과 같은 척도로 본문(Description) 크기를 맞춘다.
  const effectiveLevel = visualSize
    ? VISUAL_SIZE_TO_LEVEL[visualSize]
    : (size ?? 2);

  const headingBottomSpacingValue = HEADING_BOTTOM_SPACING[effectiveLevel];

  const bottomSpacingHeight =
    bottomSpacing && bottomSpacing !== 'none'
      ? PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING[bottomSpacing]
      : undefined;

  const rootClassName = className?.root ?? '';
  const titleClassName = className?.title;
  const descriptionTextClassName =
    className?.description ?? 'text-text-secondary';

  return (
    <div className={rootClassName}>
      {description && descriptionPosition === 'above' && (
        <Description
          size={effectiveLevel}
          textClassName={descriptionTextClassName}
          className="mb-2"
        >
          {description}
        </Description>
      )}

      <Heading
        size={size}
        visualSize={visualSize}
        className={titleClassName}
        fontFamily={fontFamily}
        bottomSpacing={description ? headingBottomSpacingValue : 'none'}
      >
        {title}
      </Heading>

      {description && descriptionPosition === 'below' && (
        <Description
          size={effectiveLevel}
          textClassName={descriptionTextClassName}
        >
          {description}
        </Description>
      )}
      {bottomSpacingHeight && bottomSpacing !== 'none' && (
        <Blank
          height={bottomSpacingHeight}
          bgColor="transparent"
          className="w-full"
        />
      )}
    </div>
  );
};

export default SectionHeader;
