'use client';

import React, { Suspense } from 'react';
import { CodeHighlight } from '../../../../ui/CodeHighlight';
import { Spinner } from '../../../../ui/Spinner';

type LazyDemoComponent = React.LazyExoticComponent<
  React.ComponentType<Record<string, never>>
>;

// 데모 영역 컴포넌트
interface DemoSectionProps {
  demoPath: string | undefined;
  shouldLoadDemo: boolean;
  LazyDemoComponent: LazyDemoComponent | null;
}

// LoadingFallback을 컴포넌트 외부로 이동하여 매번 재생성 방지
const LoadingFallback = React.memo(() => (
  <div className="relative bg-surface-level-1 rounded-lg p-6 flex items-center justify-center min-h-[500px]">
    <div className="flex justify-center items-start h-full absolute z-10 pt-25 top-0 left-0 w-full">
      <Spinner size="sm" />
    </div>
  </div>
));
LoadingFallback.displayName = 'LoadingFallback';

export const DemoSection = React.memo(function DemoSection({
  demoPath,
  shouldLoadDemo,
  LazyDemoComponent,
}: DemoSectionProps) {
  if (!demoPath) return null;

  return (
    <div className="mb-6 pb-6 border-b border-surface-level-2">
      {shouldLoadDemo && LazyDemoComponent ? (
        <Suspense fallback={<LoadingFallback />}>
          <LazyDemoComponent />
        </Suspense>
      ) : (
        <LoadingFallback />
      )}
    </div>
  );
});

// 코드 영역 컴포넌트
interface CodeSectionProps {
  codeFile: string | string[] | undefined;
  language: string | undefined;
  enableObserver: boolean;
  onLoadComplete?: () => void; // 모든 코드 로드 완료 콜백
  showSpinner?: boolean;
}

export const CodeSection = React.memo(function CodeSection({
  codeFile,
  language,
  enableObserver,
  onLoadComplete,
  showSpinner = true,
}: CodeSectionProps) {
  const loadedCountRef = React.useRef(0);
  const fileCountRef = React.useRef(0);

  // codeFile 변경 시 카운트 초기화
  React.useEffect(() => {
    if (codeFile) {
      fileCountRef.current = Array.isArray(codeFile) ? codeFile.length : 1;
      loadedCountRef.current = 0;
    }
  }, [codeFile]);

  // 개별 파일 로드 완료 핸들러
  const handleFileLoadComplete = React.useCallback(() => {
    loadedCountRef.current += 1;
    // 모든 파일이 로드 완료되면 부모에 알림
    if (loadedCountRef.current >= fileCountRef.current) {
      onLoadComplete?.();
    }
  }, [onLoadComplete]);

  if (!codeFile) return null;

  // 배열인 경우 여러 파일 렌더링
  if (Array.isArray(codeFile)) {
    return (
      <div className="space-y-4 relative">
        {codeFile.map((file, index) => (
          <div key={file}>
            {index > 0 && (
              <div className="mb-4 border-t border-surface-level-2 pt-4" />
            )}

            {showSpinner && (
              <div className="bg-surface-level-min flex justify-center items-start h-full absolute z-10 pt-25 top-0 left-0 w-full">
                <Spinner size="sm" />
              </div>
            )}

            <CodeHighlight
              filename={file}
              language={language}
              enableObserver={enableObserver}
              onLoadComplete={handleFileLoadComplete}
            />
          </div>
        ))}
      </div>
    );
  }

  // 단일 파일인 경우
  return (
    <CodeHighlight
      filename={codeFile}
      language={language}
      enableObserver={enableObserver}
      onLoadComplete={onLoadComplete}
    />
  );
});
