'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** 같은 묶음 안에서 순차 등장시킬 때의 지연(ms) */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * 뷰포트 아래에 있던 요소만 스크롤 진입 시 페이드-업으로 등장시킨다.
 * 처음부터 화면 안에 있거나 모션 감소를 선호하면 아무 효과 없이 그대로 보인다.
 * 속성은 DOM에 직접 쓰므로 SSR 결과(항상 보임)와 hydration이 어긋나지 않는다.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.reveal = 'hidden';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.reveal = 'shown';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      delete el.dataset.reveal;
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(className)}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
