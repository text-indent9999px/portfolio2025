import type React from 'react';
import type { Color, RadiusKey, Size, Variant } from '../shared/UI.config';

export type ButtonSize = Size;
export type ButtonVariant = Variant;
export type ButtonColor = Color;
/** 공통 RadiusKey + 원형 아이콘용 `circle`(RadiusKey에 없음, Button.config에서 pill+aspect-square) */
export type ButtonRounded = RadiusKey | 'circle';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * 지정하면 `<button>` 대신 링크로 렌더링한다.
   * 내부 경로는 Next `Link`, `http(s)://` 는 새 탭, 그 외(`mailto:` 등)는 일반 `<a>`.
   */
  href?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  interactive?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ariaLabel?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
}
