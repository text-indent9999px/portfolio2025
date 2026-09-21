'use client';

import { useEffect, useState } from 'react';

/**
 * 화면 중앙 부근에 걸친 섹션의 id를 반환한다.
 * 섹션이 없는 페이지(상세 등)에서는 null을 유지한다.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const targets = key
      .split('|')
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    targets.forEach(target => observer.observe(target));

    const handleTop = () => {
      if (window.scrollY < 120) setActiveId(null);
    };
    window.addEventListener('scroll', handleTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTop);
    };
  }, [key]);

  return activeId;
}
