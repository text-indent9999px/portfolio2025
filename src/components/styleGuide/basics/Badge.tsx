import React from 'react';
import { Badge } from '../../ui/Badge';
import { StyleGuideDetailHeading, StyleGuideSection } from '../common';

const BadgeStyleGuide: React.FC = () => {
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
              variant="solid"
              color="brand"
              size="sm"
              shape="circle"
              count={120}
              showZero={true}
            />
            <Badge variant="solid" color="subBrand" size="md" shape="pill">
              shape: pill
            </Badge>
            <Badge variant="outline" color="brand" size="md" shape="rounded">
              shape: rounded
            </Badge>
            <Badge variant="solid" color="brand" size="md" shape="square">
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
                variant="solid"
                color="brand"
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
                  variant="solid"
                  color="neutral"
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
                  variant="soft"
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
