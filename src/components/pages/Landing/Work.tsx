import { PROJECTS } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { computeDividers, itemPlacement } from './gridDividers';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

const DIVIDERS = computeDividers(PROJECTS.length);

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="02 — Work"
      title="개인 프로젝트"
      description="웹과 모바일에서 직접 기획하고 만든 프로젝트입니다. 배경부터 문제 해결 과정까지 케이스 스터디로 정리했습니다."
    >
      {/* 카드에 테두리를 두르지 않고, 카드와 카드 사이에만 짧게 뜬 구분선을 그린다
          (1024 미만은 세로로 쌓이므로 구분선 없이 flex로 충분하다 — 그 아래 폭에서
          2열로 나누면 카드 내용이 너무 좁게 눌린다). */}
      <ul className="flex flex-col gap-8 lg:grid lg:gap-0 lg:[grid-template-columns:1fr_2rem_1fr]">
        {PROJECTS.map((project, index) => (
          <Reveal
            as="li"
            key={project.slug}
            delay={index * 100}
            className="lg:contents"
          >
            <ProjectCard
              project={project}
              priority={index === 0}
              style={itemPlacement(index)}
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
