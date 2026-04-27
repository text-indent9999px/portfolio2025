import React from 'react';
import { ViewTransitionCompat as ViewTransition } from '@/components/common/ViewTransitionCompat';
import { PageHeader } from '../../../ui/Heading';
import { Pill } from '../../../ui/Pill';
import type { ProjectDetail } from '../types';

interface ProjectHeaderProps {
  project: ProjectDetail;
  timestamp?: string | number;
  transitionNameMode?: 'forward' | 'back';
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  timestamp,
  transitionNameMode = 'forward',
}) => {
  const titleName = timestamp
    ? `project-title-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;
  const tagsName = timestamp
    ? `project-tags-${transitionNameMode}-${project.meta.id}-${timestamp}`
    : undefined;
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <ViewTransition
            name={titleName}
            update="none"
          >
            <PageHeader
              title={project.meta.title}
              bottomSpacing="none"
              visualSize="3xl"
            />
          </ViewTransition>
        </div>
      </div>
      <ViewTransition
        name={tagsName}
        update="none"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {project.meta.tags.map(tag => (
            <Pill key={tag} variant="soft" color="brand" size="sm">
              {tag}
            </Pill>
          ))}
        </div>
      </ViewTransition>
    </div>
  );
};

export default ProjectHeader;
