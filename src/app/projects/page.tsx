import { ProjectsVisual } from '../../components/heroVisual/Projects';
import { SplitLayout } from '../../components/layout';
import { List } from '../../components/pages/Projects';

export default function ProjectsPage() {
  return (
    <SplitLayout leftContent={<ProjectsVisual />} rightContent={<List />} />
  );
}
