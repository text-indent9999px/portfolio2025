import React from 'react';
import Blank from '../Blank';
import { Description } from '../Description';
import Heading from './Heading';
import type { PageHeaderProps, SpacingType } from './Heading.types';
import { PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING } from './Heading.types';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className,
  layout,
  size = 1,
  visualSize,
  fontFamily,
  bottomSpacing,
}) => {
  // Layout 계산
  const centered = React.useMemo(() => {
    return layout?.centered || false;
  }, [layout?.centered]);

  const actions = React.useMemo(() => {
    return layout?.actions;
  }, [layout?.actions]);

  // Heading bottom spacing 계산
  const headingBottomSpacing = React.useMemo<SpacingType>(() => {
    return fontFamily === 'eng-point' && subtitle
      ? visualSize
        ? visualSize
        : 'xl'
      : 'md';
  }, [fontFamily, subtitle, visualSize]);

  // Bottom spacing 높이 계산
  const bottomSpacingHeight = React.useMemo(() => {
    return bottomSpacing
      ? PAGE_HEADER_SECTION_HEADER_BOTTOM_SPACING[bottomSpacing]
      : undefined;
  }, [bottomSpacing]);

  // Root className 병합
  const rootClassName = React.useMemo(() => {
    return [centered ? 'text-center' : '', className?.root || '']
      .filter(Boolean)
      .join(' ');
  }, [centered, className?.root]);

  // Title className
  const titleClassName = React.useMemo(() => {
    return className?.title;
  }, [className?.title]);

  return (
    <div className={rootClassName}>
      <Heading
        size={size}
        visualSize={visualSize}
        fontFamily={fontFamily}
        bottomSpacing={subtitle ? headingBottomSpacing : 'none'}
        className={titleClassName}
      >
        {title}
      </Heading>
      {subtitle && (
        <Description
          size={size}
          color={className?.subtitle ? undefined : 'text-text-secondary'}
          className={className?.subtitle || ''}
          preserveWhitespace
        >
          {subtitle}
        </Description>
      )}
      {actions && <div className="flex gap-2 justify-center">{actions}</div>}
      {bottomSpacingHeight && (
        <Blank
          height={bottomSpacingHeight}
          bgColor="transparent"
          className="w-full"
        />
      )}
    </div>
  );
};

export default PageHeader;
