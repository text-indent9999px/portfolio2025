import { Suspense } from 'react';
import type { ProjectDetail } from '../types';
import { ProjectTabsContent } from './ProjectTabsContent';

interface ProjectTabsProps {
  project: ProjectDetail;
  timestamp: number;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ project, timestamp }) => {
  // 서버에서 mainTabs 계산
  const mainTabs = project.tabs
    .filter(t => t.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(t => ({ id: t.type, label: t.label || t.type }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectTabsContent
        mainTabs={mainTabs}
        project={project}
        timestamp={timestamp}
      />
    </Suspense>
  );
};

export default ProjectTabs;
