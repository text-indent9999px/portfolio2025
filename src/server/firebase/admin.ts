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

function initializeFirebaseAdmin() {
  if (getApps().length > 0) {
    return;
  }

  const serviceAccountPath = resolveServiceAccountPath();
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      `Firebase 서비스 계정 키 파일을 찾을 수 없습니다: ${serviceAccountPath}`
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
