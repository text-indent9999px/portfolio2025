'use client';

import * as React from 'react';

interface ViewTransitionCompatProps {
  name?: string;
  share?: unknown;
  update?: string;
  children?: React.ReactNode;
}

export function ViewTransitionCompat({
  children,
  ...props
}: ViewTransitionCompatProps) {
  const ViewTransition =
    (React as typeof React & {
      unstable_ViewTransition?: React.ElementType;
      ViewTransition?: React.ElementType;
    }).unstable_ViewTransition ??
    (React as typeof React & { ViewTransition?: React.ElementType })
      .ViewTransition;

  if (!ViewTransition) {
    return <>{children}</>;
  }

  return React.createElement(
    ViewTransition as React.ComponentType<Record<string, unknown>>,
    props as Record<string, unknown>,
    children
  );
}
