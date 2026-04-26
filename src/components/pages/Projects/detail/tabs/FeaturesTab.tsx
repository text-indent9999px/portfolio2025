import React from 'react';
import { useMediaQuery } from '../../../../../hooks';
import { Badge } from '../../../../ui/Badge';
import { SectionHeader } from '../../../../ui/Heading';
import type {
  FeaturesTab as FeaturesTabType,
  ProjectDetail,
} from '../../types';

interface FeaturesTabProps {
  project: ProjectDetail;
}

const FeaturesTab: React.FC<FeaturesTabProps> = ({ project }) => {
  const featuresTab = project.tabs.find(
    (t): t is FeaturesTabType => t.type === 'features'
  );
  const features = featuresTab?.payload?.features ?? [];
  const title = featuresTab?.label ?? '주요 구현 사항';
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  return (
    <div>
      <SectionHeader
        size={2}
        title={title}
        bottomSpacing={isXlOrAbove ? 'xs' : 'sm'}
        visualSize="lg"
      />
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Badge
              variant="soft"
              color="brand"
              size="sm"
              shape="circle"
              className="shrink-0"
            >
              {index + 1}
            </Badge>
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesTab;
