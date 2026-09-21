/** 사이트 전역 정보 */
export interface SiteInfo {
  role: string;
  title: string;
  description: string;
  url: string;
  email: string;
  github: string;
  /** false면 검색엔진 색인을 막는다. */
  indexable: boolean;
  /** false면 이력서 다운로드 버튼을 감추고 /api/resume도 404로 막는다. */
  resumeDownload: boolean;
  totalCareer: string;
}

export interface HeroFact {
  value: string;
  label: string;
}

/** 수치로 증명할 수 있는 성과 */
export interface Metric {
  value: string;
  unit?: string;
  label: string;
  context: string;
  source: string;
}

export interface Principle {
  title: string;
  description: string;
}

/** 경력 안의 단일 성과(문제 → 행동 → 결과) */
export interface Achievement {
  id: string;
  title: string;
  problem: string;
  action: string;
  result: string;
  tags: string[];
}

/** 참여한 사이트. url이 없으면 링크 없이 이름만 표시한다(이후 개편·종료된 경우). */
export interface WorkedSite {
  name: string;
  url?: string;
  /** 현재 상태 등 짧은 보충 설명 */
  note?: string;
}

/** 회사 안에서 맡은 하나의 프로젝트(고객사·브랜드 단위) */
export interface Engagement {
  id: string;
  title: string;
  period?: string;
  sites: WorkedSite[];
  highlights: string[];
  achievements?: Achievement[];
}

export interface Career {
  id: string;
  company: string;
  companyType: string;
  role: string;
  period: string;
  duration: string;
  summary: string;
  stack: string[];
  /** 프로젝트 단위로 정리한 경력(에이전시) */
  engagements?: Engagement[];
  /** 프로젝트 구분 없이 나열하는 성과(자체 서비스) */
  achievements?: Achievement[];
}

export interface SkillItem {
  name: string;
  icon: string;
  /** 다크모드에서 아이콘이 묻히지 않도록 밝은 배경 칩을 깐다. */
  hasBackground?: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  items: SkillItem[];
  points: string[];
}

/* ---------- 프로젝트(케이스 스터디) ---------- */

export type ProjectStatus = 'shipped' | 'live' | 'wip';

export interface ProjectMedia {
  path: string;
  title: string;
  description?: string;
  width: number;
  height: number;
  thumbnail?: string;
}

export interface CodeHighlight {
  title: string;
  description: string;
  file: string;
  language: string;
}

export interface Challenge {
  problem: string;
  solution: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** 카드·목록에 노출되는 한두 줄 요약 */
  summary: string;
  category: string;
  status: ProjectStatus;
  role: string;
  /** 예: '2026.06 – 진행 중' */
  period?: string;
  stack: string[];
  tags: string[];
  /** 프로젝트 규모를 보여 주는 핵심 수치(상세 페이지 상단) */
  stats?: { value: string; label: string }[];
  /** 카드 썸네일. 없으면 타이포 기반 비주얼로 대체한다. */
  cover?: {
    src: string;
    alt: string;
    fit?: 'cover' | 'contain';
    position?: string;
  };
  /** 커버 이미지가 없을 때 그려지는 일러스트 종류와 배경 색조 */
  art?: 'transition' | 'theme';
  accent?: 'gold' | 'indigo' | 'sand' | 'mist';
  background: string[];
  features: string[];
  challenges: Challenge[];
  videos?: ProjectMedia[];
  images?: ProjectMedia[];
  mediaNote?: string;
  code?: CodeHighlight[];
  links?: ProjectLink[];
  /** 접근성·품질 등 추가로 강조할 한 줄 근거 */
  proof?: string;
}
