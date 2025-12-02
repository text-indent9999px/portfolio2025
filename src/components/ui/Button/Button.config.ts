// 공통 설정 import
import { getRadiusClass } from '../shared/UI.config';

// 스타일 클래스 설정
export const STYLE_CLASSES = {
  rounded: {
    none: getRadiusClass('none'),
    sm: getRadiusClass('sm'),
    md: getRadiusClass('md'),
    lg: getRadiusClass('lg'),
    full: getRadiusClass('full'),
    circle: getRadiusClass('circle') + ' aspect-square',
  },
  size: {
    xs: 'px-2 py-1.5 text-xs lg:px-3 lg:py-1.5',
    sm: 'px-2 py-1.5 text-sm lg:px-3 lg:py-1.5',
    md: 'px-3 py-2 text-base lg:px-4 lg:py-2',
    lg: 'px-3 py-3 text-lg lg:px-4 lg:py-3',
  },
  equalRatio: {
    xs: 'h-6 p-0 aspect-square',
    sm: 'h-8 p-0 aspect-square',
    md: 'h-11 p-0 aspect-square',
    lg: 'h-12 p-0 aspect-square',
  },
} as const;

// 기본 클래스
export const BASE_CLASSES =
  'inline-flex items-center justify-center gap-1 relative box-border border-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 will-change-transform';

// 공통 설정 import
import { VARIANT_CLASSES } from '../shared/UI.config';
export { VARIANT_CLASSES };
