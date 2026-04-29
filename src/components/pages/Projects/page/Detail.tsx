'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from '../../../../utils/router';
import Blank from '../../../ui/Blank';
import { Skeleton } from '../../../ui/Skeleton';
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

const renderedDetailContentCache = new Set<string>();
const SKELETON_SHOW_DELAY_MS = 160;
const SKELETON_MIN_VISIBLE_MS = 280;

const Detail: React.FC<DetailProps> = ({
  project,
  initialTab,
  initialCodeSubTab,
}) => {
  const { getNavigationState, isPending } = useRouter();
  const pathname = usePathname();
  const directEntryTransitionSeedRef = useRef<{
    timestamp: number;
    transitionToken: string;
  } | null>(null);

  if (!directEntryTransitionSeedRef.current) {
    const seededTimestamp = Date.now();
    directEntryTransitionSeedRef.current = {
      timestamp: seededTimestamp,
      transitionToken: `direct-entry-${project.meta.id}-${seededTimestamp}`,
    };
  }

  const [isBackNavigating, setIsBackNavigating] = useState(false);
  const [hasRenderedContent, setHasRenderedContent] = useState(() =>
    renderedDetailContentCache.has(project.meta.id)
  );
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [frozenShowSkeleton, setFrozenShowSkeleton] = useState(false);
  const [isUiFreeze, setIsUiFreeze] = useState(false);
  const skeletonShownAtRef = useRef<number | null>(null);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const freezeRafRef = useRef<number | null>(null);
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

  useEffect(() => {
    if (timestamp && transitionToken) return;
    if (!directEntryTransitionSeedRef.current) return;

    setLastSharedTimestamp(prev => prev ?? directEntryTransitionSeedRef.current?.timestamp);
    setLastSharedToken(prev => prev ?? directEntryTransitionSeedRef.current?.transitionToken);
  }, [timestamp, transitionToken]);

  useEffect(() => {
    if (!isPending) {
      setHasRenderedContent(true);
      renderedDetailContentCache.add(project.meta.id);
    }
  }, [isPending, project.meta.id]);

  useEffect(() => {
    const shouldShowSkeleton = isPending && !hasRenderedContent;

    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    if (shouldShowSkeleton) {
      showTimerRef.current = window.setTimeout(() => {
        skeletonShownAtRef.current = Date.now();
        setShowSkeleton(true);
      }, SKELETON_SHOW_DELAY_MS);
      return;
    }

    if (!showSkeleton) {
      setShowSkeleton(false);
      return;
    }

    const shownAt = skeletonShownAtRef.current ?? Date.now();
    const elapsedMs = Date.now() - shownAt;
    const remainingMs = Math.max(SKELETON_MIN_VISIBLE_MS - elapsedMs, 0);

    hideTimerRef.current = window.setTimeout(() => {
      skeletonShownAtRef.current = null;
      setShowSkeleton(false);
    }, remainingMs);
  }, [isPending, hasRenderedContent, showSkeleton]);

  useEffect(() => {
    setFrozenShowSkeleton(prev => (isUiFreeze ? prev : showSkeleton));
  }, [showSkeleton, isUiFreeze]);

  useEffect(() => {
    const handleUiFreeze = () => {
      setIsUiFreeze(true);
      if (freezeRafRef.current !== null) {
        cancelAnimationFrame(freezeRafRef.current);
      }
      freezeRafRef.current = requestAnimationFrame(() => {
        setIsUiFreeze(false);
        freezeRafRef.current = null;
      });
    };

    window.addEventListener('vt-freeze-ui', handleUiFreeze);
    return () => {
      window.removeEventListener('vt-freeze-ui', handleUiFreeze);
      if (showTimerRef.current !== null) {
        window.clearTimeout(showTimerRef.current);
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
      if (freezeRafRef.current !== null) {
        cancelAnimationFrame(freezeRafRef.current);
      }
    };
  }, []);

  const backTimestamp = isBackNavigating ? lastSharedTimestamp : undefined;
  const backTransitionToken = isBackNavigating ? lastSharedToken : undefined;
  const detailTimestamp = isBackNavigating ? backTimestamp : timestamp;
  const transitionNameMode = isBackNavigating ? 'back' : 'forward';
  return (
    <div className="max-w-4xl mx-auto">
      <DetailBackButton
        timestamp={backTimestamp ?? timestamp ?? lastSharedTimestamp}
        transitionToken={backTransitionToken ?? transitionToken ?? lastSharedToken}
        projectId={project.meta.id}
        onBeforeBack={() => setIsBackNavigating(true)}
      />
      <Blank height="1.5rem" bgColor="transparent" />
      <ProjectHeader
        project={project}
        timestamp={detailTimestamp}
        transitionNameMode={transitionNameMode}
      />
      {frozenShowSkeleton ? (
        <div>
          <Skeleton
            width="100%"
            height="60px"
            radius="3rem"
            className="max-xl:!h-[45px] max-xl:!rounded-[0.5rem] mb-10"
          />
          <Skeleton width="36%" height="30px" radius="0.7rem" />
          <Blank height="1.5rem" bgColor="transparent" />
          <div className="flex flex-col gap-4">
            <Skeleton width="100%" height="18px" radius="0.6rem" />
            <Skeleton width="96%" height="18px" radius="0.6rem" />
            <Skeleton width="92%" height="18px" radius="0.6rem" />
            <Skeleton width="98%" height="18px" radius="0.6rem" />
            <Skeleton width="88%" height="18px" radius="0.6rem" />
            <Skeleton width="95%" height="18px" radius="0.6rem" />
            <Skeleton width="90%" height="18px" radius="0.6rem" />
            <Skeleton width="97%" height="18px" radius="0.6rem" />
            <Skeleton width="86%" height="18px" radius="0.6rem" />
            <Skeleton width="93%" height="18px" radius="0.6rem" />
            <Skeleton width="89%" height="18px" radius="0.6rem" />
          </div>
        </div>
      ) : (
        <ProjectTabs
          project={project}
          timestamp={detailTimestamp}
          transitionNameMode={transitionNameMode}
          initialTab={initialTab}
          initialCodeSubTab={initialCodeSubTab}
        />
      )}
      <Blank height="3rem" bgColor="transparent" />
    </div>
  );
};

export default Detail;
