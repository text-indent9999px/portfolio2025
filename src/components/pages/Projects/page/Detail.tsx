'use client';

import { useId } from 'react';
import { useRouter } from '../../../../utils/router';
import Blank from '../../../ui/Blank';
import DetailBackButton from '../detail/DetailBackButton';
import ProjectHeader from '../detail/ProjectHeader';
import ProjectTabs from '../detail/ProjectTabs';
import type { ProjectDetail } from '../types';

interface DetailProps {
  project: ProjectDetail;
  initialTab?: string;
  initialCodeSubTab?: string;
}

const Detail: React.FC<DetailProps> = ({
  project,
  initialTab,
  initialCodeSubTab,
}) => {
  const { getNavigationState } = useRouter();
  const fallbackTransitionKey = useId().replace(/:/g, '');
  const state = getNavigationState() as { timestamp?: string | number } | undefined;
  const timestamp = state?.timestamp ?? fallbackTransitionKey;

  return (
    <div className="max-w-4xl mx-auto">
      <DetailBackButton timestamp={timestamp} />
      <Blank height="1.5rem" bgColor="transparent" />
      <ProjectHeader project={project} timestamp={timestamp} />
      <ProjectTabs
        project={project}
        timestamp={timestamp}
        initialTab={initialTab}
        initialCodeSubTab={initialCodeSubTab}
      />
      <Blank height="3rem" bgColor="transparent" />
    </div>
  );
};

export default Detail;
