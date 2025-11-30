// 패딩 스타일
export const PADDING_STYLES = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

// 카드 변형 스타일
export const VARIANT_STYLES = {
  default: '',
  outlined: 'border-1',
} as const;

export const BORDER_STYLES = {
  min: 'border-surface-level-1 dark:border-surface-level-4',
  1: 'border-surface-level-2 dark:border-surface-level-4',
  2: 'border-surface-level-3 dark:border-surface-level-4',
  3: 'border-surface-level-4 dark:border-surface-level-4',
  4: 'border-surface-level-5 dark:border-surface-level-5',
  5: 'border-surface-level-3 dark:border-surface-level-6',
  6: 'border-surface-level-3 dark:border-surface-level-max',
  7: 'border-surface-level-3 dark:border-surface-level-max',
  max: 'border-surface-level-4 dark:border-surface-level-5',
} as const;

// Elevation 공통 클래스
export const ELEVATION_CLASSES = {
  0: 'elevation-0',
  1: 'elevation-1',
  2: 'elevation-2',
  3: 'elevation-3',
  4: 'elevation-4',
} as const;

// Surface level 배경 클래스
export const SURFACE_LEVEL_CLASSES = {
  min: 'bg-surface-level-min',
  1: 'bg-surface-level-1',
  2: 'bg-surface-level-2',
  3: 'bg-surface-level-3',
  4: 'bg-surface-level-4',
  5: 'bg-surface-level-5',
  6: 'bg-surface-level-6',
  7: 'bg-surface-level-7',
  max: 'bg-surface-level-max',
} as const;

// 타입 가드 함수들
export type ElevationKey = keyof typeof ELEVATION_CLASSES;
export type SurfaceLevelKey = keyof typeof SURFACE_LEVEL_CLASSES;
export type PaddingKey = keyof typeof PADDING_STYLES;
export type VariantKey = keyof typeof VARIANT_STYLES;

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

export const isVariantKey = (value: string): value is VariantKey => {
  return value in VARIANT_STYLES;
};

// 클래스 계산 함수들
export const getClickableStyles = (isClickable: boolean): string => {
  return isClickable ? 'cursor-pointer transition-all duration-400' : '';
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

export const getElevationClass = (elevation: number): string => {
  const effectiveElevation = isElevationKey(elevation) ? elevation : 0;
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

export const getVariantClass = (variant: string): string => {
  return isVariantKey(variant)
    ? VARIANT_STYLES[variant]
    : VARIANT_STYLES.default;
};

export const getBorderClass = (
  variant: string,
  surfaceLevel: string | number
): string => {
  if (variant !== 'outlined') {
    return 'border-2 border-transparent';
  }

  // surfaceLevel을 BORDER_STYLES의 키로 변환
  // elevation에 따라 적절한 border 스타일 선택
  const borderKey = isSurfaceLevelKey(surfaceLevel) ? surfaceLevel : 'min';

  // BORDER_STYLES에 해당 키가 있는지 확인
  if (borderKey in BORDER_STYLES) {
    return 'border-2 ' + BORDER_STYLES[borderKey as keyof typeof BORDER_STYLES];
  }

  return 'border-2 border-transparent';
};

export const getInlineStyle = (
  ratio?: string,
  gap?: string,
  thumbPosition?: 'left' | 'right' | 'top' | 'bottom'
): React.CSSProperties & {
  ['--card-columns']?: string;
  ['--card-rows']?: string;
  ['--card-gap']?: string;
} => {
  const style: React.CSSProperties & {
    ['--card-columns']?: string;
    ['--card-rows']?: string;
    ['--card-gap']?: string;
  } = {};

  if (ratio) {
    // thumbPosition에 따라 columns 또는 rows에 할당
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
