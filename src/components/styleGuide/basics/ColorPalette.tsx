'use client';

import { useMediaQuery } from '../../../hooks';
import { ColorChip } from '../../ui/ColorChip';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const ColorPaletteStyleGuide: React.FC = () => {
  const isXlOrAbove = useMediaQuery('--breakpoint-xl', 'min');

  const renderChipRow = (type: string) => (
    <div className="flex items-center -space-x-3">
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
        <ColorChip
          key={`${type}-${shade}`}
          colorType={type}
          shade={shade}
          variant="circle"
          size={isXlOrAbove ? 'md' : 'sm'}
        />
      ))}
    </div>
  );

  return (
    <>
      <StyleGuideSection title="Primary Colors" size={5} visualSize="md">
        {renderChipRow('primary')}
      </StyleGuideSection>
      <StyleGuideSection title="Secondary Colors" size={5} visualSize="md">
        {renderChipRow('secondary')}
      </StyleGuideSection>
      <StyleGuideSection title="Gray Colors" size={5} visualSize="md">
        {renderChipRow('gray')}
      </StyleGuideSection>
      <StyleGuideSection title="Status Colors" size={5} visualSize="md">
        <>
          {[
            { title: 'Success', type: 'success' },
            { title: 'Warning', type: 'warning' },
            { title: 'Error', type: 'danger' },
            { title: 'Info', type: 'info' },
          ].map(section => (
            <div className="space-y-1" key={section.type}>
              <StyleGuideDetailHeading>{section.title}</StyleGuideDetailHeading>
              {renderChipRow(section.type)}
            </div>
          ))}
        </>
      </StyleGuideSection>
    </>
  );
};

export default ColorPaletteStyleGuide;
