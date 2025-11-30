'use client';

import { useMediaQuery } from '../../../hooks';
import { ColorChip } from '../../ui/ColorChip';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const SurfaceColorStyleGuide: React.FC = () => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  return (
    <StyleGuideSection>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Surface Color Palette</StyleGuideDetailHeading>
        <div className="flex items-center -space-x-3 flex-wrap gap-y-2">
          {[0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(
            shade => (
              <ColorChip
                key={shade}
                colorType="surface"
                shade={shade}
                variant="circle"
                size={isXlOrAbove ? 'md' : 'sm'}
              />
            )
          )}
        </div>
      </div>
      <div className="space-y-1">
        <StyleGuideDetailHeading>Usage Variants</StyleGuideDetailHeading>
        <div className="flex items-center space-x-1 flex-wrap gap-y-2">
          {[
            'level-min',
            'level-1',
            'level-2',
            'level-3',
            'level-4',
            'level-5',
            'level-6',
            'level-7',
            'level-max',
          ].map(shade => (
            <ColorChip
              key={shade}
              colorType="surface"
              shade={shade}
              variant="square"
              size={isXlOrAbove ? 'md' : 'sm'}
            />
          ))}
        </div>
      </div>
    </StyleGuideSection>
  );
};

export default SurfaceColorStyleGuide;
