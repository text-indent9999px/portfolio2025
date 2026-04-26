import type { ReactNode } from 'react';

export interface TooltipProps {
  isVisible: boolean;
  children: ReactNode;
  /** `role="tooltip"` 루트의 `id`. 생략 시 `useId()`로 안정적인 id가 붙습니다. 트리거에는 `aria-describedby={id}`를 표시 중일 때만 연결하는 것이 좋습니다. */
  id?: string;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  /** 바깥 영역 클릭 시 `onClose` 호출 여부 (컴포넌트 기본값: false) */
  closeOnOutsideClick?: boolean;
  arrow?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowPosition?: 'start' | 'center' | 'end';
  inverted?: boolean;
  offset?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
