'use client';

import { ErrorPage } from '../pages/Error';

interface ErrorBoundaryFallbackProps {
  error: Error;
}

/** ErrorBoundary에서 사용하는 Fallback. 어떤 화면에서 났든 홈으로 돌아가게 한다. */
export function ErrorBoundaryFallback({ error }: ErrorBoundaryFallbackProps) {
  return <ErrorPage error={error} backHref="/" />;
}
