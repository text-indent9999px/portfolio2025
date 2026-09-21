import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Reveal } from '../../common/Reveal';
import { SectionHeader } from '../../ui/Heading';

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

/** 랜딩 페이지 섹션 공통 셸: 앵커 id, 번호 라벨, 제목/설명, 본문 영역. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={title}
      className={cn('scroll-mt-16 py-20 md:py-28', className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
            {eyebrow}
          </p>
          <SectionHeader
            title={title}
            description={description}
            size={2}
            visualSize="3xl"
            className={{
              root: 'mt-4 max-w-3xl',
              title:
                'text-text-primary text-[1.75rem] leading-[1.25] tracking-tight md:text-5xl md:leading-[1.15]',
              description: 'text-pretty text-text-secondary md:text-lg',
            }}
          />
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
