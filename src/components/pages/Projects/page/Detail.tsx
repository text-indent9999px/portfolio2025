'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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

interface ProjectTransitionState {
  timestamp?: string | number;
  transitionToken?: string;
  transitionScope?: 'projects-list-detail';
  transitionTargetId?: string;
  transitionFrom?: 'list-forward' | 'detail-back';
}

const Detail: React.FC<DetailProps> = ({
  project,
  initialTab,
  initialCodeSubTab,
}) => {
  const { getNavigationState } = useRouter();
  const pathname = usePathname();
  const [isBackNavigating, setIsBackNavigating] = useState(false);
  const state = getNavigationState() as ProjectTransitionState | undefined;
  const isValidDetailTransitionState =
    state?.transitionScope === 'projects-list-detail' &&
    state?.transitionFrom === 'list-forward' &&
    !!state?.transitionToken &&
    pathname === `/projects/${state?.transitionTargetId}`;
  const timestamp = isValidDetailTransitionState ? state?.timestamp : undefined;
  const transitionToken = isValidDetailTransitionState
    ? state?.transitionToken
    : undefined;
  const [lastSharedTimestamp, setLastSharedTimestamp] = useState<
    string | number | undefined
  >(undefined);
  const [lastSharedToken, setLastSharedToken] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!timestamp || !transitionToken) return;
    setLastSharedTimestamp(timestamp);
    setLastSharedToken(transitionToken);
  }, [timestamp, transitionToken]);

  const backTimestamp = isBackNavigating ? lastSharedTimestamp : undefined;
  const backTransitionToken = isBackNavigating ? lastSharedToken : undefined;
  const detailTimestamp = isBackNavigating ? backTimestamp : timestamp;
  const transitionNameMode = isBackNavigating ? 'back' : 'forward';
  return (
    <div className="max-w-4xl mx-auto">
      <DetailBackButton
        timestamp={backTimestamp ?? timestamp}
        transitionToken={backTransitionToken ?? transitionToken}
        projectId={project.meta.id}
        onBeforeBack={() => setIsBackNavigating(true)}
      />
      <Blank height="1.5rem" bgColor="transparent" />
      <ProjectHeader
        project={project}
        timestamp={detailTimestamp}
        transitionNameMode={transitionNameMode}
      />
      <ProjectTabs
        project={project}
        timestamp={detailTimestamp}
        transitionNameMode={transitionNameMode}
        initialTab={initialTab}
        initialCodeSubTab={initialCodeSubTab}
      />
      <Blank height="3rem" bgColor="transparent" />
    </div>
  );
};

export default Detail;
