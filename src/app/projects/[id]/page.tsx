import React from 'react';
import { CenteredLayout } from '../../../components/layout';
import { Detail } from '../../../components/pages/Projects';
import { getProjectsData } from '../../../server/projects/projects';
import NotFound from '../../not-found';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ tab?: string; codeSubTab?: string }>;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = async ({
  params,
  searchParams,
}) => {
  const { id } = await params;
  const { tab, codeSubTab } = await searchParams;
  const projectId = id;
  const projectsResult = await getProjectsData();

  if (!projectsResult.data) {
    return <NotFound backHref="/projects" />;
  }

  // 프로젝트 ID로 프로젝트 찾기
  const project = projectsResult.data.projects.find(p => p.meta.id === projectId);

  if (!project) {
    return <NotFound backHref="/projects" />;
  }

  return (
    <CenteredLayout maxWidth="4xl" useViewTransition={false}>
      <Detail
        project={project}
        initialTab={tab}
        initialCodeSubTab={codeSubTab}
      />
    </CenteredLayout>
  );
};

export default ProjectDetailPage;
