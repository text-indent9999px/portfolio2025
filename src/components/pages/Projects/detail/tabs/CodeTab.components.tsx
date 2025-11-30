'use client';

import React, { Suspense } from 'react';
import { CodeHighlight } from '../../../../ui/CodeHighlight';
import { Spinner } from '../../../../ui/Spinner';
import type { CodeHighlight as CodeHighlightType } from '../../types';

type LazyDemoComponent = React.LazyExoticComponent<
  React.ComponentType<Record<string, never>>
>;

// 데모 영역 컴포넌트
interface DemoSectionProps {
  demoPath: string | undefined;
  shouldLoadDemo: boolean;
  LazyDemoComponent: LazyDemoComponent | null;
}

export function DemoSection({
  demoPath,
  shouldLoadDemo,
  LazyDemoComponent,
}: DemoSectionProps) {
  if (!demoPath) return null;

  const LoadingFallback = () => (
    <div className="bg-surface-level-1 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
      <Spinner size="sm" showText={true} text="데모를 불러오는 중입니다" />
    </div>
  );

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
}

// 코드 영역 컴포넌트
interface CodeSectionProps {
  codeFile: string | string[] | undefined;
  language: string | undefined;
  enableObserver: boolean;
}

export function CodeSection({
  codeFile,
  language,
  enableObserver,
}: CodeSectionProps) {
  if (!codeFile) return null;

  // 배열인 경우 여러 파일 렌더링
  if (Array.isArray(codeFile)) {
    return (
      <div className="space-y-4">
        {codeFile.map((file, index) => (
          <div key={file}>
            {index > 0 && (
              <div className="mb-4 border-t border-surface-level-2 pt-4" />
            )}
            <CodeHighlight
              filename={file}
              language={language}
              enableObserver={enableObserver}
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
    />
  );
}

// 코드 하이라이트 콘텐츠 컴포넌트
interface CodeHighlightContentProps {
  highlight: CodeHighlightType;
  demoLoader: {
    shouldLoadDemo: boolean;
    LazyDemoComponent: LazyDemoComponent | null;
    enableCodeObserver: boolean;
  };
}

export function CodeHighlightContent({
  highlight,
  demoLoader,
}: CodeHighlightContentProps) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {highlight.title}
        </h3>
        {highlight.description && (
          <p className="text-text-secondary mb-4">{highlight.description}</p>
        )}
      </div>

      <DemoSection
        demoPath={highlight.demoPath}
        shouldLoadDemo={demoLoader.shouldLoadDemo}
        LazyDemoComponent={demoLoader.LazyDemoComponent}
      />

      <CodeSection
        codeFile={highlight.codeFile}
        language={highlight.language}
        enableObserver={demoLoader.enableCodeObserver}
      />
    </>
  );
}
