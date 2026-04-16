'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import InfoText from '../InfoText';
import { Spinner } from '../Spinner';
import { useCodeFetch, useLanguage, useThemeDetection } from './hooks';
import { getHighlighter, registerHighlighterUser } from './utils';

interface CodeHighlightProps {
  filename: string;
  language?: string;
  enableObserver?: boolean; // Observer 활성화 여부 (데모 로드 완료 후 true)
  onLoadComplete?: () => void; // 코드 로드 완료 콜백
}

const CodeHighlightComponent: React.FC<CodeHighlightProps> = ({
  filename,
  language,
  enableObserver = true,
  onLoadComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  // isInView가 false일 때는 빈 문자열 전달하여 요청하지 않음
  // 하지만 filename은 항상 전달하여 filename 변경 감지 가능하게 함
  // useMemo로 메모이제이션하여 불필요한 재계산 방지
  const shouldFetch = useMemo(() => isInView && !!filename, [isInView, filename]);
  const fetchFilename = useMemo(() => shouldFetch ? filename : '', [shouldFetch, filename]);
  const { code, loading, error } = useCodeFetch(fetchFilename);
  const isDark = useThemeDetection();
  const detectedLanguage = useLanguage(language, filename);
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const isMountedRef = useRef<boolean>(true);
  const onLoadCompleteRef = useRef(onLoadComplete);
  const hasRequestedRef = useRef<boolean>(false); // 이미 요청했는지 추적

  // onLoadComplete ref 업데이트 (dependency 변경 방지)
  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete;
  }, [onLoadComplete]);

  // 컴포넌트 마운트 상태 추적
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // 언마운트 시 highlightedHtml 메모리 해제
      setHighlightedHtml('');
    };
  }, []);

  // filename이나 enableObserver가 변경되면 상태 초기화
  useEffect(() => {
    if (isMountedRef.current) {
      hasRequestedRef.current = false; // filename 변경 시 요청 플래그 리셋
      // 상태 업데이트를 startTransition으로 배치 처리하여 재렌더링 최소화
      React.startTransition(() => {
        setIsInView(false);
        setHighlightedHtml('');
      });
    }
    // cleanup: 컴포넌트 언마운트 시에도 메모리 해제
    return () => {
      if (isMountedRef.current) {
        setHighlightedHtml('');
      }
    };
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
          if (
            entry.isIntersecting &&
            isMountedRef.current &&
            !hasRequestedRef.current
          ) {
            hasRequestedRef.current = true; // 요청 플래그 설정
            // startTransition으로 배치 처리하여 재렌더링 최소화
            React.startTransition(() => {
              setIsInView(true);
            });
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
    const unregister = registerHighlighterUser();

    const highlight = async () => {
      try {
        // 싱글톤 highlighter 인스턴스 가져오기
        const highlighter = await getHighlighter();

        if (cancelled || !isMountedRef.current) {
          return;
        }

        const theme = isDark ? 'github-dark' : 'github-light';
        const lang =
          detectedLanguage === 'text' ? 'plaintext' : detectedLanguage;

        const html = highlighter.codeToHtml(code, {
          lang,
          theme,
        });

        if (!cancelled && isMountedRef.current) {
          // startTransition으로 배치 처리하여 재렌더링 최소화
          React.startTransition(() => {
            setHighlightedHtml(html);
          });
          onLoadCompleteRef.current?.();
        }
      } catch (error) {
        console.error('Shiki error:', error);
        if (!cancelled && isMountedRef.current) {
          const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          const fallbackHtml = `<pre><code>${escaped}</code></pre>`;
          // startTransition으로 배치 처리하여 재렌더링 최소화
          React.startTransition(() => {
            setHighlightedHtml(fallbackHtml);
          });
          onLoadCompleteRef.current?.();
        }
      }
    };

    highlight();

    return () => {
      cancelled = true;
      unregister();
    };
  }, [code, detectedLanguage, isDark]);

  // 에러 발생 시 완료 콜백 호출
  useEffect(() => {
    if (error && isMountedRef.current) {
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

// React.memo로 메모이제이션하여 불필요한 재렌더링 방지
export const CodeHighlight = React.memo(CodeHighlightComponent, (prevProps, nextProps) => {
  // filename, language, enableObserver가 변경되지 않으면 재렌더링 방지
  // onLoadComplete는 함수 참조가 변경될 수 있으므로 비교에서 제외
  return (
    prevProps.filename === nextProps.filename &&
    prevProps.language === nextProps.language &&
    prevProps.enableObserver === nextProps.enableObserver
  );
});
