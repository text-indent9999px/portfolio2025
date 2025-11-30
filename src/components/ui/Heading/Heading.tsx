import React from 'react';
import Blank from '../Blank';
import type { HeadingLevel, HeadingProps, SizeType } from './Heading.types';
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
  // HTML 레벨 계산
  const htmlLevel = React.useMemo(() => {
    return size > 6 ? 6 : size;
  }, [size]);

  // 태그 결정
  const Tag = React.useMemo(
    () => `h${htmlLevel}` as keyof React.JSX.IntrinsicElements,
    [htmlLevel]
  );

  // 효과적 레벨 계산
  const effectiveLevel = React.useMemo(() => {
    return visualSize ? VISUAL_SIZE_TO_LEVEL[visualSize] : size ?? 4;
  }, [visualSize, size]);

  // 사이즈 및 폰트 스타일 계산
  const sizeAndWeightStyles = React.useMemo(() => {
    return SIZE_STYLES[effectiveLevel] || SIZE_STYLES[4];
  }, [effectiveLevel]);

  const fontFamilyClass = React.useMemo(() => {
    return FONT_FAMILIES[fontFamily];
  }, [fontFamily]);

  // Bottom spacing 높이 계산
  const bottomSpacingHeight = React.useMemo(() => {
    return bottomSpacing ? BOTTOM_SPACING_HEIGHTS[bottomSpacing] : undefined;
  }, [bottomSpacing]);

  // 전체 className 병함
  const finalClassName = React.useMemo(() => {
    return [
      sizeAndWeightStyles,
      fontFamilyClass,
      className || 'text-text-primary',
    ]
      .filter(Boolean)
      .join(' ');
  }, [sizeAndWeightStyles, fontFamilyClass, className]);

  return (
    <>
      <Tag className={finalClassName}>{children}</Tag>
      {bottomSpacingHeight && bottomSpacing !== 'none' && (
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
