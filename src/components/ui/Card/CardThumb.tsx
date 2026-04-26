import React from 'react';
import { cn } from '@/utils/cn';

interface CardThumbProps {
  children?: React.ReactNode;
  className?: string;
  aspect?: string;
}

const CardThumb: React.FC<CardThumbProps> = ({
  children,
  className = '',
  aspect,
}) => {
  if (aspect) {
    return (
      <div data-area="thumb" className={className}>
        <div
          style={{ aspectRatio: aspect, position: 'relative', width: '100%' }}
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div data-area="thumb" className={cn('relative', className)}>
      {children}
    </div>
  );
};

CardThumb.displayName = 'CardThumb';

export default CardThumb;
