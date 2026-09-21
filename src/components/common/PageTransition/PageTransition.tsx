'use client';

import type { ReactNode } from 'react';
import { ViewTransitionCompat } from '../ViewTransitionCompat';

/** 라우트 전환 시 콘텐츠 영역만 교차 전환한다(스타일: styles/view-transition.css). */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransitionCompat name="page-content">{children}</ViewTransitionCompat>
  );
}
