import type { Color } from '../shared/UI.config';

export type SemanticTone = Color;

export interface ColorChipProps {
  colorType?: string;
  tone?: SemanticTone;
  shade: string | number;
  variant?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
