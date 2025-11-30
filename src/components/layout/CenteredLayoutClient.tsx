'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
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

  const content = <>{children}</>;

  return (
    <>
      {useViewTransition ? (
        <ViewTransition
          name="page-content"
          share={{
            default: 'fade',
            'nav-forward': 'slide-in',
            'nav-back': 'slide-out',
          }}
          update="none"
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
