export type ElementType = 'overlay' | 'content';

export interface MenuAnimationCallbacks {
  onMenuClose?: (path?: string) => void;
  onMenuOpen?: () => void;
}

