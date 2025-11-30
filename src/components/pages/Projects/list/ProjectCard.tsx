'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
import { useRouter } from '../../../../utils/router';
import { Card, CardContent } from '../../../ui/Card';
import { Label } from '../../../ui/Label';
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
      variant="default"
      elevation={1}
      padding="lg"
      onClick={handleClick}
      cursorTrigger={true}
      clickable={true}
    >
      <Card.Body>
        <CardContent spacing="normal">
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
                <Label key={tag} variant="tonal" color="primary" size="sm">
                  {tag}
                </Label>
              ))}
              {project.meta.tags.length > 4 && (
                <Label variant="filled" color="gray" size="sm">
                  +{project.meta.tags.length - 4} more
                </Label>
              )}
            </div>
          </ViewTransition>
        </CardContent>
      </Card.Body>
    </Card>
  );
}
