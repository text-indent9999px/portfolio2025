import type { ReactNode } from 'react';

export type InfoTextType = 'info' | 'success' | 'warning' | 'danger';

export interface InfoTextProps {
  type: InfoTextType;
  title?: string;
  children: ReactNode;
  className?: string;
  /**
   * 제목 줄에만 아이콘을 붙인다. `title`이 없으면(본문만 있으면) 표시되지 않는다.
   */
  showIcon?: boolean;
}
