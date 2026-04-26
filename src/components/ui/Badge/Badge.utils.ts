import type React from 'react';
import type { RadiusKey } from '../shared/UI.config';
import type { BadgeAnchor, BadgeOffset, BadgeShape } from './Badge.types';

/**
 * `position: absolute` + `anchor` 조합별 위치.
 * 부모(보통 아바타·버튼 래퍼) 박스 기준으로 모서리/중앙에 붙이고,
 * `transform`으로 배지 자체 크기만큼 바깥으로 밀어 겹치게 한다(기존 ±5px 보정 유지).
 */
const ANCHOR_STYLE_MAP: Record<BadgeAnchor, React.CSSProperties> = {
  'top-left': {
    top: 0,
    left: 0,
    transform: 'translateY(calc(-100% + 5px)) translateX(calc(-100% + 5px))',
  },
  'top-right': {
    top: 0,
    right: 0,
    transform: 'translateY(calc(-100% + 5px)) translateX(calc(100% - 5px))',
  },
  'bottom-left': {
    bottom: 0,
    left: 0,
    transform: 'translateY(calc(100% - 5px)) translateX(calc(-100% + 5px))',
  },
  'bottom-right': {
    bottom: 0,
    right: 0,
    transform: 'translateY(calc(100% - 5px)) translateX(calc(100% - 5px))',
  },
  'center-left': {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%) translateX(calc(-100% + 5px))',
  },
  'center-right': {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%) translateX(calc(100% - 5px))',
  },
};

const POS_MAP: Record<'absolute' | 'relative' | 'static', string> = {
  absolute: 'absolute',
  relative: 'relative',
  static: 'static',
};

export const SIZE_MAP = {
  circle: {
    xs: 'w-5 h-5 text-2xs',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-lg',
  },
  rect: {
    xs: 'px-2 py-0.5 text-2xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  },
} as const;

export function getSizeClasses(
  size: 'xs' | 'sm' | 'md' | 'lg',
  shape: BadgeShape
) {
  return shape === 'circle' ? SIZE_MAP.circle[size] : SIZE_MAP.rect[size];
}

export function getPositionClasses(
  position: 'static' | 'relative' | 'absolute'
) {
  return POS_MAP[position];
}

export function getAnchorStyle(
  position: 'static' | 'relative' | 'absolute',
  anchor?: BadgeAnchor
): React.CSSProperties {
  if (position !== 'absolute' || !anchor) return {};
  return { ...ANCHOR_STYLE_MAP[anchor] };
}

/** `offset`을 margin으로 적용해 앵커 기준 미세 이동 */
export function getOffsetMarginStyle(
  offset?: BadgeOffset
): React.CSSProperties {
  if (!offset) return {};
  return {
    ...(offset.top ? { marginTop: offset.top } : {}),
    ...(offset.right ? { marginRight: offset.right } : {}),
    ...(offset.bottom ? { marginBottom: offset.bottom } : {}),
    ...(offset.left ? { marginLeft: offset.left } : {}),
  };
}

export function getLiveAttrs(ariaLive?: 'off' | 'polite' | 'assertive') {
  return ariaLive && ariaLive !== 'off'
    ? ({ role: 'status', 'aria-live': ariaLive, 'aria-atomic': true } as const)
    : ({} as const);
}

export function getMaxWidthStyle(
  shape: BadgeShape,
  maxWidth?: string | number
) {
  if (shape === 'circle' || !maxWidth) return {} as React.CSSProperties;
  return {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
  } as React.CSSProperties;
}

export function resolveDisplayContent(
  count: number | undefined,
  maxCount: number,
  showZero: boolean,
  children: React.ReactNode
) {
  if (typeof count === 'number') {
    if (count === 0 && !showZero) return null;
    return count > maxCount ? `${maxCount}+` : count;
  }
  return children;
}

/** Badge `shape` → 공통 `getRadiusClass`용 키 (SHAPE_MAP 등 이중 정의 없음) */
export const mapBadgeShapeToRadius = (shape: BadgeShape): RadiusKey => {
  switch (shape) {
    case 'circle':
    case 'pill':
      return 'pill';
    case 'rounded':
      return 'lg';
    case 'square':
      return 'none';
    default:
      return 'lg';
  }
};
