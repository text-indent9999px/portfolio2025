import { ReactNode } from 'react';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
  ariaControls?: string;
  renderThumb?: (checked: boolean) => ReactNode;
  toggleType?: string;
  placeholder?: boolean;
  size?: 'sm' | 'md' | 'lg';
  enableTransition?: boolean;
  isOnOffToggle?: boolean; // on/off를 의미하는 토글인지 여부 (기본값: false)
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ToggleSize = 'sm' | 'md' | 'lg';
