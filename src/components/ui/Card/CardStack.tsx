import React from 'react';

import { cn } from '@/utils/cn';
import type { CardStackProps } from './Card.types';

const SPACING_STYLES = {
  none: '',
  tight: 'space-y-2',
  normal: 'space-y-4',
  loose: 'space-y-6',
} as const;

const CardStack: React.FC<CardStackProps> = ({
  children,
  className = '',
  spacing = 'normal',
}) => {
  const mergedClassName = React.useMemo(() => {
    return cn(SPACING_STYLES[spacing], className);
  }, [spacing, className]);

  return <div className={mergedClassName}>{children}</div>;
};

CardStack.displayName = 'CardStack';

export default CardStack;
