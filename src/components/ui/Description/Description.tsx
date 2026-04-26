import React from 'react';

import { cn } from '@/utils/cn';
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

const DEFAULT_BODY_TEXT_CLASS = 'text-text-secondary';

/**
 * textClassName 미지정 시: layout용 className이 비어 있으면 본문 기본색, 아니면(부모가 className으로 톤 지정) 색 클래스 생략.
 */
function resolveTextClassName(
  textClassName: string | undefined,
  layoutClassName: string
): string | undefined {
  if (textClassName !== undefined) {
    return textClassName;
  }
  if (layoutClassName.trim() === '') {
    return DEFAULT_BODY_TEXT_CLASS;
  }
  return undefined;
}

const Description: React.FC<DescriptionProps> = ({
  children,
  size = 4,
  textClassName,
  className = '',
  leading = 'relaxed',
  weight = 'normal',
  preserveWhitespace = false,
  breakKeep = false,
}) => {
  const resolvedTextClassName = resolveTextClassName(textClassName, className);

  return (
    <p
      className={cn(
        resolvedTextClassName,
        SIZE_TO_CLASS[size],
        LEADING_STYLES[leading],
        WEIGHT_STYLES[weight],
        preserveWhitespace && 'whitespace-pre-line',
        breakKeep && 'break-keep',
        className
      )}
    >
      {children}
    </p>
  );
};

export default Description;
