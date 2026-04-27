import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { initializeApp, cert, getApps, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { experienceData } from '../local-data/profile/experience';
import { introSections } from '../local-data/profile/intro';
import { skillCategories, skillTabItems } from '../local-data/profile/skills';
import { projectData } from '../local-data/projects';

const DEFAULT_KEY_PATH = path.join(process.cwd(), 'secrets', 'firebase-admin.json');
const COLLECTION_NAME = 'portfolio';
const SKILLS_DOCUMENT_ID = 'profileSkills';
const EXPERIENCE_DOCUMENT_ID = 'profileExperience';
const INTRO_DOCUMENT_ID = 'profileIntro';
const PROJECTS_DOCUMENT_ID = 'projectsData';

function resolveServiceAccountPath(): string {
  const fromEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  return fromEnv ? path.resolve(fromEnv) : DEFAULT_KEY_PATH;
}

function loadServiceAccount(keyPath: string): ServiceAccount {
  if (!fs.existsSync(keyPath)) {
    throw new Error(`서비스 계정 키 파일을 찾을 수 없습니다: ${keyPath}`);
  }

  const raw = fs.readFileSync(keyPath, 'utf8');
  return JSON.parse(raw) as ServiceAccount;
}

async function main() {
  const keyPath = resolveServiceAccountPath();
  const serviceAccount = loadServiceAccount(keyPath);

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const skillsDocRef = db.collection(COLLECTION_NAME).doc(SKILLS_DOCUMENT_ID);
  const experienceDocRef = db
    .collection(COLLECTION_NAME)
    .doc(EXPERIENCE_DOCUMENT_ID);
  const introDocRef = db.collection(COLLECTION_NAME).doc(INTRO_DOCUMENT_ID);
  const projectsDocRef = db.collection(COLLECTION_NAME).doc(PROJECTS_DOCUMENT_ID);

  await Promise.all([
    skillsDocRef.set({
      tabItems: skillTabItems,
      categories: skillCategories,
      updatedAt: FieldValue.serverTimestamp(),
    }),
    experienceDocRef.set({
      experience: experienceData,
      updatedAt: FieldValue.serverTimestamp(),
    }),
    introDocRef.set({
      sections: introSections,
      updatedAt: FieldValue.serverTimestamp(),
    }),
    projectsDocRef.set({
      projects: projectData,
      updatedAt: FieldValue.serverTimestamp(),
    }),
  ]);

  console.log(
    `[seed:portfolio] Firestore 업로드 완료: ${COLLECTION_NAME}/${SKILLS_DOCUMENT_ID}`
  );
  console.log(
    `[seed:portfolio] Firestore 업로드 완료: ${COLLECTION_NAME}/${EXPERIENCE_DOCUMENT_ID}`
  );
  console.log(
    `[seed:portfolio] Firestore 업로드 완료: ${COLLECTION_NAME}/${INTRO_DOCUMENT_ID}`
  );
  console.log(
    `[seed:portfolio] Firestore 업로드 완료: ${COLLECTION_NAME}/${PROJECTS_DOCUMENT_ID}`
  );
  console.log(`[seed:portfolio] 사용한 서비스 계정 키: ${keyPath}`);
}

main().catch(error => {
  console.error('[seed:portfolio] 업로드 실패', error);
  process.exit(1);
});
