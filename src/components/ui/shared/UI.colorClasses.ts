import { cn, ld } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { Color, Variant } from './UI.config';

export type UiInteractionState = 'interactive' | 'static';

/** `interactive` / `static` 분기별로 넣을 클래스 문자열 묶음. */
type StatefulClasses = Record<UiInteractionState, string>;
type ColorVariantTable = Record<Color, Record<Variant, StatefulClasses>>;

/**
 * 색상 토큰 문자열을 interactive / static **두 분기에 동일하게** 쓴다.
 *
 * - solid·soft: hover는 이 테이블이 아니라 `variantBaseStyles`의
 *   `hover:brightness-*` 등으로 처리하므로, 토큰 행에서는 분기를 나누지 않는다.
 *   (interactive여도 “색 문자열”은 같고, 밝기만 variant 레이어에서 바뀐다.)
 * - plain 등 hover가 없는 경우도 동일하게 한 문자열만 쓴다.
 */
function unify(classes: string): StatefulClasses {
  return {
    interactive: classes,
    static: classes,
  };
}

/**
 * interactive일 때만 `hover` 클래스를 덧붙이고, static일 때는 `base`만 쓴다.
 *
 * outline·minimal은 배경/테두리 변화를 토큰 행에서 `hover:bg-...` 등으로
 * 직접 주는 편이 읽기 쉬워, base + hover **쌍**으로 정의한다.
 */
function pair({
  base,
  hover,
}: {
  base: string;
  hover: string;
}): StatefulClasses {
  return {
    interactive: cn(base, hover),
    static: base,
  };
}

/**
 * 색상 토큰 단일 소스.
 *
 * - `ld(light, dark)`: 라이트 기본 + `dark:` 오버라이드를 한 문자열로 묶는다.
 * - 각 color × variant 조합은 `unify(...)` 또는 `pair({ base, hover })`로
 *   `interactive` / `static` 분기 값을 채운다. (위 두 헬퍼 주석 참고)
 */
const COLOR_VARIANT_TABLE: ColorVariantTable = {
  brand: {
    solid: unify(
      ld(
        'bg-primary-900 text-primary-50 border-primary-900',
        'dark:bg-primary-300 dark:text-primary-900 dark:border-primary-300'
      )
    ),
    soft: unify(
      ld(
        'bg-primary-300 text-primary-900 border-primary-300',
        'dark:bg-primary-700 dark:text-primary-50 dark:border-primary-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-primary-900 border-primary-900',
        'dark:text-primary-200 dark:border-primary-400'
      ),
      hover: ld(
        'hover:bg-primary-100',
        'dark:hover:bg-primary-700 dark:hover:text-primary-100'
      ),
    }),
    minimal: pair({
      base: ld('text-primary-900', 'dark:text-primary-400'),
      hover: ld(
        'hover:bg-primary-100',
        'dark:hover:bg-primary-700 dark:hover:text-primary-100'
      ),
    }),
    plain: unify(ld('text-primary-900', 'dark:text-primary-400')),
  },

  subBrand: {
    solid: unify(
      ld(
        'bg-secondary-600 text-secondary-50 border-secondary-600',
        'dark:bg-secondary-300 dark:text-secondary-900 dark:border-secondary-300'
      )
    ),
    soft: unify(
      ld(
        'bg-secondary-300 text-secondary-900 border-secondary-300',
        'dark:bg-secondary-700 dark:text-secondary-50 dark:border-secondary-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-secondary-600 border-secondary-600',
        'dark:text-secondary-300 dark:border-secondary-300'
      ),
      hover: ld('hover:bg-secondary-100', 'dark:hover:bg-secondary-700'),
    }),
    minimal: pair({
      base: ld('text-secondary-600', 'dark:text-secondary-300'),
      hover: ld('hover:bg-secondary-100', 'dark:hover:bg-secondary-700'),
    }),
    plain: unify(ld('text-secondary-600', 'dark:text-secondary-300')),
  },

  success: {
    solid: unify(
      ld(
        'bg-success-600 text-success-50 border-success-600',
        'dark:bg-success-300 dark:text-success-900 dark:border-success-300'
      )
    ),
    soft: unify(
      ld(
        'bg-success-300 text-success-900 border-success-300',
        'dark:bg-success-700 dark:text-success-50 dark:border-success-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-success-600 border-success-600',
        'dark:text-success-300 dark:border-success-300'
      ),
      hover: ld('hover:bg-success-100', 'dark:hover:bg-success-700'),
    }),
    minimal: pair({
      base: ld('text-success-600', 'dark:text-success-300'),
      hover: ld('hover:bg-success-100', 'dark:hover:bg-success-700'),
    }),
    plain: unify(ld('text-success-600', 'dark:text-success-300')),
  },

  warning: {
    solid: unify(
      ld(
        'bg-warning-600 text-warning-50 border-warning-600',
        'dark:bg-warning-300 dark:text-warning-900 dark:border-warning-300'
      )
    ),
    soft: unify(
      ld(
        'bg-warning-300 text-warning-900 border-warning-300',
        'dark:bg-warning-700 dark:text-warning-50 dark:border-warning-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-warning-600 border-warning-600',
        'dark:text-warning-300 dark:border-warning-300'
      ),
      hover: ld('hover:bg-warning-100', 'dark:hover:bg-warning-700'),
    }),
    minimal: pair({
      base: ld('text-warning-600', 'dark:text-warning-300'),
      hover: ld('hover:bg-warning-100', 'dark:hover:bg-warning-700'),
    }),
    plain: unify(ld('text-warning-600', 'dark:text-warning-300')),
  },

  error: {
    solid: unify(
      ld(
        'bg-danger-700 text-danger-50 border-danger-700',
        'dark:bg-danger-300 dark:text-danger-900 dark:border-danger-300'
      )
    ),
    soft: unify(
      ld(
        'bg-danger-300 text-danger-900 border-danger-300',
        'dark:bg-danger-700 dark:text-danger-50 dark:border-danger-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-danger-700 border-danger-700',
        'dark:text-danger-300 dark:border-danger-300'
      ),
      hover: ld('hover:bg-danger-100', 'dark:hover:bg-danger-700'),
    }),
    minimal: pair({
      base: ld('text-danger-700', 'dark:text-danger-300'),
      hover: ld('hover:bg-danger-100', 'dark:hover:bg-danger-700'),
    }),
    plain: unify(ld('text-danger-700', 'dark:text-danger-300')),
  },

  info: {
    solid: unify(
      ld(
        'bg-info-600 text-info-50 border-info-600',
        'dark:bg-info-300 dark:text-info-900 dark:border-info-300'
      )
    ),
    soft: unify(
      ld(
        'bg-info-300 text-info-900 border-info-300',
        'dark:bg-info-700 dark:text-info-50 dark:border-info-700'
      )
    ),
    outline: pair({
      base: ld(
        'text-info-600 border-info-600',
        'dark:text-info-300 dark:border-info-300'
      ),
      hover: ld('hover:bg-info-100', 'dark:hover:bg-info-700'),
    }),
    minimal: pair({
      base: ld('text-info-600', 'dark:text-info-300'),
      hover: ld('hover:bg-info-100', 'dark:hover:bg-info-700'),
    }),
    plain: unify(ld('text-info-600', 'dark:text-info-300')),
  },

  neutral: {
    solid: unify(
      ld(
        'bg-gray-300 text-gray-800 border-gray-300',
        'dark:bg-gray-300 dark:text-gray-900 dark:border-gray-300'
      )
    ),
    soft: unify(
      ld(
        'bg-gray-200 text-gray-600 border-gray-200',
        'dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600'
      )
    ),
    outline: pair({
      base: ld(
        'text-gray-500 border-gray-400',
        'dark:text-gray-200 dark:border-gray-300'
      ),
      hover: ld('hover:bg-gray-200', 'dark:hover:bg-gray-700'),
    }),
    minimal: pair({
      base: ld('text-gray-600', 'dark:text-gray-200'),
      hover: ld('hover:bg-gray-200', 'dark:hover:bg-gray-700'),
    }),
    plain: unify(ld('text-gray-600', 'dark:text-gray-200')),
  },
};

/**
 * cva variants 등록용 키 맵 생성기.
 * 이 파일은 실제 클래스 값을 compoundVariants에서만 주입하므로
 * variants에는 "허용 가능한 키 집합"만 등록한다.
 */
function createVariantKeyMap<const T extends readonly string[]>(
  values: T
): Record<T[number], ''> {
  return Object.fromEntries(values.map(value => [value, ''])) as Record<
    T[number],
    ''
  >;
}

const UI_COLOR_KEYS = createVariantKeyMap([
  'brand',
  'subBrand',
  'success',
  'warning',
  'error',
  'info',
  'neutral',
] as const);

const UI_VARIANT_KEYS = createVariantKeyMap([
  'solid',
  'soft',
  'outline',
  'minimal',
  'plain',
] as const);

const INTERACTION_KEYS = createVariantKeyMap([
  'interactive',
  'static',
] as const);

function buildColorCompoundVariants(table: ColorVariantTable) {
  const compoundVariants: Array<{
    color: Color;
    variant: Variant;
    state: UiInteractionState;
    class: string;
  }> = [];

  for (const [color, variants] of Object.entries(table) as [
    Color,
    Record<Variant, StatefulClasses>,
  ][]) {
    for (const [variant, states] of Object.entries(variants) as [
      Variant,
      StatefulClasses,
    ][]) {
      compoundVariants.push({
        color,
        variant,
        state: 'interactive',
        class: states.interactive,
      });
      compoundVariants.push({
        color,
        variant,
        state: 'static',
        class: states.static,
      });
    }
  }

  return compoundVariants;
}

const colorCompoundVariants = buildColorCompoundVariants(COLOR_VARIANT_TABLE);

/**
 * 분리 이유:
 * - variantBaseStyles: 색상과 무관한 "형태/인터랙션 규칙"만 담당
 *   (예: outline은 bg-transparent, plain은 hover:underline)
 * - colorTokenStyles: color x variant x state 조합의 토큰 클래스만 담당
 *
 * 둘을 합치면 하나의 cva에 구조 규칙 + 색상 토큰 조합이 함께 섞여
 * compoundVariants 가독성과 변경 범위가 커진다.
 * 현재는 "구조 규칙 변경"과 "색상 토큰 변경"을 독립적으로 다루기 위해 분리한다.
 */
const variantBaseStyles = cva('', {
  variants: {
    variant: {
      solid: '',
      soft: '',
      outline: 'bg-transparent',
      minimal: 'bg-transparent border-transparent',
      plain: 'bg-transparent border-transparent',
    },
    state: INTERACTION_KEYS,
  },
  compoundVariants: [
    {
      variant: 'solid',
      state: 'interactive',
      class: 'hover:brightness-80 dark:hover:brightness-70',
    },
    {
      variant: 'soft',
      state: 'interactive',
      class: 'hover:brightness-80 dark:hover:brightness-70',
    },
    {
      variant: 'plain',
      state: 'interactive',
      class: 'hover:underline',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    state: 'interactive',
  },
});

// color x variant x state 조합에서 실제 텍스트/배경/보더 클래스를 담당한다.
const colorTokenStyles = cva('', {
  variants: {
    color: UI_COLOR_KEYS,
    variant: UI_VARIANT_KEYS,
    state: INTERACTION_KEYS,
  },
  compoundVariants: colorCompoundVariants,
  defaultVariants: {
    color: 'brand',
    variant: 'solid',
    state: 'interactive',
  },
});

export type UiVariantStyleProps = {
  color?: Color;
  variant?: Variant;
  interactive?: boolean;
};

export function getUiVariantClasses({
  color = 'brand',
  variant = 'solid',
  interactive = true,
}: UiVariantStyleProps): string {
  const state: UiInteractionState = interactive ? 'interactive' : 'static';

  return cn(
    variantBaseStyles({ variant, state }),
    colorTokenStyles({ color, variant, state })
  );
}

export type UiColorVariantProps = VariantProps<typeof colorTokenStyles>;
