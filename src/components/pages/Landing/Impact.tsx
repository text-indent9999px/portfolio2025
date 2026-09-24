import { METRICS } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { Card } from '../../ui/Card';
import { Pill } from '../../ui/Pill';
import { computeDividers, itemPlacement } from './gridDividers';
import { Section } from './Section';

const DIVIDERS = computeDividers(METRICS.length);

export function Impact() {
  return (
    <Section
      id="impact"
      eyebrow="01 — Scale"
      title="다양한 브랜드를 만들어 온 경험"
      description="웹에이전시에서 여러 브랜드의 사이트를 구축하고 운영해 왔습니다."
    >
      {/* 카드에 테두리를 두르지 않고, 카드와 카드 사이에만 짧게 뜬 구분선을 그린다
          (1024 미만은 세로로 쌓이므로 구분선 없이 flex로 충분하다). */}
      <ul className="flex flex-col gap-8 lg:grid lg:gap-0 lg:[grid-template-columns:1fr_2rem_1fr]">
        {METRICS.map((metric, index) => (
          <Reveal
            as="li"
            key={metric.label}
            delay={index * 100}
            className="lg:contents"
          >
            <Card
              appearance="outline"
              surfaceLevel="min"
              elevation={0}
              className="h-full rounded-none border-0 p-0 lg:p-8"
              style={itemPlacement(index)}
              slots={{
                body: (
                  <div className="flex h-full flex-col">
                    <p className="flex items-baseline text-6xl font-bold tracking-tighter text-text-primary tabular-nums md:text-7xl">
                      {metric.value}
                      {metric.unit && (
                        <span className="ml-1 text-3xl font-semibold text-text-secondary md:text-4xl">
                          {metric.unit}
                        </span>
                      )}
                    </p>
                    <h3 className="mt-5 text-lg font-semibold leading-snug text-text-primary">
                      {metric.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {metric.context}
                    </p>
                    <div className="mt-auto pt-6">
                      <Pill variant="soft" color="neutral" size="sm">
                        {metric.source}
                      </Pill>
                    </div>
                  </div>
                ),
              }}
            />
          </Reveal>
        ))}
        {DIVIDERS.map(divider => (
          <div
            key={divider.key}
            aria-hidden
            style={{ gridColumn: divider.gridColumn, gridRow: divider.gridRow }}
            className={
              divider.orientation === 'vertical'
                ? 'hidden w-0.5 justify-self-center bg-surface-level-4 my-4 dark:bg-surface-level-5 lg:block'
                : 'hidden h-0.5 self-center bg-surface-level-4 mx-4 dark:bg-surface-level-5 lg:block'
            }
          />
        ))}
      </ul>
    </Section>
  );
}
