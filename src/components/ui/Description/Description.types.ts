export type DescriptionSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface DescriptionProps {
  children: React.ReactNode;
  size?: DescriptionSize;
  color?: string;
  className?: string;
  leading?: 'tight' | 'normal' | 'relaxed' | '7';
  weight?: 'normal' | 'medium' | 'semibold';
  preserveWhitespace?: boolean;
  breakKeep?: boolean;
}
