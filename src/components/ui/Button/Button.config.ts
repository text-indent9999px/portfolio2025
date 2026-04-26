import { cn } from '@/utils/cn';
import { getRadiusClass } from '../shared/UI.config';

/**
 * 모서리(rounded) — 공통 `pill` + Button 전용 `circle`(pill + 정사각 비율)
 */
export const ROUNDED_CLASSES = {
  none: getRadiusClass('none'),
  sm: getRadiusClass('sm'),
  md: getRadiusClass('md'),
  lg: getRadiusClass('lg'),
  pill: getRadiusClass('pill'),
  circle: cn(getRadiusClass('pill'), 'aspect-square'),
} as const;

/**
 * 일반 패딩·타이포 (텍스트+아이콘)
 */
export const SIZE_CLASSES = {
  xs: 'px-2 py-1.5 text-xs lg:px-3 lg:py-1.5',
  sm: 'px-2 py-1.5 text-sm lg:px-3 lg:py-1.5',
  md: 'px-3 py-2 text-base lg:px-4 lg:py-2',
  lg: 'px-3 py-3 text-lg lg:px-4 lg:py-3',
} as const;

/**
 * 아이콘 전용·circle 등 고정 비율 박스
 */
export const EQUAL_RATIO_CLASSES = {
  xs: 'h-6 p-0 w-6',
  sm: 'h-8 p-0 w-8',
  md: 'h-11 p-0 w-11',
  lg: 'h-12 p-0 w-12',
} as const;

/** 레이아웃·포커스 링 등 버튼 공통 (색/비활성은 UI.config 쪽) */
export const BASE_CLASSES =
  'inline-flex items-center justify-center gap-1 relative box-border border-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 will-change-transform select-none';
