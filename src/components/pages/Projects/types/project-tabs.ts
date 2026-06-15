// Meta 정보: 프로젝트 전반 정보
export interface ProjectMeta {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  summary: string;
}

// 각 탭에서 사용하는 데이터 payload 타입
export type CodeHighlight = {
  title: string;
  description: string;
  codeSnippet?: string;
  codeFile?: string | string[]; // 단일 파일 또는 여러 파일 배열
  language: string;
  demoPath?: string; // 데모 컴포넌트 경로 (예: 'Button')
};

export interface StyleGuideData {
  title: string;
  description: string;
  components: string[];
  colors: string[];
  typography: string[];
}

// 공통 탭 속성
interface BaseTab {
  label?: string;
  order?: number;
  visible?: boolean;
}

// 비디오 데이터 타입
export interface VideoData {
  path: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
  thumbnail?: string;
}

// 이미지 데이터 타입
export interface ImageData {
  path: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

// 각 탭 타입별 정의
export interface DemoTab extends BaseTab {
  type: 'demo';
  payload: {
    videoPath?: string; // Deprecated, use videos
    videos?: VideoData[];
    images?: ImageData[];
    description?: string;
  };
}

export interface OverviewTab extends BaseTab {
  type: 'overview';
  payload?: { description?: string };
}

export interface FeaturesTab extends BaseTab {
  type: 'features';
  payload: { features: string[] };
}

export interface ChallengesTab extends BaseTab {
  type: 'challenges';
  payload: {
    items: Array<{ challenge: string; solution: string }>;
  };
}

export interface CodeTab extends BaseTab {
  type: 'code';
  payload: { codeHighlights: CodeHighlight[] };
}

export interface StyleGuideTab extends BaseTab {
  type: 'styleguide';
  payload: { styleGuide: StyleGuideData };
}

export interface StorybookCustomTab extends BaseTab {
  type: 'custom';
  label: '스토리북';
  payload: {
    videos: VideoData[];
    storybookUrl?: string;
    description?: string;
  };
}

export interface AccessibilityCustomTab extends BaseTab {
  type: 'custom';
  label: '접근성';
  payload: { description?: string };
}

export interface DeployCustomTab extends BaseTab {
  type: 'custom';
  label: '배포 사이트';
  payload: {
    deployUrl: string;
    description?: string;
    image?: {
      path: string;
      width?: number;
      height?: number;
      title?: string;
      description?: string;
    };
  };
}

export interface GenericCustomTab extends BaseTab {
  type: 'custom';
  label: string;
  // 렌더러에서 자유롭게 사용
  payload?: Record<string, unknown>;
}

// Discriminated Union으로 탭 정의
export type ProjectTab =
  | DemoTab
  | OverviewTab
  | FeaturesTab
  | ChallengesTab
  | CodeTab
  | StyleGuideTab
  | StorybookCustomTab
  | AccessibilityCustomTab
  | DeployCustomTab
  | GenericCustomTab;

export interface ProjectDetail {
  meta: ProjectMeta;
  tabs: ProjectTab[];
}

// 유틸: 탭 편의 조회
export const findTab = <T extends ProjectTab['type']>(
  project: ProjectDetail,
  type: T
) =>
  project.tabs.find(t => t.type === type) as
    | Extract<ProjectTab, { type: T }>
    | undefined;
