export const SELECTORS = {
  OVERLAY: '[data-menu-overlay]',
  CONTENT: '[data-menu-content]',
  MENU_ITEMS: 'nav ul li',
  OVERLAY_LAYERS: '[data-menu-overlay-before], [data-menu-overlay-after]',
} as const;

export const TRANSITION_PROPERTIES = {
  CONTENT: ['transform', 'opacity'],
  OVERLAY: ['transform', 'border-radius', 'border-bottom-left-radius'],
} as const;

export const ANIMATION_TIMEOUT = 2000;

