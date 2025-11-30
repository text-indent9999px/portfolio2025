import React from 'react';
import { Color, RadiusKey, Size, Variant } from '../shared/UI.config';

export type LabelVariant = Variant;

export interface LabelProps {
  children: React.ReactNode;
  variant?: LabelVariant;
  color?: Color;
  size?: Size;
  rounded?: Exclude<RadiusKey, 'circle'>;
  className?: string;
}
