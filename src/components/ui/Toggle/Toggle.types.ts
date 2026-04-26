import type { ReactNode } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
  /** 툴팁 등 보조 설명을 연결할 때 `role="tooltip"` 요소의 `id` */
  ariaDescribedBy?: string;
  ariaControls?: string;
  renderThumb?: (checked: boolean) => ReactNode;
  toggleType?: string;
  placeholder?: boolean;
  size?: ToggleSize;
  enableTransition?: boolean;
  isOnOffToggle?: boolean; // on/off를 의미하는 토글인지 여부 (기본값: false)
  onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
