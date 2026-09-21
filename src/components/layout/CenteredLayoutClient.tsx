'use client';

import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import * as React from 'react';

interface CenteredLayoutClientProps {
  useViewTransition?: boolean;
  children: React.ReactNode;
}

export function CenteredLayoutClient({
  useViewTransition = true,
  children,
}: CenteredLayoutClientProps) {
  return useViewTransition ? (
    <ViewTransition name="page-content">{children}</ViewTransition>
  ) : (
    <>{children}</>
  );
}
