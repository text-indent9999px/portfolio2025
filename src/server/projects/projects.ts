import { unstable_cache } from 'next/cache';
import type { ProjectDetail } from '../../components/pages/Projects/types';
import { getAdminDb } from '../firebase/admin';

const PROJECTS_PATH = {
  collection: 'portfolio',
  document: 'projectsData',
} as const;

export interface ProjectsData {
  projects: ProjectDetail[];
}

export interface ProjectsResult {
  data: ProjectsData | null;
  errorMessage: string | null;
}

async function fetchProjectsData(): Promise<ProjectsResult> {
  try {
    const db = getAdminDb();
    const docRef = db
      .collection(PROJECTS_PATH.collection)
      .doc(PROJECTS_PATH.document);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error('프로젝트 데이터 문서가 존재하지 않습니다.');
    }

    const raw = snapshot.data() as Partial<ProjectsData> | undefined;
    if (!raw?.projects) {
      throw new Error('프로젝트 데이터 형식이 올바르지 않습니다.');
    }

    return {
      data: {
        projects: raw.projects,
      },
      errorMessage: null,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '프로젝트 데이터를 불러오지 못했습니다.';
    return {
      data: null,
      errorMessage: message,
    };
  }
}

export const getProjectsData = unstable_cache(
  fetchProjectsData,
  ['projects-data'],
  {
    revalidate: 60 * 60,
    tags: ['projects-data'],
  }
);

