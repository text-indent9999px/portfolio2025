import { unstable_cache } from 'next/cache';
import type { SkillCategory, SkillTabItem } from '../../components/pages/Profile/types';
import { getAdminDb } from '../firebase/admin';

const PROFILE_SKILLS_PATH = {
  collection: 'portfolio',
  document: 'profileSkills',
} as const;

export interface ProfileSkillsData {
  tabItems: SkillTabItem[];
  categories: Record<string, SkillCategory>;
}

export interface ProfileSkillsResult {
  data: ProfileSkillsData | null;
  errorMessage: string | null;
}

async function fetchProfileSkillsData(): Promise<ProfileSkillsResult> {
  try {
    const db = getAdminDb();
    const docRef = db
      .collection(PROFILE_SKILLS_PATH.collection)
      .doc(PROFILE_SKILLS_PATH.document);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error('프로필 스킬 데이터 문서가 존재하지 않습니다.');
    }

    const raw = snapshot.data() as Partial<ProfileSkillsData> | undefined;
    if (!raw?.tabItems || !raw?.categories) {
      throw new Error('프로필 스킬 데이터 형식이 올바르지 않습니다.');
    }

    return {
      data: {
        tabItems: raw.tabItems,
        categories: raw.categories,
      },
      errorMessage: null,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '프로필 스킬 데이터를 불러오지 못했습니다.';
    return {
      data: null,
      errorMessage: message,
    };
  }
}

export const getProfileSkillsData = unstable_cache(
  fetchProfileSkillsData,
  ['profile-skills-data'],
  {
    revalidate: 60 * 60,
    tags: ['profile-skills'],
  }
);
