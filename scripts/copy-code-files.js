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
  'Label.tsx': 'src/components/ui/Label/Label.tsx',
  'router.ts': 'src/utils/router.ts',
  'themeDetector.ts': 'src/utils/themeDetector.ts',
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

