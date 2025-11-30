import React from 'react';

// Compound 패턴을 위한 기본 CardHeader 섹션 컴포넌트
// CardBody, CardFooter, CardThumb와 동일한 형태
const CardHeader: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div data-area="header" className={className}>
    {children}
  </div>
);

CardHeader.displayName = 'CardHeader';

export default CardHeader;
