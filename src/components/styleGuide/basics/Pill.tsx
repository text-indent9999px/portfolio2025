import React from 'react';

import { Pill } from '../../ui/Pill';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const PillStyleGuide: React.FC = () => {
  const colors = [
    'brand',
    'subBrand',
    'success',
    'warning',
    'error',
    'info',
    'neutral',
  ] as const;
  const variants = ['solid', 'soft', 'outline', 'plain'] as const;
  const radii = ['none', 'sm', 'lg', 'pill'] as const;
  const sizes = ['xs', 'sm', 'md', 'lg'] as const;

  return (
    <StyleGuideSection>
      <>
        {colors.map(color => (
          <div className="space-y-1" key={color}>
            <StyleGuideDetailHeading capitalize>
              {color}
            </StyleGuideDetailHeading>
            <div className="flex flex-wrap gap-4 w-full mb-4">
              {variants.map(variant => (
                <Pill
                  key={`${color}-${variant}`}
                  variant={variant}
                  color={color}
                  size="md"
                >
                  {variant}
                </Pill>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-1">
          <StyleGuideDetailHeading>Radius</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            {radii.map(r => (
              <Pill key={r} variant="solid" color="brand" size="md" rounded={r}>
                radius: {r}
              </Pill>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Sizes</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map(s => (
              <Pill key={s} variant="solid" color="brand" size={s}>
                {s.toUpperCase()}
              </Pill>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Examples</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-2">
            <Pill variant="outline" color="brand" size="sm">
              #리액트
            </Pill>
            <Pill variant="outline" color="brand" size="sm">
              #타입스크립트
            </Pill>
            <Pill variant="solid" color="neutral" size="sm">
              + 3 more
            </Pill>
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default PillStyleGuide;
