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

// Discriminated Union으로 탭 정의
export type ProjectTab =
  | {
      type: 'demo';
      label?: string;
      order?: number;
      visible?: boolean;
      payload: {
        videoPath?: string; // Deprecated, use videos
        videos?: Array<{
          path: string;
          title?: string;
          description?: string;
        }>;
        description?: string;
      };
    }
  | {
      type: 'overview';
      label?: string;
      order?: number;
      visible?: boolean;
      payload?: { description?: string };
    }
  | {
      type: 'features';
      label?: string;
      order?: number;
      visible?: boolean;
      payload: { features: string[] };
    }
  | {
      type: 'challenges';
      label?: string;
      order?: number;
      visible?: boolean;
      payload: {
        items: Array<{ challenge: string; solution: string }>;
      };
    }
  | {
      type: 'code';
      label?: string;
      order?: number;
      visible?: boolean;
      payload: { codeHighlights: CodeHighlight[] };
    }
  | {
      type: 'styleguide';
      label?: string;
      order?: number;
      visible?: boolean;
      payload: { styleGuide: StyleGuideData };
    }
  | {
      type: 'custom';
      label: string;
      order?: number;
      visible?: boolean;
      // 렌더러에서 자유롭게 사용
      payload?: Record<string, unknown>;
    };

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
