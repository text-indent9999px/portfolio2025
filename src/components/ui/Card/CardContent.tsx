import React from 'react';

import { CardContentProps } from './Card.types';

// Spacing 스타일
const SPACING_STYLES = {
  none: '',
  tight: 'space-y-2',
  normal: 'space-y-4',
  loose: 'space-y-6',
} as const;

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  spacing = 'normal',
}) => {
  // className 병합
  const mergedClassName = React.useMemo(() => {
    return [SPACING_STYLES[spacing], className].filter(Boolean).join(' ');
  }, [spacing, className]);

  return <div className={mergedClassName}>{children}</div>;
};

export default CardContent;
