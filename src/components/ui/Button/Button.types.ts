import type React from 'react';
import type { Color, RadiusKey, Size, Variant } from '../shared/UI.config';

// 타입 정의
export type ButtonSize = Size;
export type ButtonVariant = Variant;
export type ButtonColor = Color;
/** 공통 RadiusKey + 원형 아이콘용 `circle`(RadiusKey에 없음, Button.config에서 pill+aspect-square) */
export type ButtonRounded = RadiusKey | 'circle';

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  interactive?: boolean;
  cursorTrigger?: boolean;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  dataCursor?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}
