import Image from 'next/image';
import { SKILL_GROUPS } from '@/data/portfolio';
import { cn } from '@/utils/cn';
import { Reveal } from '../../common/Reveal';
import { Card } from '../../ui/Card';
import { computeDividers, itemPlacement } from './gridDividers';
import { Section } from './Section';

const DIVIDERS = computeDividers(SKILL_GROUPS.length);

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 — Skills"
      title="사용하는 기술"
      description="기술을 나열하는 데서 그치지 않고, 각 기술로 무엇을 해결했는지 함께 적었습니다."
    >
      {/* 카드에 테두리를 두르지 않고, 카드와 카드 사이에만 짧게 뜬 구분선을 그린다.
          내용량이 가장 많은 카드를 기준으로 min-h를 고정해, 칸마다 높이가 들쭉날쭉하지
          않고 그리드 한 줄 전체가 같은 높이로 맞춰지게 한다. 태블릿 좁은 폭(1024 미만)
          에서는 2열 그리드로 나누면 한쪽 칸 내용이 지나치게 길어지므로, lg부터만 2열
          그리드로 전환하고 그 밑에서는 모바일처럼 1열로 쌓는다 — 이때는 카드에 테두리가
          없으므로 padding도 같이 빼서 padding만 덩그러니 남지 않게 한다. */}
      <ul className="flex flex-col gap-8 lg:grid lg:gap-0 lg:[grid-template-columns:1fr_2rem_1fr]">
        {SKILL_GROUPS.map((group, index) => (
          <Reveal
            as="li"
            key={group.id}
            delay={(index % 3) * 100}
            className="lg:contents"
          >
            <Card
              appearance="outline"
              surfaceLevel="min"
              elevation={0}
              className="h-full rounded-none border-0 p-0 lg:min-h-[420px] lg:p-8"
              style={itemPlacement(index)}
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
                              item.hasBackground && 'rounded-md bg-white p-0.5'
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
