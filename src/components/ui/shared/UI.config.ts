import { COLOR_VARIANT_CLASSES } from './UI.colorClasses';

// 공통 타입 정의
export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gray';

export type Variant = 'filled' | 'tonal' | 'outlined' | 'ghost' | 'text';

export type Size = 'xs' | 'sm' | 'md' | 'lg';

// 반경 설정
const RADIUS_CONFIG = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
  circle: 'rounded-full',
} as const;

export type RadiusKey = keyof typeof RADIUS_CONFIG;

export const getRadiusClass = (key: RadiusKey): string => RADIUS_CONFIG[key];

// Disabled 상태 클래스
export const DISABLED_CLASSES = {
  filled:
    'bg-disabled-bg text-disabled-text border-transparent !cursor-not-allowed',
  tonal:
    'bg-disabled-bg text-disabled-text border-transparent !cursor-not-allowed',
  outlined:
    'bg-disabled-bg text-disabled-text border-disabled-border !cursor-not-allowed',
  ghost:
    'text-disabled-bg dark:text-disabled-text !cursor-not-allowed border-transparent',
  text: 'text-disabled-bg dark:text-disabled-text !cursor-not-allowed border-transparent',
} as const;

// Variant별 기본 클래스
export const VARIANT_CLASSES = {
  filled: 'hover:brightness-80 dark:hover:brightness-70',
  tonal: 'hover:brightness-80 dark:hover:brightness-70',
  outlined: 'bg-transparent',
  ghost: 'bg-transparent border-transparent',
  text: 'bg-transparent border-transparent hover:underline',
} as const;

// 색상별 클래스 생성 함수
export const getColorClasses = (
  color: Color,
  variant: string,
  noHoverActive: boolean = false
): string => {
  const baseClasses = VARIANT_CLASSES[variant as keyof typeof VARIANT_CLASSES];
  const colorClasses = COLOR_VARIANT_CLASSES[color]?.[variant as Variant] || '';

  if (noHoverActive) {
    const hoverPattern = /(?:dark:)?hover:[^\s]+/g;
    const cleanBaseClasses = baseClasses.replace(hoverPattern, '');
    const cleanColorClasses = colorClasses.replace(hoverPattern, '');
    return `${cleanBaseClasses} ${cleanColorClasses}`.trim();
  }

  const activeClasses =
    'active:scale-95 active:transition-transform active:duration-100';
  return `${baseClasses} ${colorClasses} ${activeClasses}`.trim();
};

// 기본 색상 클래스
export const getDefaultColorClasses = (variant: string): string => {
  const map = {
    filled: 'bg-gray-600 text-white border-gray-600',
    tonal: 'bg-gray-100 text-gray-900 border-gray-100',
    outlined: 'bg-transparent text-gray-900 border-gray-600',
    ghost: 'bg-transparent text-gray-900 border-transparent',
    text: 'bg-transparent text-gray-900 border-transparent',
  } as const;
  return map[variant as keyof typeof map] ?? map.filled;
};
