import React from 'react';
import type { HeadingProps } from '../../ui/Heading';
import { Heading } from '../../ui/Heading';

interface StyleGuideDetailHeadingProps
  extends Omit<HeadingProps, 'bottomSpacing' | 'size' | 'visualSize'> {
  children: React.ReactNode;
  bottomSpacing?: HeadingProps['bottomSpacing'];
  size?: HeadingProps['size'];
  visualSize?: HeadingProps['visualSize'];
  capitalize?: boolean;
}

const StyleGuideDetailHeading: React.FC<StyleGuideDetailHeadingProps> = ({
  children,
  bottomSpacing = 'xs',
  size = 5,
  visualSize = 'sm',
  capitalize = false,
  className = '',
  ...rest
}) => {
  const colorClass = 'text-text-tertiary';
  const finalClassName = className
    ? `${colorClass} ${className} ${capitalize ? 'capitalize' : ''}`.trim()
    : `${colorClass} ${capitalize ? 'capitalize' : ''}`.trim();

  return (
    <Heading
      bottomSpacing={bottomSpacing}
      size={size}
      visualSize={visualSize}
      className={finalClassName}
      {...rest}
    >
      {children}
    </Heading>
  );
};

export default StyleGuideDetailHeading;
