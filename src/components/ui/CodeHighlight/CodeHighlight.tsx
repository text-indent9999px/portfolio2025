'use client';

import React, { useEffect, useRef, useState } from 'react';
import InfoText from '../InfoText';
import { Spinner } from '../Spinner';
import { useCodeFetch, useLanguage, useThemeDetection } from './hooks';

interface CodeHighlightProps {
  filename: string;
  language?: string;
  enableObserver?: boolean; // Observer 활성화 여부 (데모 로드 완료 후 true)
}

export const CodeHighlight: React.FC<CodeHighlightProps> = ({
  filename,
  language,
  enableObserver = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const { code, loading, error } = useCodeFetch(isInView ? filename : '');
  const isDark = useThemeDetection();
  const detectedLanguage = useLanguage(language, filename);
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');

  // filename이나 enableObserver가 변경되면 상태 초기화
  useEffect(() => {
    setIsInView(false);
    setHighlightedHtml('');
  }, [filename, enableObserver]);

  // Intersection Observer로 뷰포트 진입 감지
  // enableObserver가 true일 때만 observer 활성화
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !enableObserver
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // 한 번만 감지하면 observer 해제
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // 뷰포트에 들어오기 100px 전에 미리 로드 시작
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enableObserver, filename]);

  useEffect(() => {
    if (typeof window === 'undefined' || !code) {
      return;
    }

    let cancelled = false;

    const highlight = async () => {
      try {
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

        const theme = isDark ? 'github-dark' : 'github-light';
        const lang =
          detectedLanguage === 'text' ? 'plaintext' : detectedLanguage;

        const html = highlighter.codeToHtml(code, {
          lang,
          theme,
        });

        if (!cancelled) {
          setHighlightedHtml(html);
        }
      } catch (error) {
        console.error('Shiki error:', error);
        if (!cancelled) {
          const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          setHighlightedHtml(`<pre><code>${escaped}</code></pre>`);
        }
      }
    };

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, detectedLanguage, isDark]);

  if (error) {
    return (
      <div ref={containerRef} className="bg-surface-level-1 rounded-lg p-4">
        <InfoText
          type="danger"
          title={
            error instanceof Error
              ? error.message
              : '파일을 불러오는데 실패했습니다'
          }
        >
          파일 {filename}을 불러오는데 실패했습니다
        </InfoText>
      </div>
    );
  }

  if (!isInView || loading || !code) {
    return (
      <div
        ref={containerRef}
        className="bg-surface-level-1 rounded-lg p-6 flex items-center justify-center min-h-[200px]"
      >
        <Spinner size="sm" showText={true} text={'코드를 불러오는 중입니다'} />
      </div>
    );
  }

  if (!highlightedHtml) {
    return (
      <div
        ref={containerRef}
        className="bg-surface-level-1 rounded-lg overflow-x-auto"
      >
        <pre className="p-4 text-sm">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-surface-level-1 rounded-lg overflow-x-auto"
    >
      <div
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        className="[&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!bg-transparent [&_code]:!text-sm [&_code]:!leading-relaxed [&_code]:!block [&_code]:!w-full [&_code]:!overflow-x-auto"
        style={{
          margin: 0,
          padding: 0,
          fontSize: '0.875rem',
          lineHeight: '1.5',
          width: '100%',
          maxWidth: '100%',
        }}
      />
    </div>
  );
};
