interface CenteredLayoutContentProps {
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
  children: React.ReactNode;
}

export function CenteredLayoutContent({
  className,
  maxWidth = 'lg',
  children,
}: CenteredLayoutContentProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl',
  }[maxWidth];

  const contentPadding = {
    sm: 'xl:pt-2',
    md: 'xl:pt-3',
    lg: 'xl:pt-4',
    xl: 'xl:pt-5',
    '2xl': 'xl:pt-6',
    '4xl': 'xl:pt-8',
    '7xl': 'xl:pt-10',
  }[maxWidth];

  return (
    <div className="w-full h-full">
      <div
        className={`
          ${maxWidthClass}
          ${className || ''}
          w-full h-full
          flex justify-center items-center
          mx-auto
        `}
      >
        <div
          className={`
            w-full h-full
            no-scrollbar xl:overflow-y-auto
            pt-[80px] pb-[5vh] px-6
            xl:py-[95px] xl:px-[10%]
          `}
          data-scroll-container="desktop"
        >
          <div
            className={`
              ${contentPadding}
              w-full h-full
            `}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
