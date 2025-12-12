'use client';

import { useEffect, useState } from 'react';
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
  const [timestamp, setTimestamp] = useState<number>(() => {
    const state = getNavigationState() as { timestamp?: number } | undefined;
    return state?.timestamp ?? Date.now();
  });

  // 마운트 시 state에서 timestamp가 있으면 사용
  useEffect(() => {
    const state = getNavigationState() as { timestamp?: number } | undefined;
    if (state?.timestamp) {
      setTimestamp(state.timestamp);
    }
  }, [getNavigationState]);

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
