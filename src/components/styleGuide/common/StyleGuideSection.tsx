import type { HeadingLevel, SizeType } from '../../ui/Heading/Heading.types';
import { StyleGuideSectionClient } from './StyleGuideSectionClient';

interface StyleGuideSectionProps {
  title?: string;
  size?: HeadingLevel;
  visualSize?: SizeType;
  description?: string;
  children: React.ReactNode;
  wrapperSpacing?: 'none' | 'sm' | 'md' | 'lg';
  contentSpacing?: 'none' | 'tight' | 'normal' | 'loose';
  className?: string;
}

const StyleGuideSection: React.FC<StyleGuideSectionProps> = ({
  title,
  size = 4,
  visualSize = 'xl',
  description,
  children,
  wrapperSpacing = 'none',
  contentSpacing = 'normal',
  className = '',
}) => {
  return (
    <StyleGuideSectionClient
      title={title}
      size={size}
      visualSize={visualSize}
      description={description}
      wrapperSpacing={wrapperSpacing}
      contentSpacing={contentSpacing}
      className={className}
    >
      {children}
    </StyleGuideSectionClient>
  );
};

export default StyleGuideSection;
