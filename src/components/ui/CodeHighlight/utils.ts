import { LANGUAGE_MAP } from './constants';
import type { Highlighter } from 'shiki';

// 싱글톤 highlighter 인스턴스
let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;
let activeUsers = 0;

/**
 * 파일 확장자로 언어 자동 감지
 */
export const detectLanguage = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  return LANGUAGE_MAP[extension] || 'text';
};

/**
 * 싱글톤 highlighter 인스턴스 가져오기
 * 여러 컴포넌트가 동시에 요청해도 하나의 인스턴스만 생성됩니다.
 */
export const getHighlighter = async (): Promise<Highlighter> => {
  // 이미 인스턴스가 있으면 반환
  if (highlighterInstance) {
    return highlighterInstance;
  }

  // 이미 초기화 중이면 기존 Promise 반환
  if (highlighterPromise) {
    return highlighterPromise;
  }

  // 새로운 인스턴스 생성
  highlighterPromise = (async () => {
    const { createHighlighter } = await import('shiki');

    const highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'typescript',
        'tsx',
        'javascript',
        'jsx',
        'json',
        'css',
        'scss',
        'html',
        'markdown',
        'yaml',
        'plaintext',
      ],
    });

    highlighterInstance = highlighter;
    highlighterPromise = null;
    return highlighter;
  })();

  return highlighterPromise;
};

/**
 * highlighter 사용자 등록 (cleanup 추적용)
 */
export const registerHighlighterUser = (): (() => void) => {
  activeUsers++;
  let isUnregistered = false;

  return () => {
    // 중복 해제 방지
    if (isUnregistered) {
      return;
    }
    isUnregistered = true;

    // activeUsers가 음수가 되지 않도록 방어
    if (activeUsers > 0) {
      activeUsers--;
    } else {
      console.warn('[CodeHighlight] activeUsers가 이미 0입니다. 중복 해제 감지.');
      activeUsers = 0;
    }

    // 모든 사용자가 해제되면 인스턴스 정리
    if (activeUsers === 0 && highlighterInstance) {
      // Shiki highlighter는 명시적인 dispose 메서드가 없지만,
      // 참조를 null로 설정하여 가비지 컬렉션을 돕습니다.
      highlighterInstance = null;
      highlighterPromise = null;
    }
  };
};

