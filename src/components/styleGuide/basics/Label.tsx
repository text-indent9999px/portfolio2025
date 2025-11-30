import React from 'react';
import { Label } from '../../ui/Label';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const LabelStyleGuide: React.FC = () => {
  const colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
    'gray',
  ] as const;
  const variants = ['filled', 'tonal', 'outlined', 'text'] as const;
  const radii = ['none', 'sm', 'lg', 'full'] as const;
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
                <Label
                  key={`${color}-${variant}`}
                  variant={variant}
                  color={color}
                  size="md"
                >
                  {variant}
                </Label>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-1">
          <StyleGuideDetailHeading>Radius</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            {radii.map(r => (
              <Label
                key={r}
                variant="filled"
                color="primary"
                size="md"
                rounded={r}
              >
                radius: {r}
              </Label>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Sizes</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map(s => (
              <Label key={s} variant="filled" color="primary" size={s}>
                {s.toUpperCase()}
              </Label>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Examples</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-2">
            <Label variant="outlined" color="primary" size="sm">
              #리액트
            </Label>
            <Label variant="outlined" color="primary" size="sm">
              #타입스크립트
            </Label>
            <Label variant="filled" color="gray" size="sm">
              + 3 more
            </Label>
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default LabelStyleGuide;
