import type { ProjectStatus } from '@/data/portfolio';
import type { Color } from '../../ui/shared/UI.config';

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: '운영 중',
  shipped: '완료',
  wip: '개발 중',
};

export const STATUS_COLOR: Record<ProjectStatus, Color> = {
  live: 'success',
  shipped: 'info',
  wip: 'warning',
};
