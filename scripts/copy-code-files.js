const fs = require('fs');
const path = require('path');

/**
 * 빌드 시점에 코드 파일들을 public 폴더로 복사
 * Vercel 배포 환경에서 소스 파일 접근 문제를 해결하기 위함
 */
const codePathMap = {
  'uiConfig.ts': 'src/components/ui/shared/UI.config.ts',
  'Button.tsx': 'src/components/ui/Button/Button.tsx',
  'Badge.tsx': 'src/components/ui/Badge/Badge.tsx',
  'Pill.tsx': 'src/components/ui/Pill/Pill.tsx',
  'InfoText.tsx': 'src/components/ui/InfoText/InfoText.tsx',
  'Image.tsx': 'src/components/ui/Image/Image.tsx',
  'Video.tsx': 'src/components/ui/Video/Video.tsx',
  'Tab.tsx': 'src/components/ui/Tab/Primary/Tab.tsx',
  'Toggle.tsx': 'src/components/ui/Toggle/Toggle.tsx',
  'Tooltip.tsx': 'src/components/ui/Tooltip/Tooltip.tsx',
  'router.ts': 'src/utils/router.ts',
  'router.utils.ts': 'src/utils/router.utils.ts',
  'NavigationContext.tsx': 'src/contexts/NavigationContext.tsx',
  'ViewTransitionCompat.tsx':
    'src/components/common/ViewTransitionCompat.tsx',
  'ProjectCard.tsx': 'src/components/pages/Projects/list/ProjectCard.tsx',
  'themeDetector.ts': 'src/utils/themeDetector.ts',
  'themeDetector.types.ts': 'src/utils/themeDetector.types.ts',
  'AppProviders.tsx': 'src/components/providers/AppProviders.tsx',
  'colors-theme.css': 'src/styles/colors-theme.css',
  'colors-modes.css': 'src/styles/colors-modes.css',
  'ThemeToggle.tsx': 'src/components/ui/ThemeToggle/ThemeToggle.tsx',
  'Card.tsx': 'src/components/ui/Card/Card.tsx',
};

const publicCodeDir = path.join(process.cwd(), 'public', 'code');

// public/code 디렉토리 생성
if (!fs.existsSync(publicCodeDir)) {
  fs.mkdirSync(publicCodeDir, { recursive: true });
}

// 각 파일 복사
Object.entries(codePathMap).forEach(([filename, sourcePath]) => {
  const sourceFullPath = path.join(process.cwd(), sourcePath);
  const destFullPath = path.join(publicCodeDir, filename);

  try {
    if (fs.existsSync(sourceFullPath)) {
      fs.copyFileSync(sourceFullPath, destFullPath);
      console.log(`✓ Copied ${filename}`);
    } else {
      console.warn(`⚠ File not found: ${sourceFullPath}`);
    }
  } catch (error) {
    console.error(`✗ Error copying ${filename}:`, error);
  }
});

console.log('Code files copied to public/code/');
