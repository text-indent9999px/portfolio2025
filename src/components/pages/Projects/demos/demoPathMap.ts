/**
 * 데모 컴포넌트 파일명을 실제 컴포넌트 경로로 매핑하는 맵
 * 보안을 위해 허용된 컴포넌트만 동적 로드 가능하도록 제한
 */
export const demoPathMap: Record<string, string> = {
  Button: 'styleGuide/basics/Button',
  Badge: 'styleGuide/basics/Badge',
  Label: 'styleGuide/basics/Label',
  Tab: 'styleGuide/basics/Tab',
  Card: 'styleGuide/basics/Card',
  // 필요시 추가
};

/**
 * 파일명으로 실제 컴포넌트 경로를 조회
 * @param filename 파일명 (예: 'Button')
 * @returns 실제 컴포넌트 경로 또는 undefined
 */
export function getDemoPath(filename: string): string | undefined {
  return demoPathMap[filename];
}
