import { CenteredLayoutClient } from './CenteredLayoutClient';
import { CenteredLayoutContent } from './CenteredLayoutContent';

interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
}

export default function CenteredLayout({
  children,
  className,
  maxWidth = 'lg',
}: CenteredLayoutProps) {
  return (
    <CenteredLayoutClient>
      <CenteredLayoutContent className={className} maxWidth={maxWidth}>
        {children}
      </CenteredLayoutContent>
    </CenteredLayoutClient>
  );
}
