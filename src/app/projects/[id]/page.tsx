import React from 'react';
import { CenteredLayout } from '../../../components/layout';
import { Detail } from '../../../components/pages/Projects';
import { projectData } from '../../../data/projects';
import NotFound from '../../not-found';

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = async ({
  params,
}) => {
  const { id } = await params;
  const projectId = id;

  // 프로젝트 ID로 프로젝트 찾기
  const project = projectData.find(p => p.meta.id === projectId);

  if (!project) {
    return <NotFound backHref="/projects" />;
  }

  return (
    <CenteredLayout maxWidth="4xl">
      <Detail project={project} />
    </CenteredLayout>
  );
};

export default ProjectDetailPage;
