import React from 'react';

export interface TooltipProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  // 새로운 기능들
  showCloseButton?: boolean;
  onClose?: () => void;
  closeOnOutsideClick?: boolean; // 기본값: true (항상 외부 클릭으로 닫힘)
  arrow?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowPosition?: 'start' | 'center' | 'end';
  inverted?: boolean; // 색상 팔레트를 반전 (bg-surface-level-min 사용)
  offset?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
