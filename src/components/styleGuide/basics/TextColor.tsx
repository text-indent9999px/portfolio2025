'use client';

import { useMediaQuery } from '../../../hooks';
import { ColorChip } from '../../ui/ColorChip';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const TextColorStyleGuide: React.FC = () => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  return (
    <StyleGuideSection>
      <>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Basic Text Colors</StyleGuideDetailHeading>
          <div className="flex items-center space-x-1">
            {['primary', 'secondary', 'tertiary', 'inverse'].map(shade => (
              <ColorChip
                key={shade}
                colorType="text"
                shade={shade}
                variant="square"
                size={isXlOrAbove ? 'md' : 'sm'}
              />
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Status Text Colors</StyleGuideDetailHeading>
          <div className="flex items-center space-x-1">
            {[
              { title: 'Link', type: 'link' },
              { title: 'Success', type: 'success' },
              { title: 'Warning', type: 'warning' },
              { title: 'Danger', type: 'danger' },
              { title: 'Info', type: 'info' },
            ].map(section => (
              <ColorChip
                colorType="text"
                shade={section.type}
                variant="square"
                size={isXlOrAbove ? 'md' : 'sm'}
                key={section.type}
              />
            ))}
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default TextColorStyleGuide;
