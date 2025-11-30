// SecondaryTab 전용 타입 정의

import type { BaseTabProps } from '../common.types';

export interface ScrollState {
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

export interface IndicatorStyle {
  width: number;
  left: number;
  transformOrigin?: 'left' | 'right';
}

export interface TabProps extends BaseTabProps {
  uniqueId: string;
}
