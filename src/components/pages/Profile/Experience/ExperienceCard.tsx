'use client';

import React from 'react';
import { Card, CardContent } from '../../../ui/Card';
import { Description } from '../../../ui/Description';
import { Label } from '../../../ui/Label';
import { ProjectTitle } from '../../Projects/components';
import type { ExperienceItem, ProjectItem } from '../types';

interface ExperienceCardProps {
  project: ExperienceItem | ProjectItem;
  isSubProject?: boolean;
  isXlOrAbove: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  project,
  isSubProject = false,
  isXlOrAbove,
}) => {
  const getCompanyTypeLabel = (companyType?: ExperienceItem['companyType']) => {
    switch (companyType) {
      case 'self-service':
        return '자체 서비스';
      case 'web-agency':
        return '웹 에이전시';
      default:
        return '';
    }
  };

  return (
    <div
      className={`${isSubProject ? 'xl:ml-4' : 'xl:ml-6'} ml-0 flex-1 w-full`}
    >
      <Card
        variant={isSubProject ? 'default' : 'outlined'}
        elevation={isSubProject ? 1 : 2}
        padding="md"
        clickable={false}
        className={`${
          isSubProject
            ? 'bg-surface-level-1! dark:bg-surface-level-1!'
            : 'bg-surface-level-min! dark:bg-surface-level-2!'
        }`}
      >
        <Card.Header>
          <ProjectTitle
            title={project.title}
            subtitle={
              !isSubProject ? (
                <>
                  <div className="flex items-center gap-2">
                    {'companyType' in project && project.companyType && (
                      <Label
                        variant="filled"
                        color="primary"
                        size="sm"
                        className="px-2 py-0.5 text-xs flex-shrink-0"
                      >
                        {getCompanyTypeLabel(project.companyType)}
                      </Label>
                    )}
                    <span
                      className={`text-text-secondary font-medium text-sm ${
                        isSubProject ? '' : 'dark:text-white'
                      }`}
                    >
                      {project.period}
                    </span>
                  </div>
                </>
              ) : undefined
            }
            size={isSubProject ? 4 : 3}
            visualSize={isSubProject ? 'md' : 'lg'}
            titleColor={
              isSubProject
                ? 'text-text-primary'
                : 'text-text-primary dark:text-white'
            }
            spacing={'none'}
          />
        </Card.Header>

        <Card.Body>
          <CardContent
            spacing={isSubProject && !isXlOrAbove ? 'none' : 'normal'}
          >
            <div
              className={`flex flex-col ${
                isSubProject && !isXlOrAbove ? 'gap-y-3' : 'gap-y-4'
              }`}
            >
              {/* 설명 */}
              <Description
                size={isSubProject ? 5 : 4}
                className={`
                  whitespace-pre-line`}
              >
                {project.description}
              </Description>

              {/* 기술 스택 */}
              <div
                className={`flex-wrap ${isSubProject ? 'gap-2' : 'gap-3'} ${
                  isSubProject && !isXlOrAbove
                    ? 'flex order-0 xl:order-1'
                    : 'flex'
                }`}
              >
                {(isSubProject
                  ? (project as ProjectItem).tags
                  : (project as ExperienceItem).skills
                ).map((item, index) => (
                  <Label
                    key={index}
                    variant={isSubProject ? 'filled' : 'tonal'}
                    color={isSubProject ? 'gray' : 'primary'}
                    size={isSubProject ? 'xs' : 'sm'}
                  >
                    {`${isSubProject ? '#' : ''}${item}`}
                  </Label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ExperienceCard;
