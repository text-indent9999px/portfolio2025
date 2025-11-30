import type React from 'react';
import type { Color, RadiusKey, Size, Variant } from '../shared/UI.config';

// 타입 정의
export type ButtonSize = Size;
export type ButtonVariant = Variant;
export type ButtonColor = Color;
export type ButtonRounded = RadiusKey;

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  noHoverActive?: boolean;
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
