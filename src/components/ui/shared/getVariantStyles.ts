import {
  Color,
  getColorClasses,
} from './UI.config';

export const getVariantStyles = (
  variant?: string,
  color?: string
): string => {
  const currentVariant = variant || 'filled';
  const currentColor = color || 'primary';

  return getColorClasses(currentColor as Color, currentVariant, true);
};

