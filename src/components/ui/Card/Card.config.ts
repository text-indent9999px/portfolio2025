import type { CSSProperties } from 'react';
import { cva } from 'class-variance-authority';
import { ld } from '@/utils/cn';

/**
 * 카드 패딩 단계 — `cva`의 padding variant로만 클래스 문자열을 정의
 */
const paddingStyles = cva('', {
  variants: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: { padding: 'md' },
});

export const PADDING_STYLES = {
  sm: paddingStyles({ padding: 'sm' }),
  md: paddingStyles({ padding: 'md' }),
  lg: paddingStyles({ padding: 'lg' }),
} as const;

/**
 * surface 단계별 테두리 — 라이트/다크 토큰을 `ld`로 분리
 */
export const BORDER_STYLES = {
  min: ld('border-surface-level-1', 'dark:border-surface-level-4'),
  1: ld('border-surface-level-2', 'dark:border-surface-level-4'),
  2: ld('border-surface-level-3', 'dark:border-surface-level-4'),
  3: ld('border-surface-level-4', 'dark:border-surface-level-4'),
  4: ld('border-surface-level-5', 'dark:border-surface-level-5'),
  5: ld('border-surface-level-3', 'dark:border-surface-level-6'),
  6: ld('border-surface-level-3', 'dark:border-surface-level-max'),
  7: ld('border-surface-level-3', 'dark:border-surface-level-max'),
  max: ld('border-surface-level-4', 'dark:border-surface-level-5'),
} as const;

/** Elevation(그림자) 단계 — 테마 공통 유틸만 사용 */
const elevationStyles = cva('', {
  variants: {
    elevation: {
      0: 'elevation-0',
      1: 'elevation-1',
      2: 'elevation-2',
      3: 'elevation-3',
      4: 'elevation-4',
    },
  },
  defaultVariants: { elevation: 0 },
});

export const ELEVATION_CLASSES = {
  0: elevationStyles({ elevation: 0 }),
  1: elevationStyles({ elevation: 1 }),
  2: elevationStyles({ elevation: 2 }),
  3: elevationStyles({ elevation: 3 }),
  4: elevationStyles({ elevation: 4 }),
} as const;

/** Surface 배경 단계 */
const surfaceStyles = cva('', {
  variants: {
    surface: {
      min: 'bg-surface-level-min',
      1: 'bg-surface-level-1',
      2: 'bg-surface-level-2',
      3: 'bg-surface-level-3',
      4: 'bg-surface-level-4',
      5: 'bg-surface-level-5',
      6: 'bg-surface-level-6',
      7: 'bg-surface-level-7',
      max: 'bg-surface-level-max',
    },
  },
  defaultVariants: { surface: 'min' },
});

export const SURFACE_LEVEL_CLASSES = {
  min: surfaceStyles({ surface: 'min' }),
  1: surfaceStyles({ surface: 1 }),
  2: surfaceStyles({ surface: 2 }),
  3: surfaceStyles({ surface: 3 }),
  4: surfaceStyles({ surface: 4 }),
  5: surfaceStyles({ surface: 5 }),
  6: surfaceStyles({ surface: 6 }),
  7: surfaceStyles({ surface: 7 }),
  max: surfaceStyles({ surface: 'max' }),
} as const;

export type ElevationKey = keyof typeof ELEVATION_CLASSES;
export type SurfaceLevelKey = keyof typeof SURFACE_LEVEL_CLASSES;
export type PaddingKey = keyof typeof PADDING_STYLES;

export const isElevationKey = (value: number): value is ElevationKey => {
  return value in ELEVATION_CLASSES;
};

export const isSurfaceLevelKey = (
  value: string | number
): value is SurfaceLevelKey => {
  return value in SURFACE_LEVEL_CLASSES;
};

export const isPaddingKey = (value: string): value is PaddingKey => {
  return value in PADDING_STYLES;
};

export const getClickableStyles = (isClickable: boolean): string => {
  return isClickable ? 'cursor-pointer' : '';
};

export const getGridClasses = (
  styles: { card?: string; [key: string]: string | undefined },
  hasThumb: boolean,
  hasHeader: boolean,
  hasFooter: boolean,
  thumbPosition?: 'left' | 'right' | 'top' | 'bottom'
): string => {
  const position = thumbPosition || 'left';

  return [
    styles.card || '',
    hasThumb ? styles['with-thumb'] : '',
    hasHeader ? styles['with-header'] : '',
    hasFooter ? styles['with-footer'] : '',
    hasThumb && position === 'right' ? styles['thumb-right'] : '',
    hasThumb && position === 'top' ? styles['thumb-top'] : '',
    hasThumb && position === 'bottom' ? styles['thumb-bottom'] : '',
  ]
    .filter(Boolean)
    .join(' ');
};

/** `elevation === 0`이면 그림자 유틸을 붙이지 않는다. 1~4만 `elevation-*` 적용. */
export const getElevationClass = (elevation: number): string => {
  const effectiveElevation = isElevationKey(elevation) ? elevation : 0;
  if (effectiveElevation === 0) return '';
  return ELEVATION_CLASSES[effectiveElevation];
};

export const getSurfaceBackgroundClass = (
  surfaceLevel: string | number
): string => {
  const key = isSurfaceLevelKey(surfaceLevel) ? surfaceLevel : 'min';
  return SURFACE_LEVEL_CLASSES[key];
};

export const getPaddingClass = (padding: string): string => {
  return isPaddingKey(padding) ? PADDING_STYLES[padding] : PADDING_STYLES.md;
};

/** `outline`일 때만 `surfaceLevel`에 대응하는 테두리 색. `solid`는 투명 테두리만 유지. */
export const getBorderClass = (
  appearance: string,
  surfaceLevel: string | number
): string => {
  if (appearance === 'solid') {
    return 'border-2 border-transparent';
  }

  const borderKey = isSurfaceLevelKey(surfaceLevel) ? surfaceLevel : 'min';

  if (borderKey in BORDER_STYLES) {
    return 'border-2 ' + BORDER_STYLES[borderKey as keyof typeof BORDER_STYLES];
  }

  return 'border-2 border-transparent';
};

type CardInlineStyle = CSSProperties & {
  ['--card-columns']?: string;
  ['--card-rows']?: string;
  ['--card-gap']?: string;
};

export const getInlineStyle = (
  ratio?: string,
  gap?: string,
  thumbPosition?: 'left' | 'right' | 'top' | 'bottom'
): CardInlineStyle => {
  const style: CardInlineStyle = {};

  if (ratio) {
    if (thumbPosition === 'top' || thumbPosition === 'bottom') {
      style['--card-rows'] = ratio;
    } else {
      style['--card-columns'] = ratio;
    }
  }

  if (gap) {
    style['--card-gap'] = gap;
  }

  return style;
};
