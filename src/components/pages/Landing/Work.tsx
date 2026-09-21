import { PROJECTS } from '@/data/portfolio';
import { Reveal } from '../../common/Reveal';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="02 — Work"
      title="개인 프로젝트"
      description="웹과 모바일에서 직접 기획하고 만든 프로젝트입니다. 배경부터 문제 해결 과정까지 케이스 스터디로 정리했습니다."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 100}>
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
