/**
 * 코드 파일명을 실제 파일 경로로 매핑하는 맵
 * 보안을 위해 허용된 파일만 접근 가능하도록 제한
 */
export const codePathMap: Record<string, string> = {
  'uiConfig.ts': 'src/components/ui/shared/UI.config.ts',
  'Button.tsx': 'src/components/ui/Button/Button.tsx',
  'Badge.tsx': 'src/components/ui/Badge/Badge.tsx',
  'Label.tsx': 'src/components/ui/Label/Label.tsx',
  'router.ts': 'src/utils/router.ts',
  'themeDetector.ts': 'src/utils/themeDetector.ts',
  'ThemeToggle.tsx': 'src/components/ui/ThemeToggle/ThemeToggle.tsx',
  'Card.tsx': 'src/components/ui/Card/Card.tsx',
};

/**
 * 파일명으로 실제 경로를 조회
 * @param filename 파일명 (예: 'Button.tsx')
 * @returns 실제 파일 경로 또는 undefined
 */
export function getCodePath(filename: string): string | undefined {
  return codePathMap[filename];
}
