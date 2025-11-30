import React from 'react';

import { DescriptionProps } from './Description.types';

// 사이즈 매핑
const SIZE_TO_CLASS: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8, string> = {
  1: 'text-lg',
  2: 'text-[1.094rem]',
  3: 'text-[1.063rem]',
  4: 'text-base',
  5: 'text-[0.938rem]',
  6: 'text-[0.906rem]',
  7: 'text-sm',
  8: 'text-xs',
} as const;

// 줄 간격 스타일
const LEADING_STYLES: Record<'tight' | 'normal' | 'relaxed' | '7', string> = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  '7': 'leading-7',
} as const;

// 폰트 굵기 스타일
const WEIGHT_STYLES: Record<'normal' | 'medium' | 'semibold', string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
} as const;

const Description: React.FC<DescriptionProps> = ({
  children,
  size = 4,
  color = 'text-text-secondary',
  className = '',
  leading = 'relaxed',
  weight = 'normal',
  preserveWhitespace = false,
  breakKeep = false,
}) => {
  // 추가 스타일 계산 (useMemo로 최적화)
  const additionalStyles = React.useMemo(() => {
    return [
      preserveWhitespace ? 'whitespace-pre-line' : '',
      breakKeep ? 'break-keep' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }, [preserveWhitespace, breakKeep]);

  // 전체 className 병합 (useMemo로 최적화)
  const mergedClassName = React.useMemo(() => {
    return [
      color,
      SIZE_TO_CLASS[size],
      LEADING_STYLES[leading],
      WEIGHT_STYLES[weight],
      additionalStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  }, [color, size, leading, weight, additionalStyles, className]);

  return <p className={mergedClassName}>{children}</p>;
};

export default Description;
