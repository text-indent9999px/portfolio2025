import { METRICS } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { Card } from '../../ui/Card';
import { Pill } from '../../ui/Pill';
import { Section } from './Section';

export function Impact() {
  return (
    <Section
      id="impact"
      eyebrow="01 — Scale"
      title="다양한 브랜드를 만들어 온 경험"
      description="웹에이전시에서 여러 브랜드의 사이트를 구축하고 운영해 왔습니다."
      className="pt-4 md:pt-8"
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {METRICS.map((metric, index) => (
          <Reveal as="li" key={metric.label} delay={index * 100}>
            <Card
              appearance="outline"
              surfaceLevel={1}
              elevation={0}
              padding="lg"
              className="h-full"
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
      </ul>
    </Section>
  );
}
