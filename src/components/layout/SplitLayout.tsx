import { SplitLayoutClient } from './SplitLayoutClient';

interface SplitLayoutProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  showLeftSection?: boolean;
  leftClassName?: string;
  rightClassName?: string;
  useViewTransition?: boolean;
  viewTransitionName?: string;
}

export default function SplitLayout({
  leftContent,
  rightContent,
  showLeftSection = true,
  leftClassName,
  rightClassName,
  useViewTransition = true,
  viewTransitionName = 'page-content',
}: SplitLayoutProps) {
  return (
    <SplitLayoutClient
      leftContent={leftContent}
      rightContent={rightContent}
      showLeftSection={showLeftSection}
      leftClassName={leftClassName}
      rightClassName={rightClassName}
      useViewTransition={useViewTransition}
      viewTransitionName={viewTransitionName}
    />
  );
}
