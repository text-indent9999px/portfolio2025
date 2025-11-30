import Blank from '../../../ui/Blank';
import { PageHeader } from '../../../ui/Heading';
import type { ProjectDetail } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectListHeader } from './ProjectListHeader';

interface ProjectListProps {
  projects: ProjectDetail[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <>
      <ProjectListHeader />
      <Blank height="1.5rem" bgColor="transparent" />
      <PageHeader
        title="Projects"
        fontFamily="eng-point"
        visualSize="3xl"
        bottomSpacing="md"
        subtitle={`실제 업무에서 다뤘던 기술과 도전들을 개인 프로젝트로 재작업했습니다.\n 프로젝트를 클릭하시면 상세 내용을 확인하실 수 있습니다.`}
      />
      <div className="space-y-6">
        <div className="grid gap-6">
          {projects.map(project => (
            <ProjectCard key={project.meta.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectList;
