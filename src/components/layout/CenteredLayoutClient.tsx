'use client';

import * as React from 'react';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
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

  const content = <>{children}</>;

  return (
    <>
      {shouldUseViewTransition ? (
        <ViewTransition
          name="page-content"
          share={{
            default: 'fade',
            'nav-forward': 'slide-in',
            'nav-back': 'slide-out',
          }}
        >
          {content}
        </ViewTransition>
      ) : (
        content
      )}
      {isPending && <PageSpinner />}
    </>
  );
}
