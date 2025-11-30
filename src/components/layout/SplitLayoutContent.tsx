interface SplitLayoutContentProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftClassName?: string;
  rightClassName?: string;
  showLeftSection?: boolean;
}

export function SplitLayoutContent({
  leftContent,
  rightContent,
  leftClassName,
  rightClassName,
  showLeftSection = true,
}: SplitLayoutContentProps) {
  return (
    <>
      {showLeftSection && (
        <div
          className={`
            ${leftClassName || ''}
            hidden xl:flex
            flex-1
            justify-center items-center
            w-full h-full
            py-0 px-0
            border-dashed border-r-4 border-b-0
            border-surface-level-max
          `}
        >
          <div
            className={`
              relative
              w-[70%] h-auto
              pt-[70%]
              border-4 border-double
              border-surface-level-max
            `}
          >
            <div className="absolute top-0 left-0 w-full h-full">
              {leftContent}
            </div>
          </div>
        </div>
      )}

      <div
        className={`
          ${rightClassName || ''}
          flex flex-1 flex-col
          w-full h-full
          xl:h-full xl:overflow-y-auto
          no-scrollbar
        `}
        data-scroll-container="desktop"
      >
        <div
          className={`
            w-full h-full
            pt-[80px] pb-[5vh] px-6
            xl:w-[80%] xl:mt-[95px] xl:mb-12 xl:mx-[10%] xl:py-0 xl:px-0
          `}
        >
          {rightContent}
        </div>
      </div>
    </>
  );
}
