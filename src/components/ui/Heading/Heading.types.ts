import React from 'react';

// ===== 공통 타입 정의 =====

/** 레벨 타입 (1-8) */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** 크기 타입 (xs부터 4xl까지) */
export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

/** 간격 타입 (none 포함) */
export type SpacingType = 'none' | SizeType;

/** 타이포그래피 관련 속성 */
export interface TypographyProps {
  /**
   * 사이즈 지정 (1-8)
   * HTML 태그(h1~h6) 결정 + visualSize가 없으면 시각적 크기 결정
   */
  size?: HeadingLevel;
  /**
   * 보이는 사이즈 - size를 override하여 실제 표시되는 크기를 결정
   * size보다 우선순위가 높음
   */
  visualSize?: SizeType;
  fontFamily?: 'default' | 'kor-point' | 'eng-point';
}

/** 간격 관련 속성 */
export interface SpacingProps {
  bottomSpacing?: SpacingType;
}

/** bottomSpacing을 rem 단위로 변환하는 매핑 */
export const BOTTOM_SPACING_HEIGHTS: Record<SpacingType, string> = {
  none: '0',
  xs: '0.1rem',
  sm: '0.25rem',
  md: '0.4rem',
  lg: '0.55rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
};

/** pageHeader, SectionHeader 에서 사용하는 bottomSpacing 매핑 */
export const PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING: Record<
  SpacingType,
  string
> = {
  none: '0',
  xs: '1rem',
  sm: '1.5rem',
  md: '2rem',
  lg: '2.5rem',
  xl: '3rem',
  '2xl': '3.5rem',
  '3xl': '4rem',
  '4xl': '4.5rem',
};

/** 클래스명 그룹 */
export interface ClassNameProps {
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
}

// ===== 컴포넌트별 타입 정의 =====

export interface HeadingProps
  extends TypographyProps,
    SpacingProps,
    Pick<ClassNameProps, 'className'> {
  children: React.ReactNode;
}

export interface PageHeaderProps extends TypographyProps, SpacingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  layout?: {
    centered?: boolean;
    actions?: React.ReactNode;
  };
  className?: {
    root?: string;
    title?: string;
    subtitle?: string;
  };
}

export interface SectionHeaderProps extends TypographyProps, SpacingProps {
  title: string;
  description?: string;
  descriptionPosition?: 'above' | 'below';
  className?: {
    root?: string;
    title?: string;
    description?: string;
  };
}
