import type React from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'secondary';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  type?: 'inverted' | 'normal';
  className?: string;
  showText?: boolean;
  text?: string;
}
