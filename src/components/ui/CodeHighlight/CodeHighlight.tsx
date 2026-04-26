'use client';

import React, { startTransition, useEffect, useRef, useState } from 'react';
import InfoText from '../InfoText';
import { Spinner } from '../Spinner';
import { useCodeFetch, useThemeDetection } from './hooks';
import {
  detectLanguage,
  getHighlighter,
  registerHighlighterUser,
} from './utils';

interface CodeHighlightProps {
  filename: string;
  language?: string;
  /** `false`이면 뷰포트 진입을 기다리지 않고 즉시 코드를 요청한다. (예: 데모 로드 전에는 관찰 off, 이후 on) */
  enableObserver?: boolean;
  onLoadComplete?: () => void;
}

function buildEscapedCodeFallbackHtml(code: string): string {
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `<pre><code>${escaped}</code></pre>`;
}

function scheduleHeavyWork(run: () => void): void {
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 1500 });
  } else {
    setTimeout(run, 0);
  }
}

const CodeHighlightComponent: React.FC<CodeHighlightProps> = ({
  filename,
  language,
  enableObserver = true,
  onLoadComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  /**
   * 한 번이라도 fetch 활성화 조건을 만족하면(즉시 로드 또는 뷰포트 진입),
   * 같은 filename 동안에는 observer 토글로 다시 비활성화하지 않는다.
   */
  const [hasActivatedFetch, setHasActivatedFetch] = useState<boolean>(false);
  /** Observer 사용 시에만 뷰포트를 기다린다. 끄면 filename만 있으면 바로 fetch. */
  const fetchFilename = filename && hasActivatedFetch ? filename : '';
  const { code, loading, error } = useCodeFetch(fetchFilename);
  const isDark = useThemeDetection();
  const detectedLanguage = language || detectLanguage(filename);
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const onLoadCompleteRef = useRef(onLoadComplete);

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete;
  }, [onLoadComplete]);

  useEffect(() => {
    setIsInView(false);
    setHasActivatedFetch(false);
    setHighlightedHtml('');
  }, [filename]);

  useEffect(() => {
    if (!filename) return;
    if (!enableObserver || isInView) {
      setHasActivatedFetch(true);
    }
  }, [filename, enableObserver, isInView]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !enableObserver
    ) {
      return;
    }

    let observerActive = true;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && observerActive) {
            startTransition(() => {
              setIsInView(true);
            });
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observerActive = false;
      observer.disconnect();
    };
  }, [enableObserver, filename]);

  useEffect(() => {
    if (typeof window === 'undefined' || !code) {
      return;
    }

    let cancelled = false;
    const unregister = registerHighlighterUser();

    const applyFallbackHtml = () => {
      if (cancelled) return;
      startTransition(() => {
        setHighlightedHtml(buildEscapedCodeFallbackHtml(code));
      });
      onLoadCompleteRef.current?.();
    };

    const highlight = async () => {
      try {
        const highlighter = await getHighlighter();
        if (cancelled) {
          return;
        }

        scheduleHeavyWork(() => {
          if (cancelled) {
            return;
          }

          try {
            const theme = isDark ? 'github-dark' : 'github-light';
            const lang =
              detectedLanguage === 'text' ? 'plaintext' : detectedLanguage;

            const html = highlighter.codeToHtml(code, {
              lang,
              theme,
            });

            if (!cancelled) {
              startTransition(() => {
                setHighlightedHtml(html);
              });
              onLoadCompleteRef.current?.();
            }
          } catch (error) {
            console.error('Shiki error:', error);
            applyFallbackHtml();
          }
        });
      } catch (error) {
        console.error('Shiki error:', error);
        applyFallbackHtml();
      }
    };

    highlight();

    return () => {
      cancelled = true;
      unregister();
    };
  }, [code, detectedLanguage, isDark]);

  // fetch 실패 시 부모 알림. 재시도로 error가 null → 에러로 다시 바뀌면 onLoadComplete가 중복될 수 있음.
  useEffect(() => {
    if (error) {
      onLoadCompleteRef.current?.();
    }
  }, [error]);

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

  const awaitingViewport = enableObserver && !isInView;
  if (awaitingViewport || loading || !code) {
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
        className="m-0 w-full max-w-full p-0 text-sm leading-relaxed [&_pre]:!m-0 [&_pre]:!p-4 [&_pre]:!bg-transparent [&_code]:!m-0 [&_code]:!block [&_code]:!w-full [&_code]:!overflow-x-auto [&_code]:!p-0 [&_code]:!text-sm [&_code]:!leading-relaxed"
      />
    </div>
  );
};

export const CodeHighlight = React.memo(CodeHighlightComponent, (prevProps, nextProps) => {
  return (
    prevProps.filename === nextProps.filename &&
    prevProps.language === nextProps.language &&
    prevProps.enableObserver === nextProps.enableObserver
  );
});
