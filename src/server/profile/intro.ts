import { unstable_cache } from 'next/cache';
import type { IntroSectionItem } from '../../components/pages/Profile/types';
import { getAdminDb } from '../firebase/admin';

const PROFILE_INTRO_PATH = {
  collection: 'portfolio',
  document: 'profileIntro',
} as const;

export interface ProfileIntroData {
  sections: IntroSectionItem[];
}

export interface ProfileIntroResult {
  data: ProfileIntroData | null;
  errorMessage: string | null;
}

async function fetchProfileIntroData(): Promise<ProfileIntroResult> {
  try {
    const db = getAdminDb();
    const docRef = db
      .collection(PROFILE_INTRO_PATH.collection)
      .doc(PROFILE_INTRO_PATH.document);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error('프로필 소개 데이터 문서가 존재하지 않습니다.');
    }

    const raw = snapshot.data() as Partial<ProfileIntroData> | undefined;
    if (!raw?.sections) {
      throw new Error('프로필 소개 데이터 형식이 올바르지 않습니다.');
    }

    return {
      data: {
        sections: raw.sections,
      },
      errorMessage: null,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '프로필 소개 데이터를 불러오지 못했습니다.';
    return {
      data: null,
      errorMessage: message,
    };
  }
}

export const getProfileIntroData = unstable_cache(
  fetchProfileIntroData,
  ['profile-intro-data'],
  {
    revalidate: 60 * 60,
    tags: ['profile-intro'],
  }
);

