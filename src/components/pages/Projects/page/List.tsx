'use client';

import { useScrollRestoration } from '../../../../hooks/useScrollRestoration';
import Blank from '../../../ui/Blank';
import { ProjectList } from '../list';
import { projectData } from '../../../../data/projects';

const List: React.FC = () => {
  // 스크롤 복원 훅 사용
  useScrollRestoration();

  return (
    <div className="min-h-screen">
      <ProjectList projects={projectData} />
      <Blank height="5rem" bgColor="transparent" />
    </div>
  );
};

export default List;

