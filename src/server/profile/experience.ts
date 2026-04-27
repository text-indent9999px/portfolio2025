import { unstable_cache } from 'next/cache';
import type { ExperienceItem } from '../../components/pages/Profile/types';
import { getAdminDb } from '../firebase/admin';

const PROFILE_EXPERIENCE_PATH = {
  collection: 'portfolio',
  document: 'profileExperience',
} as const;

export interface ProfileExperienceData {
  experience: ExperienceItem[];
}

export interface ProfileExperienceResult {
  data: ProfileExperienceData | null;
  errorMessage: string | null;
}

async function fetchProfileExperienceData(): Promise<ProfileExperienceResult> {
  try {
    const db = getAdminDb();
    const docRef = db
      .collection(PROFILE_EXPERIENCE_PATH.collection)
      .doc(PROFILE_EXPERIENCE_PATH.document);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error('프로필 경력 데이터 문서가 존재하지 않습니다.');
    }

    const raw = snapshot.data() as Partial<ProfileExperienceData> | undefined;
    if (!raw?.experience) {
      throw new Error('프로필 경력 데이터 형식이 올바르지 않습니다.');
    }

    return {
      data: {
        experience: raw.experience,
      },
      errorMessage: null,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '프로필 경력 데이터를 불러오지 못했습니다.';
    return {
      data: null,
      errorMessage: message,
    };
  }
}

export const getProfileExperienceData = unstable_cache(
  fetchProfileExperienceData,
  ['profile-experience-data'],
  {
    revalidate: 60 * 60,
    tags: ['profile-experience'],
  }
);
