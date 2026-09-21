import { CAREERS, type Achievement, type WorkedSite } from '@/data/portfolio';
import { cn } from '@/utils/cn';
import { Reveal } from '../../common/Reveal';
import { Pill } from '../../ui/Pill';
import { Section } from './Section';

const DETAIL_ROWS = [
  { key: 'problem', label: '문제' },
  { key: 'action', label: '해결' },
  { key: 'result', label: '결과' },
] as const;

const CHIP_BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold';

function SiteChip({ site }: { site: WorkedSite }) {
  if (site.url) {
    return (
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          CHIP_BASE,
          'border-surface-level-4 text-text-primary transition-colors hover:border-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500'
        )}
      >
        {site.name}
        <span aria-hidden>↗</span>
        <span className="sr-only">(새 창)</span>
      </a>
    );
  }

  return (
    <span
      className={cn(
        CHIP_BASE,
        'border-dashed border-surface-level-3 font-medium text-text-secondary'
      )}
    >
      {site.name}
      {site.note && (
        <span className="text-xs font-normal">· {site.note}</span>
      )}
    </span>
  );
}

function AchievementItem({
  achievement,
  defaultOpen,
}: {
  achievement: Achievement;
  defaultOpen?: boolean;
}) {
  return (
    <li className="border-b border-surface-level-2 dark:border-surface-level-3">
      <details className="group" open={defaultOpen}>
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 [&::-webkit-details-marker]:hidden">
          <span className="text-base font-semibold leading-snug text-text-primary md:text-lg">
            {achievement.title}
          </span>
          <span
            aria-hidden
            className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-surface-level-4 text-lg leading-none text-text-secondary transition-transform duration-300 group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="pb-7 md:pr-12">
          <dl className="space-y-3.5 text-sm leading-relaxed md:text-base">
            {DETAIL_ROWS.map(row => (
              <div key={row.key} className="grid grid-cols-[2.75rem_1fr] gap-x-4">
                <dt className="font-mono-label pt-0.5 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  {row.label}
                </dt>
                <dd
                  className={
                    row.key === 'result'
                      ? 'border-l-2 border-accent-500 pl-3 font-medium text-text-primary'
                      : 'text-text-secondary'
                  }
                >
                  {achievement[row.key]}
                </dd>
              </div>
            ))}
          </dl>
          <ul aria-label="관련 기술" className="mt-5 flex flex-wrap gap-1.5">
            {achievement.tags.map(tag => (
              <li key={tag}>
                <Pill variant="outline" color="neutral" size="xs">
                  {tag}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="03 — Experience"
      title="실무에서 만든 변화"
      description="자체 서비스와 웹에이전시에서 문제를 찾아 해결한 경험입니다. 항목을 펼치면 문제, 해결, 결과가 나옵니다."
    >
      <ol className="space-y-16 md:space-y-24">
        {CAREERS.map(career => (
          <Reveal
            as="li"
            key={career.id}
            className="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono-label text-sm text-text-secondary">
                {career.period}
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
                {career.company}
              </h3>
              <p className="mt-1 font-medium text-text-primary">{career.role}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill variant="soft" color="neutral" size="sm">
                  {career.companyType}
                </Pill>
                <Pill variant="outline" color="neutral" size="sm">
                  {career.duration}
                </Pill>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-text-secondary">
                {career.summary}
              </p>
              <ul
                aria-label={`${career.company} 사용 기술`}
                className="font-mono-label mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-secondary"
              >
                {career.stack.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>

            {career.engagements ? (
              <ul className="space-y-12">
                {career.engagements.map(engagement => (
                  <li
                    key={engagement.id}
                    className="border-t border-surface-level-3 pt-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h4 className="text-xl font-bold leading-snug tracking-tight text-text-primary">
                        {engagement.title}
                      </h4>
                      {engagement.period && (
                        <p className="font-mono-label text-sm text-text-secondary">
                          {engagement.period}
                        </p>
                      )}
                    </div>

                    <ul
                      aria-label={`${engagement.title} 참여 사이트`}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {engagement.sites.map(site => (
                        <li key={site.name}>
                          <SiteChip site={site} />
                        </li>
                      ))}
                    </ul>

                    {engagement.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-text-secondary">
                        {engagement.highlights.map(highlight => (
                          <li key={highlight} className="flex gap-2.5">
                            <span
                              aria-hidden
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-500"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {engagement.achievements &&
                      engagement.achievements.length > 0 && (
                        <ul className="mt-6 border-t border-surface-level-2 dark:border-surface-level-3">
                          {engagement.achievements.map(achievement => (
                            <AchievementItem
                              key={achievement.id}
                              achievement={achievement}
                            />
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="border-t border-surface-level-3">
                {career.achievements?.map((achievement, index) => (
                  <AchievementItem
                    key={achievement.id}
                    achievement={achievement}
                    defaultOpen={index === 0}
                  />
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
