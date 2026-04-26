import React from 'react';
import { Color, Size, Variant } from '../shared/UI.config';

export type BadgeVariant = Variant;

export type BadgeShape = 'circle' | 'pill' | 'rounded' | 'square';

/** `position="absolute"`일 때 부모 기준 배지 모서리·중앙 정렬 */
export type BadgeAnchor =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center-left'
  | 'center-right';

export type BadgeOffset = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
};

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  color?: Color;
  size?: Size;
  shape?: BadgeShape;
  // 숫자 배지 옵션
  count?: number; // 지정 시 children 대신 count 표시
  maxCount?: number; // 표시 상한 (기본 99)
  showZero?: boolean; // 0일 때 표시 여부
  // 접근성
  ariaLabel?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  // 텍스트 처리 옵션(비원형일 때 유효)
  maxWidth?: string | number; // 예: '8rem' | 128
  // 배치 옵션
  position?: 'static' | 'relative' | 'absolute';
  anchor?: BadgeAnchor;
  offset?: BadgeOffset;
  // 아이콘 옵션
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}
