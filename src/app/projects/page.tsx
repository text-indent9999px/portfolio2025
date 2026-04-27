import { ProjectsVisual } from '../../components/heroVisual/Projects';
import { SplitLayout } from '../../components/layout';
import { List } from '../../components/pages/Projects';
import { getProjectsData } from '../../server/projects/projects';

export default async function ProjectsPage() {
  const projectsResult = await getProjectsData();

  return (
    <SplitLayout
      leftContent={<ProjectsVisual />}
      rightContent={
        <List
          projects={projectsResult.data?.projects ?? []}
          errorMessage={projectsResult.errorMessage}
        />
      }
    />
  );
}
