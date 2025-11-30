import React from 'react';

interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => (
  <div data-area="footer" className={className}>
    {children}
  </div>
);

CardFooter.displayName = 'CardFooter';

export default CardFooter;
