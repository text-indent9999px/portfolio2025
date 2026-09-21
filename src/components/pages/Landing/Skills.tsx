import Image from 'next/image';
import { SKILL_GROUPS } from '@/data/portfolio';
import { cn } from '@/utils/cn';
import { Reveal } from '../../common/Reveal';
import { Card } from '../../ui/Card';
import { Section } from './Section';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 — Skills"
      title="사용하는 기술"
      description="기술을 나열하는 데서 그치지 않고, 각 기술로 무엇을 해결했는지 함께 적었습니다."
    >
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal
            as="li"
            key={group.id}
            delay={(index % 3) * 100}
            className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
          >
            <Card
              appearance="outline"
              surfaceLevel={1}
              elevation={0}
              padding="lg"
              className="h-full"
              slots={{
                body: (
                  <div className="flex h-full flex-col">
                    <h3 className="text-xl font-bold tracking-tight text-text-primary">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {group.summary}
                    </p>

                    <ul
                      aria-label={`${group.title} 기술`}
                      className="mt-5 flex flex-wrap gap-2"
                    >
                      {group.items.map(item => (
                        <li
                          key={item.name}
                          className="inline-flex items-center gap-2 rounded-full border border-surface-level-2 bg-surface-level-min py-1.5 pl-2 pr-3.5 text-sm font-medium text-text-primary dark:border-surface-level-3"
                        >
                          <span
                            className={cn(
                              'grid size-6 place-items-center',
                              item.hasBackground &&
                                'rounded-md bg-white p-0.5'
                            )}
                          >
                            <Image
                              src={item.icon}
                              alt=""
                              width={20}
                              height={20}
                              unoptimized
                              className="size-full object-contain"
                            />
                          </span>
                          {item.name}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 space-y-2.5 border-t border-surface-level-2 pt-5 text-sm leading-relaxed text-text-secondary dark:border-surface-level-3">
                      {group.points.map(point => (
                        <li key={point} className="flex gap-2.5">
                          <span
                            aria-hidden
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-500"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
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
