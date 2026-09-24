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
      className={cn(
        'relative scroll-mt-20 md:scroll-mt-24 py-10 md:py-16',
        className
      )}
    >
      {/* 구분선은 프레임 폭(body)에 거의 맞춰 긋되, 테두리에 바로 붙지 않게 살짝만 띈다.
          문서 흐름에서 빼서(absolute) 위아래 여백 계산에 영향을 주지 않는다. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 px-6 md:px-10"
      >
        <div className="border-t-2 border-surface-level-4 dark:border-surface-level-5" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="md:grid md:grid-cols-[240px_1fr] md:gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* 라벨/제목 칸과 그 오른쪽 구분선을 한 묶음으로 둔다. 구분선을 이 칸 안의
              형제로 두면 높이가 라벨 칸 자체의 실제 내용 높이만큼만 생겨서(그리드 행
              전체 높이로 늘어나지 않아서), 옆의 훨씬 긴 본문 칸과 무관하게 라벨 칸
              높이에 맞춰 짧게 뜬다. */}
          <div className="md:flex md:gap-5 lg:gap-8">
            <Reveal className="md:flex-1">
              <p className="font-mono-label text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">
                {eyebrow}
              </p>
              <SectionHeader
                title={title}
                description={description}
                size={2}
                visualSize="3xl"
                className={{
                  root: 'mt-4',
                  title:
                    'text-text-primary text-[1.75rem] leading-[1.25] tracking-tight md:text-[1.75rem] md:leading-[1.3]',
                  description: 'text-pretty text-text-secondary',
                }}
              />
            </Reveal>
            <div
              aria-hidden
              className="hidden w-0.5 shrink-0 bg-surface-level-4 dark:bg-surface-level-5 md:block"
            />
          </div>
          <div className="mt-12 md:mt-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
