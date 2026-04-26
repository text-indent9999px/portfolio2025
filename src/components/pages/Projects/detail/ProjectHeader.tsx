import React, { unstable_ViewTransition as ViewTransition } from 'react';
import { PageHeader } from '../../../ui/Heading';
import { Pill } from '../../../ui/Pill';
import type { ProjectDetail } from '../types';

interface ProjectHeaderProps {
  project: ProjectDetail;
  timestamp: number;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  timestamp,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <ViewTransition
            name={`project-title-${project.meta.id}-${timestamp}`}
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
        name={`project-tags-${project.meta.id}-${timestamp}`}
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
