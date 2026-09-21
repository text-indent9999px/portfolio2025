import type { Project } from '../types';
import { beMyMoney } from './be-my-money';
import { saveOurWallet } from './save-our-wallet';

/**
 * 노출 순서 = 배열 순서.
 * design-system · view-transition · dark-mode-accessibility · delivery-todo 데이터 파일은
 * 남겨 두었지만 현재는 노출하지 않는다(다시 보이려면 여기에 추가).
 */
export const PROJECTS: Project[] = [beMyMoney, saveOurWallet];

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.status !== 'wip');
export const WIP_PROJECTS = PROJECTS.filter(p => p.status === 'wip');

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = PROJECTS.findIndex(p => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: PROJECTS[index - 1],
    next: PROJECTS[index + 1] ?? PROJECTS[0],
  };
}
