import React from 'react';
import { Badge } from '../../ui/Badge';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const BadgeStyleGuide: React.FC = () => {
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
                <Badge
                  key={`${color}-${variant}`}
                  variant={variant}
                  color={color}
                  size="md"
                  shape="rounded"
                >
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-1">
          <StyleGuideDetailHeading>Shape</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            <Badge
              variant="filled"
              color="primary"
              size="sm"
              shape="circle"
              count={120}
              showZero={true}
            />
            <Badge variant="filled" color="secondary" size="md" shape="pill">
              shape: pill
            </Badge>
            <Badge variant="outlined" color="primary" size="md" shape="rounded">
              shape: rounded
            </Badge>
            <Badge variant="filled" color="primary" size="md" shape="square">
              shape: square
            </Badge>
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Sizes</StyleGuideDetailHeading>
          <div className="flex flex-wrap items-center gap-4">
            {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
              <Badge
                key={size}
                variant="filled"
                color="primary"
                size={size}
                shape="square"
              >
                {size.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <StyleGuideDetailHeading>Examples</StyleGuideDetailHeading>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Badge
                  variant="filled"
                  color="gray"
                  size="xs"
                  shape="circle"
                  anchor="top-right"
                  position="absolute"
                  count={111}
                />
                <span className="text-text-primary underline">새로운 알림</span>
              </div>
              <div className="relative">
                <Badge
                  variant="tonal"
                  color="warning"
                  size="xs"
                  shape="circle"
                  anchor="top-right"
                  position="absolute"
                  count={57}
                />
                <span className="text-text-primary underline">
                  안 읽은 메시지
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    </StyleGuideSection>
  );
};

export default BadgeStyleGuide;
