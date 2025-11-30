// PrimaryTab 전용 타입 정의

import { BaseTabProps } from '../common.types';

export interface TabIndicatorState {
  width: number;
  left: number;
}

export interface UseTabIndicatorProps {
  activeTab: string;
  tabs: Array<{ id: string; label: string; notification?: number | string }>;
  enableTransition?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export interface TabProps extends BaseTabProps {
  orientation?: 'horizontal' | 'vertical';
  uniqueId: string; // 부모에서 주입하는 고유 id (필수)
}

