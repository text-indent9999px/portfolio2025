import React from 'react';
import { getDemoPath } from './demoPathMap';

/**
 * 데모 컴포넌트 동적 로딩 레지스트리
 * 파일명을 기반으로 실제 컴포넌트를 동적으로 로드합니다.
 */

type DemoComponentLoader = () => Promise<{
  default: React.ComponentType<Record<string, never>>;
}>;

/**
 * 컴포넌트 경로별 동적 import 매핑
 * Next.js는 동적 import에 정적 경로를 요구하므로 명시적으로 매핑
 */
const componentLoaderMap: Record<string, DemoComponentLoader> = {
  'styleGuide/basics/Button': () => import('../../../styleGuide/basics/Button'),
  'styleGuide/basics/Badge': () => import('../../../styleGuide/basics/Badge'),
  'styleGuide/basics/Label': () => import('../../../styleGuide/basics/Label'),
  'styleGuide/basics/Tab': () => import('../../../styleGuide/basics/Tab'),
  'styleGuide/basics/Card': () => import('../../../styleGuide/basics/Card'),
};

/**
 * 파일명으로부터 동적 import 함수를 가져옵니다.
 * @param filename 파일명 (예: 'Button')
 * @returns React.lazy에 사용할 수 있는 로더 함수, 없으면 null
 */
export function getDemoLoader(
  filename: string
):
  | (() => Promise<{ default: React.ComponentType<Record<string, never>> }>)
  | null {
  const componentPath = getDemoPath(filename);
  if (!componentPath) {
    return null;
  }

  return componentLoaderMap[componentPath] || null;
}

/**
 * 데모 컴포넌트 파일명이 유효한지 확인합니다.
 * @param filename 파일명
 * @returns 유효한 파일명인지 여부
 */
export function isValidDemoPath(filename: string): boolean {
  return getDemoPath(filename) !== undefined;
}
