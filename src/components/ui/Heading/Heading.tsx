import React from 'react';

import { cn } from '@/utils/cn';
import Blank from '../Blank';
import { VISUAL_SIZE_TO_LEVEL } from './Heading.config';
import type { HeadingLevel, HeadingProps } from './Heading.types';
import { BOTTOM_SPACING_HEIGHTS } from './Heading.types';

// 사이즈 스타일
const SIZE_STYLES: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-bold',
  3: 'text-2xl font-bold',
  4: 'text-xl font-semibold',
  5: 'text-lg font-semibold',
  6: 'text-base font-medium',
  7: 'text-sm font-medium',
  8: 'text-xs font-medium',
} as const;

// 폰트 패밀리 매핑
const FONT_FAMILIES: Record<'default' | 'kor-point' | 'eng-point', string> = {
  default: '',
  'kor-point': 'font-kor-point',
  'eng-point': 'font-eng-point',
} as const;

const Heading: React.FC<HeadingProps> = ({
  size = 4,
  children,
  className = '',
  visualSize,
  fontFamily = 'default',
  bottomSpacing,
}) => {
  const htmlLevel = size > 6 ? 6 : size;
  const Tag = `h${htmlLevel}` as keyof React.JSX.IntrinsicElements;

  const effectiveLevel = visualSize
    ? VISUAL_SIZE_TO_LEVEL[visualSize]
    : (size ?? 4);

  const sizeAndWeightStyles =
    SIZE_STYLES[effectiveLevel] ?? SIZE_STYLES[4];

  const fontFamilyClass = FONT_FAMILIES[fontFamily];

  const bottomSpacingHeight =
    bottomSpacing && bottomSpacing !== 'none'
      ? BOTTOM_SPACING_HEIGHTS[bottomSpacing]
      : undefined;

  const finalClassName = cn(
    sizeAndWeightStyles,
    fontFamilyClass,
    className || 'text-text-primary'
  );

  return (
    <>
      <Tag className={finalClassName}>{children}</Tag>
      {bottomSpacingHeight && (
        <Blank
          height={bottomSpacingHeight}
          bgColor="transparent"
          className="w-full"
        />
      )}
    </>
  );
};

export default Heading;
