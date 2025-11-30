import { LANGUAGE_MAP } from './constants';

/**
 * 파일 확장자로 언어 자동 감지
 */
export const detectLanguage = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  return LANGUAGE_MAP[extension] || 'text';
};

