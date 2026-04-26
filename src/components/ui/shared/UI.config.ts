import { getUiVariantClasses } from './UI.colorClasses';

// 공통 타입 정의
export type Color =
  | 'brand'
  | 'subBrand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type Variant = 'solid' | 'soft' | 'outline' | 'minimal' | 'plain';

export type Size = 'xs' | 'sm' | 'md' | 'lg';

// 반경 설정
const RADIUS_CONFIG = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  /** 캡슐/풀 라운드 (`rounded-full`). 원형 아이콘 버튼은 Button 전용 `rounded="circle"`(+ aspect-square) 사용 */
  pill: 'rounded-full',
} as const;

export type RadiusKey = keyof typeof RADIUS_CONFIG;

export const getRadiusClass = (key: RadiusKey): string => RADIUS_CONFIG[key];

// Disabled 상태에서는 일부 variant를 의도적으로 동일한 표현으로 수렴시킨다.
export const DISABLED_CLASSES = {
  solid:
    'bg-disabled-bg text-disabled-text border-transparent !cursor-not-allowed',
  soft: 'bg-disabled-bg text-disabled-text border-transparent !cursor-not-allowed',
  outline:
    'bg-disabled-bg text-disabled-text border-disabled-border !cursor-not-allowed',
  minimal:
    'text-disabled-bg dark:text-disabled-text !cursor-not-allowed border-transparent',
  plain:
    'text-disabled-bg dark:text-disabled-text !cursor-not-allowed border-transparent',
} as const;

// 색상별 클래스 생성 함수
export const getColorClasses = (
  color: Color,
  variant: Variant,
  interactive: boolean = true
): string => {
  return getUiVariantClasses({ color, variant, interactive });
};
