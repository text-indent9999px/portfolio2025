import React from 'react';

interface CardBodyProps {
  children?: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => (
  <div data-area="body" className={className}>
    {children}
  </div>
);

CardBody.displayName = 'CardBody';

export default CardBody;
