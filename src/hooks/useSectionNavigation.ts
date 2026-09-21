'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

/** 홈에서는 해당 섹션으로 부드럽게 스크롤하고, 다른 페이지에서는 홈의 섹션으로 이동한다. */
export function useSectionNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (id: string) => {
      if (pathname === '/') {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', `#${id}`);
          return;
        }
      }
      router.push(`/#${id}`);
    },
    [pathname, router]
  );
}
