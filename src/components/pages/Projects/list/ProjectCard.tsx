'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
import { useRouter } from '../../../../utils/router';
import { Card, CardStack } from '../../../ui/Card';
import { Pill } from '../../../ui/Pill';
import { ProjectTitle } from '../components';
import type { ProjectDetail } from '../types';

interface ProjectCardProps {
  project: ProjectDetail;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { navigateToUrl, getNavigationState } = useRouter();

  // timestamp를 직접 가져오기
  const state = getNavigationState() as { timestamp?: number } | undefined;
  const timestamp = state?.timestamp ?? Date.now();

  const handleClick = () => {
    navigateToUrl({
      url: `/projects/${project.meta.id}`,
      useDefaultTransition: false,
      state: {
        timestamp,
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
              name={`project-title-${project.meta.id}-${timestamp}`}
              update="none"
            >
              <ProjectTitle title={project.meta.title} size={2} visualSize="lg" />
            </ViewTransition>
            <ViewTransition
              name={`project-description-${project.meta.id}-${timestamp}`}
              update="none"
            >
              <p className="text-text-secondary mb-4 whitespace-pre-line">
                {project.meta.summary}
              </p>
            </ViewTransition>

            <ViewTransition
              name={`project-tags-${project.meta.id}-${timestamp}`}
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
