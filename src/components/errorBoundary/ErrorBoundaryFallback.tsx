'use client';

import { useNavigationHistory } from '../../contexts/NavigationContext';
import { ErrorPage } from '../pages/Error';

interface ErrorBoundaryFallbackProps {
  error: Error;
}

/**
 * ErrorBoundary에서 사용하는 Fallback 컴포넌트
 * NavigationContext를 사용하기 위해 함수 컴포넌트로 분리했습니다.
 */
export function ErrorBoundaryFallback({ error }: ErrorBoundaryFallbackProps) {
  const { history, canGoBack } = useNavigationHistory();

  // 이전 페이지 URL 가져오기
  const getPreviousUrl = (): string => {
    if (canGoBack && history.length > 1) {
      return history[history.length - 2]?.url ?? '/';
    }
    return '/';
  };

  return <ErrorPage error={error} backHref={getPreviousUrl()} />;
}
