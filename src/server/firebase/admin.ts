import fs from 'node:fs';
import path from 'node:path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const DEFAULT_SERVICE_ACCOUNT_PATH = path.join(
  process.cwd(),
  'secrets',
  'firebase-admin.json'
);

function resolveServiceAccountPath() {
  return process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : DEFAULT_SERVICE_ACCOUNT_PATH;
}

function parseServiceAccountFromEnv() {
  const raw =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ??
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!raw) {
    return null;
  }

  const tryParse = (value: string) => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  const parsed = tryParse(raw);
  if (parsed) {
    return parsed;
  }

  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    return tryParse(decoded);
  } catch {
    return null;
  }
}

function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccountFromEnv = parseServiceAccountFromEnv();
  if (serviceAccountFromEnv) {
    initializeApp({
      credential: cert(serviceAccountFromEnv),
    });
    return;
  }

  const serviceAccountPath = resolveServiceAccountPath();
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      `Firebase 서비스 계정 키를 찾을 수 없습니다. Vercel에서는 FIREBASE_SERVICE_ACCOUNT_KEY(권장) 또는 FIREBASE_SERVICE_ACCOUNT_JSON 환경변수를 설정하세요. 로컬 파일 경로 확인: ${serviceAccountPath}`
    );
  }

  const raw = fs.readFileSync(serviceAccountPath, 'utf8');
  const serviceAccount = JSON.parse(raw);

  initializeApp({
    credential: cert(serviceAccount),
  });
}

export function getAdminDb() {
  initializeFirebaseAdmin();
  return getFirestore();
}
