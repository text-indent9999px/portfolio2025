import { Card, CardContent } from '../../ui/Card';
import { SectionHeader } from '../../ui/Heading';
import type { HeadingLevel, SizeType } from '../../ui/Heading/Heading.types';

interface StyleGuideSectionContentProps {
  title?: string;
  size?: HeadingLevel;
  visualSize?: SizeType;
  description?: string;
  children: React.ReactNode;
  wrapperSpacing?: 'none' | 'sm' | 'md' | 'lg';
  contentSpacing?: 'none' | 'tight' | 'normal' | 'loose';
  className?: string;
  isXlOrAbove: boolean;
}

export function StyleGuideSectionContent({
  title,
  size = 4,
  visualSize = 'xl',
  description,
  children,
  wrapperSpacing = 'none',
  contentSpacing = 'normal',
  className = '',
  isXlOrAbove,
}: StyleGuideSectionContentProps) {
  const spacingClasses = {
    none: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  const wrapperClassName = wrapperSpacing
    ? `${spacingClasses[wrapperSpacing]} ${className}`.trim()
    : className;

  const cardContent = (
    <CardContent spacing={contentSpacing}>{children}</CardContent>
  );

  return (
    <div className={wrapperClassName}>
      {title && (
        <SectionHeader
          title={title}
          size={size}
          visualSize={visualSize}
          bottomSpacing={
            isXlOrAbove ? (visualSize ?? size <= 4 ? 'lg' : 'md') : 'xs'
          }
          description={description}
        />
      )}
      <Card
        variant="default"
        elevation={1}
        padding={isXlOrAbove ? 'lg' : 'md'}
      >
        {cardContent}
      </Card>
    </div>
  );
}
