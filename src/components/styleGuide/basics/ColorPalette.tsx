'use client';

import { useMediaQuery } from '../../../hooks';
import { ColorChip } from '../../ui/ColorChip';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const semanticToneMap = [
  { title: 'Brand', tone: 'brand' },
  { title: 'Sub-brand', tone: 'subBrand' },
  { title: 'Neutral', tone: 'neutral' },
  { title: 'Success', tone: 'success' },
  { title: 'Warning', tone: 'warning' },
  { title: 'Error', tone: 'error' },
  { title: 'Info', tone: 'info' },
] as const;

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
      <StyleGuideSection title="Semantic Tones" size={5} visualSize="md">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            컴포넌트에서는 `brand`, `subBrand`, `neutral`, `error` 같은
            semantic tone을 사용하고, 아래는 현재 raw palette와의 대응을
            함께 보여줍니다.
          </p>
          {semanticToneMap.map(section => (
            <div className="space-y-1" key={section.title}>
              <StyleGuideDetailHeading>
                {section.title} ({section.tone})
              </StyleGuideDetailHeading>
              <div className="flex items-center -space-x-3">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                  <ColorChip
                    key={`${section.tone}-${shade}`}
                    tone={section.tone}
                    shade={shade}
                    variant="circle"
                    size={isXlOrAbove ? 'md' : 'sm'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </StyleGuideSection>

      <StyleGuideSection title="Raw Palette" size={5} visualSize="md">
        <p className="mb-4 text-sm text-text-secondary">
          아래는 실제 CSS 변수 스케일입니다. semantic tone은 이 raw palette를
          기반으로 조합됩니다.
        </p>
      </StyleGuideSection>

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
