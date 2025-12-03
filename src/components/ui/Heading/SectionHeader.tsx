import React from 'react';
import Blank from '../Blank';
import { Description } from '../Description';
import Heading from './Heading';
import type {
  HeadingLevel,
  SectionHeaderProps,
  SizeType,
  SpacingType,
} from './Heading.types';
import { PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING } from './Heading.types';

// 시각적 사이즈 매핑
const VISUAL_SIZE_TO_LEVEL: Record<SizeType, HeadingLevel> = {
  '4xl': 1,
  '3xl': 2,
  '2xl': 3,
  xl: 4,
  lg: 5,
  md: 6,
  sm: 7,
  xs: 8,
} as const;

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
  // 효과적 레벨 계산
  const effectiveLevel = React.useMemo(() => {
    return visualSize ? VISUAL_SIZE_TO_LEVEL[visualSize] : size ?? 2;
  }, [visualSize, size]);

  // Heading bottom spacing 계산
  const headingBottomSpacingValue = React.useMemo(() => {
    return HEADING_BOTTOM_SPACING[effectiveLevel];
  }, [effectiveLevel]);

  // Bottom spacing 높이 계산
  const bottomSpacingHeight = React.useMemo(() => {
    return bottomSpacing
      ? PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING[bottomSpacing]
      : undefined;
  }, [bottomSpacing]);

  // ClassName 계산
  const rootClassName = React.useMemo(() => {
    return className?.root || '';
  }, [className?.root]);

  const titleClassName = React.useMemo(() => {
    return className?.title;
  }, [className?.title]);

  const descriptionClassName = React.useMemo(() => {
    return className?.description || 'text-text-secondary';
  }, [className?.description]);

  return (
    <div className={rootClassName}>
      {description && descriptionPosition === 'above' && (
        <Description
          size={effectiveLevel}
          color={descriptionClassName}
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
        <Description size={effectiveLevel} color={descriptionClassName}>
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
