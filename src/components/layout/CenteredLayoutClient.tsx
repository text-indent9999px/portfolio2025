'use client';

import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import * as React from 'react';
import { useRouter } from '../../utils/router';
import { PageSpinner } from '../ui/Spinner';

interface CenteredLayoutClientProps {
  useViewTransition?: boolean;
  children: React.ReactNode;
}

export function CenteredLayoutClient({
  useViewTransition = true,
  children,
}: CenteredLayoutClientProps) {
  const { isPending } = useRouter();
  const shouldUseViewTransition = useViewTransition;
  const [showSpinner, setShowSpinner] = React.useState(false);

  React.useEffect(() => {
    if (!isPending) {
      setShowSpinner(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSpinner(true);
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [isPending]);

  const content = <>{children}</>;

  return (
    <>
      {shouldUseViewTransition ? (
        <ViewTransition name="page-content">
          {content}
        </ViewTransition>
      ) : (
        content
      )}
      {showSpinner && <PageSpinner />}
    </>
  );
}
