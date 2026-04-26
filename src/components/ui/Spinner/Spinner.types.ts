import type { HTMLAttributes } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';

/** 시각 모드: 기본(어두운 공) / inverted(밝은 배경 등) */
export type SpinnerTone = 'normal' | 'inverted';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  type?: SpinnerTone;
  className?: string;
  showText?: boolean;
  text?: string;
}
