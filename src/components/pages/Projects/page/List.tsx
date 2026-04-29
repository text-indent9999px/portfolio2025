'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useScrollRestoration } from '../../../../hooks/useScrollRestoration';
import { useRouter } from '../../../../utils/router';
import Blank from '../../../ui/Blank';
import { Card, CardStack } from '../../../ui/Card';
import InfoText from '../../../ui/InfoText';
import { Skeleton } from '../../../ui/Skeleton';
import { ProjectList } from '../list';
import type { ProjectDetail } from '../types';

interface ListProps {
  projects: ProjectDetail[];
  errorMessage?: string | null;
}

const DETAIL_BACK_STATE_CLEAR_DELAY_MS = 700;

const List: React.FC<ListProps> = ({ projects, errorMessage }) => {
  // 스크롤 복원 훅 사용
  useScrollRestoration();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getNavigationState, navigateToUrl, isPending } = useRouter();
  const consumedBackStateRef = useRef<string | null>(null);
  const freezeRafRef = useRef<number | null>(null);
  const [isUiFreeze, setIsUiFreeze] = useState(false);
  const [frozenShouldShowSkeleton, setFrozenShouldShowSkeleton] = useState(false);
  const [hasRenderedContent, setHasRenderedContent] = useState(false);
  const navigationState = getNavigationState() as
    | {
        transitionScope?: string;
        transitionFrom?: 'list-forward' | 'detail-back';
      }
    | undefined;
  const isDetailBackTransition =
    navigationState?.transitionScope === 'projects-list-detail' &&
    navigationState?.transitionFrom === 'detail-back';
  const hasInitialProjects = projects.length > 0;
  const shouldShowSkeleton =
    isPending &&
    !errorMessage &&
    !hasRenderedContent &&
    !isDetailBackTransition &&
    !hasInitialProjects;

  useEffect(() => {
    setFrozenShouldShowSkeleton(prev =>
      isUiFreeze ? prev : shouldShowSkeleton
    );
  }, [shouldShowSkeleton, isUiFreeze]);

  useEffect(() => {
    if (!isPending) {
      setHasRenderedContent(true);
    }
  }, [isPending]);

  useEffect(() => {
    const state = getNavigationState() as
      | {
          transitionScope?: string;
          transitionFrom?: 'list-forward' | 'detail-back';
          transitionRunId?: number;
          timestamp?: string | number;
          transitionTargetId?: string;
        }
      | undefined;

    if (
      state?.transitionScope !== 'projects-list-detail' ||
      state?.transitionFrom !== 'detail-back'
    ) {
      return;
    }

    const runMarker = String(
      state.transitionRunId ??
        `${state.transitionTargetId ?? ''}:${state.timestamp ?? ''}`
    );
    if (consumedBackStateRef.current === runMarker) {
      return;
    }
    consumedBackStateRef.current = runMarker;

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // back shared transition이 끝나기 전에 state를 지우면
    // name 계산이 중간에 끊겨 요소가 사라졌다 다시 나타나 보일 수 있다.
    const cleanupTimeoutId = window.setTimeout(() => {
      navigateToUrl({
        url,
        useDefaultTransition: false,
        state: {},
        replace: true,
      });
    }, DETAIL_BACK_STATE_CLEAR_DELAY_MS);
    return () => window.clearTimeout(cleanupTimeoutId);
  }, [getNavigationState, navigateToUrl, pathname, searchParams]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const clearScopeTimeout = window.setTimeout(() => {
      if (document.documentElement.getAttribute('data-vt-scope') === 'projects-back') {
        document.documentElement.removeAttribute('data-vt-scope');
      }
    }, 1400);

    return () => {
      window.clearTimeout(clearScopeTimeout);
    };
  }, []);

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
      if (freezeRafRef.current !== null) {
        cancelAnimationFrame(freezeRafRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {frozenShouldShowSkeleton ? (
        <>
          <div className="flex items-center justify-between">
            <Skeleton width="120px" height="32px" radius="full" />
            <Skeleton width="90px" height="32px" radius="full" />
          </div>
          <Blank height="1.5rem" bgColor="transparent" />
          <Skeleton width="220px" height="34px" radius="0.75rem" />
          <Blank height="1.75rem" bgColor="transparent" />
          <div className="flex flex-col gap-3">
            <Skeleton width="100%" height="14px" radius="0.5rem" />
            <Skeleton width="82%" height="14px" radius="0.5rem" />
          </div>
          <Blank height="1.5rem" bgColor="transparent" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                appearance="solid"
                elevation={1}
                padding="lg"
                slots={{
                  body: (
                    <CardStack spacing="normal">
                      <Skeleton width="42%" height="30px" radius="0.6rem" />
                      <div className="flex flex-col gap-3">
                        <Skeleton width="100%" height="14px" radius="0.5rem" />
                        <Skeleton width="86%" height="14px" radius="0.5rem" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Skeleton width="72px" height="24px" radius="full" />
                        <Skeleton width="90px" height="24px" radius="full" />
                        <Skeleton width="64px" height="24px" radius="full" />
                      </div>
                    </CardStack>
                  ),
                }}
              />
            ))}
          </div>
        </>
      ) : errorMessage ? (
        <InfoText type="danger" title="데이터를 불러오지 못했습니다">
          {errorMessage}
        </InfoText>
      ) : (
        <ProjectList projects={projects} />
      )}
      <Blank height="5rem" bgColor="transparent" />
    </div>
  );
};

export default List;

