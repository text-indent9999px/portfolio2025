import {
  Color,
  getColorClasses,
  Variant,
} from './UI.config';

export const getVariantStyles = (
  variant?: string,
  color?: string,
  interactive: boolean = true
): string => {
  const currentVariant = (variant || 'solid') as Variant;
  const currentColor = color || 'brand';

  return getColorClasses(currentColor as Color, currentVariant, interactive);
};

