'use client';

import { useEffect, useId, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import { useRouter } from '../../../../utils/router';
import { Card, CardStack } from '../../../ui/Card';
import { Pill } from '../../../ui/Pill';
import { ProjectTitle } from '../components';
import type { ProjectDetail } from '../types';

interface ProjectCardProps {
  project: ProjectDetail;
}

interface ProjectTransitionState {
  timestamp?: string | number;
  transitionToken?: string;
  transitionScope?: 'projects-list-detail';
  transitionTargetId?: string;
  transitionFrom?: 'list-forward' | 'detail-back';
  transitionRunId?: number;
}

const detailBackTransitionClaims = new Map<string, string>();

export function ProjectCard({ project }: ProjectCardProps) {
  const { navigateToUrl, getNavigationState } = useRouter();
  const pathname = usePathname();
  const instanceId = useId();
  const state = getNavigationState() as ProjectTransitionState | undefined;
  const [localTransitionTimestamp, setLocalTransitionTimestamp] = useState<
    string | number | undefined
  >(undefined);
  const [localTransitionToken, setLocalTransitionToken] = useState<
    string | undefined
  >(undefined);
  const isDetailBackTransition =
    state?.transitionScope === 'projects-list-detail' &&
    state?.transitionTargetId === project.meta.id &&
    state?.transitionFrom === 'detail-back';
  const detailBackClaimKey =
    isDetailBackTransition &&
    state?.timestamp &&
    state?.transitionRunId &&
    state?.transitionToken
      ? `${state.transitionRunId}-${state.transitionToken}-${project.meta.id}-${state.timestamp}`
      : undefined;

  let detailBackOwnerId: string | undefined;
  if (detailBackClaimKey) {
    detailBackOwnerId = detailBackTransitionClaims.get(detailBackClaimKey);
    if (!detailBackOwnerId) {
      detailBackTransitionClaims.set(detailBackClaimKey, instanceId);
      detailBackOwnerId = instanceId;
    }
  }

  const shouldUseSharedTransition =
    isDetailBackTransition &&
    !!detailBackClaimKey &&
    detailBackOwnerId === instanceId;
  const isListForwardTransition =
    state?.transitionScope === 'projects-list-detail' &&
    state?.transitionTargetId === project.meta.id &&
    state?.transitionFrom === 'list-forward' &&
    state?.transitionToken === localTransitionToken;
  const timestamp =
    isListForwardTransition && state?.timestamp === localTransitionTimestamp
      ? state?.timestamp
    : shouldUseSharedTransition
      ? state?.timestamp
      : undefined;
  const transitionNameMode: 'forward' | 'back' = isListForwardTransition
    ? 'forward'
    : 'back';
  const titleName = timestamp
    ? `project-title-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;
  const descriptionName = timestamp
    ? `project-description-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;
  const tagsName = timestamp
    ? `project-tags-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;

  useEffect(() => {
    if (pathname !== '/projects' || !isListForwardTransition) {
      setLocalTransitionTimestamp(undefined);
      setLocalTransitionToken(undefined);
    }
  }, [pathname, isListForwardTransition]);

  useEffect(() => {
    return () => {
      if (
        detailBackClaimKey &&
        detailBackTransitionClaims.get(detailBackClaimKey) === instanceId
      ) {
        detailBackTransitionClaims.delete(detailBackClaimKey);
      }
    };
  }, [detailBackClaimKey, instanceId]);

  const handleClick = () => {
    const nextTimestamp = Date.now();
    const nextTransitionToken = `${nextTimestamp}-${project.meta.id}`;
    setLocalTransitionTimestamp(nextTimestamp);
    setLocalTransitionToken(nextTransitionToken);
    navigateToUrl({
      url: `/projects/${project.meta.id}`,
      useDefaultTransition: true,
      state: {
        timestamp: nextTimestamp,
        transitionToken: nextTransitionToken,
        transitionScope: 'projects-list-detail',
        transitionTargetId: project.meta.id,
        transitionFrom: 'list-forward',
      },
    });
  };

  return (
    <Card
      key={project.meta.id}
      appearance="solid"
      elevation={1}
      padding="lg"
      onClick={handleClick}
      interactiveLabel={project.meta.title}
      cursorTrigger={true}
      slots={{
        body: (
          <CardStack spacing="normal">
            <ViewTransition
              name={titleName}
              update="none"
            >
              <ProjectTitle title={project.meta.title} size={2} visualSize="lg" />
            </ViewTransition>
            <ViewTransition
              name={descriptionName}
              update="none"
            >
              <p className="text-text-secondary mb-4 whitespace-pre-line">
                {project.meta.summary}
              </p>
            </ViewTransition>

            <ViewTransition
              name={tagsName}
              update="none"
            >
              <div className="flex flex-wrap gap-2">
                {project.meta.tags.slice(0, 4).map(tag => (
                  <Pill key={tag} variant="soft" color="brand" size="sm">
                    {tag}
                  </Pill>
                ))}
                {project.meta.tags.length > 4 && (
                  <Pill variant="solid" color="neutral" size="sm">
                    +{project.meta.tags.length - 4} more
                  </Pill>
                )}
              </div>
            </ViewTransition>
          </CardStack>
        ),
      }}
    />
  );
}
