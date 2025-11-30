import React from 'react';

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
    <div data-area="thumb" className={`${className} relative`}>
      {children}
    </div>
  );
};

CardThumb.displayName = 'CardThumb';

export default CardThumb;
