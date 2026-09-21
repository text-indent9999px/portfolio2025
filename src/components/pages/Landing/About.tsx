import { ABOUT_INTRO, PRINCIPLES } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { Section } from './Section';

export function About() {
  const [lead, ...rest] = ABOUT_INTRO;

  return (
    <Section
      id="about"
      eyebrow="05 — About"
      title="일하는 방식"
      description="화면이 동작하는 것을 넘어, 사용자와 팀이 오래 편하게 쓸 수 있는 결과를 목표로 합니다."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal className="space-y-5">
          <p className="text-2xl font-semibold leading-snug tracking-tight text-text-primary md:text-3xl">
            {lead}
          </p>
          {rest.map(paragraph => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ol className="border-t border-surface-level-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal
              as="li"
              key={principle.title}
              delay={index * 100}
              className="flex gap-5 border-b border-surface-level-2 py-7 dark:border-surface-level-3"
            >
              <span
                aria-hidden
                className="font-mono-label pt-1 text-sm font-medium text-text-secondary"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-text-primary">
                  {principle.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-secondary">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
