import type React from 'react';
import type { RadiusKey } from '../shared/UI.config';
import type { BadgeShape } from './Badge.types';

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

export const SHAPE_MAP: Record<BadgeShape, string> = {
  circle: 'rounded-full',
  pill: 'rounded-full',
  rounded: 'rounded-md',
  square: 'rounded-none',
};

export const POS_MAP: Record<'absolute' | 'relative' | 'static', string> = {
  absolute: 'absolute',
  relative: 'relative',
  static: '',
};

export function getSizeClasses(
  size: 'xs' | 'sm' | 'md' | 'lg',
  shape: BadgeShape
) {
  return shape === 'circle' ? SIZE_MAP.circle[size] : SIZE_MAP.rect[size];
}

export function getShapeClasses(shape: BadgeShape) {
  return SHAPE_MAP[shape];
}

export function getPositionClasses(
  position: 'static' | 'relative' | 'absolute'
) {
  return POS_MAP[position];
}

export function getAnchorStyle(
  position: 'static' | 'relative' | 'absolute',
  anchor?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'center-left'
    | 'center-right'
) {
  if (position !== 'absolute' || !anchor) return {} as React.CSSProperties;
  const style: React.CSSProperties = {};
  const transforms: string[] = [];

  if (anchor.includes('top')) {
    style.top = '0';
    transforms.push('translateY(calc(-100% + 5px))');
  }
  if (anchor.includes('bottom')) {
    style.bottom = '0';
    transforms.push('translateY(calc(100% - 5px))');
  }
  if (anchor.includes('center')) {
    style.top = '50%';
    transforms.push('translateY(-50%)');
  }
  if (anchor.includes('right')) {
    style.right = '0';
    transforms.push('translateX(calc(100% - 5px))');
  }
  if (anchor.includes('left')) {
    style.left = '0';
    transforms.push('translateX(calc(-100% + 5px))');
  }

  if (transforms.length > 0) {
    style.transform = transforms.join(' ');
  }

  return style;
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

// BadgeShape을 RadiusKey로 매핑
export const mapBadgeShapeToRadius = (shape: BadgeShape): RadiusKey => {
  switch (shape) {
    case 'circle':
      return 'circle';
    case 'pill':
      return 'full';
    case 'rounded':
      return 'lg';
    case 'square':
      return 'none';
    default:
      return 'lg';
  }
};
