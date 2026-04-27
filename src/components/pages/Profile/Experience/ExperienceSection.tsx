'use client';

import type { ExperienceItem } from '../types';
import { useMediaQuery } from '../../../../hooks';
import { Badge } from '../../../ui/Badge';
import InfoText from '../../../ui/InfoText';
import ExperienceCard from './ExperienceCard';

interface ExperienceSectionProps {
  experienceData: ExperienceItem[];
  errorMessage?: string | null;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experienceData,
  errorMessage,
}) => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  if (errorMessage) {
    return (
      <InfoText type="danger" title="데이터를 불러오지 못했습니다">
        {errorMessage}
      </InfoText>
    );
  }

  return (
    <div className="relative">
      {/* 타임라인 라인 */}
      <div className="absolute left-4.5 top-0 bottom-0 w-0.5 bg-surface-level-2 hidden xl:block"></div>

      <div className="space-y-8">
        {experienceData.map((item, index) => (
          <div
            key={item.id}
            className={`relative xl:border-b-0 border-b border-surface-level-4 pb-8 border-dashed last:border-b-0 last:pb-0`}
          >
            {/* 메인 경력/학력 항목 */}
            <div className="relative flex items-start xl:flex-row flex-col gap-4 xl:gap-0">
              {/* 타임라인 점 */}
              <div className="relative z-10 hidden xl:block">
                <Badge
                  variant="solid"
                  color="brand"
                  size={isXlOrAbove ? 'md' : 'sm'}
                >
                  {index + 1}
                </Badge>
              </div>

              {/* 콘텐츠 */}
              <ExperienceCard project={item} isXlOrAbove={isXlOrAbove} />
            </div>

            {/* 하위 프로젝트들 */}
            {item.projects && item.projects.length > 0 && (
              <div className="xl:ml-20 ml-0 mt-6 space-y-4">
                {item.projects.map((project, projectIndex) => (
                  <div key={project.id} className="relative flex items-start">
                    {/* 서브 타임라인 점 */}
                    <div className="relative z-10 hidden xl:block">
                      <Badge
                        variant="soft"
                        color="brand"
                        size={isXlOrAbove ? 'sm' : 'xs'}
                      >
                        {projectIndex + 1}
                      </Badge>
                    </div>

                    {/* 프로젝트 콘텐츠 */}
                    <ExperienceCard
                      project={project}
                      isSubProject={true}
                      isXlOrAbove={isXlOrAbove}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
