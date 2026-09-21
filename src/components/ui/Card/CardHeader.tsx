import React from 'react';

// Card의 `slots.header`를 감싸는 내부 레이아웃 컴포넌트 (외부에는 slots API만 노출한다)
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

export { CardHeader };
