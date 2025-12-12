import { Suspense } from 'react';
import { PageSpinner } from '../../../ui/Spinner';
import type { ProjectDetail } from '../types';
import type { ProjectTab } from '../types/project-tabs';
import { ProjectTabsContent } from './ProjectTabsContent';

// 타입 가드 함수
const isValidProjectTabType = (value: string): value is ProjectTab['type'] => {
  return [
    'demo',
    'overview',
    'features',
    'challenges',
    'code',
    'styleguide',
    'custom',
  ].includes(value);
};

interface ProjectTabsProps {
  project: ProjectDetail;
  timestamp: number;
  initialTab?: string;
  initialCodeSubTab?: string;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
  project,
  timestamp,
  initialTab,
  initialCodeSubTab,
}) => {
  // 서버에서 mainTabs 계산
  const mainTabs = project.tabs
    .filter(t => t.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(t => ({ id: t.type, label: t.label || t.type }));

  // 초기 탭 검증
  const firstTabId = mainTabs[0]?.id;
  const defaultTab = firstTabId || 'overview';
  const isValidInitialTab =
    initialTab &&
    mainTabs.some(tab => tab.id === initialTab) &&
    isValidProjectTabType(initialTab);
  const finalInitialTab = isValidInitialTab ? initialTab : defaultTab;

  return (
    <Suspense fallback={<PageSpinner />}>
      <ProjectTabsContent
        mainTabs={mainTabs}
        project={project}
        timestamp={timestamp}
        initialTab={finalInitialTab}
        initialCodeSubTab={initialCodeSubTab}
      />
    </Suspense>
  );
};

export default ProjectTabs;
