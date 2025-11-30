import {
  ANIMATION_TIMEOUT,
  SELECTORS,
  TRANSITION_PROPERTIES,
} from './useMenuAnimation.constants';
import { ElementType } from './useMenuAnimation.types';

interface AnimationTracker {
  transitionedItems: Set<Element>;
  transitionsToTrack: Set<string>;
  handledProperties: Map<Element, Set<string>>;
  resolved: boolean;
  timeoutId: ReturnType<typeof setTimeout> | null;
}

export const waitForAnimationEnd = (
  element: Element,
  elementType: ElementType
): Promise<void> => {
  return new Promise(resolve => {
    const menuItems =
      elementType === 'content'
        ? Array.from(element.querySelectorAll(SELECTORS.MENU_ITEMS))
        : [];

    const overlayLayers =
      elementType === 'overlay'
        ? Array.from(element.querySelectorAll(SELECTORS.OVERLAY_LAYERS))
        : [];

    const tracker: AnimationTracker = {
      transitionedItems: new Set<Element>(),
      transitionsToTrack: new Set<string>(),
      handledProperties: new Map<Element, Set<string>>(),
      resolved: false,
      timeoutId: null,
    };

    const cleanup = () => {
      if (tracker.timeoutId) {
        clearTimeout(tracker.timeoutId);
        tracker.timeoutId = null;
      }
      menuItems.forEach(item => {
        item.removeEventListener('transitionend', handleTransitionEnd);
      });
      overlayLayers.forEach(layer => {
        layer.removeEventListener('transitionend', handleTransitionEnd);
      });
    };

    const checkContentCompletion = (): boolean => {
      if (menuItems.length === 0) return false;

      const allItemsTransitioned = menuItems.every(item =>
        tracker.transitionedItems.has(item)
      );
      const hasRequiredProperties = TRANSITION_PROPERTIES.CONTENT.every(prop =>
        tracker.transitionsToTrack.has(prop)
      );

      return allItemsTransitioned && hasRequiredProperties;
    };

    const checkOverlayCompletion = (): boolean => {
      if (overlayLayers.length === 0) return false;

      const allLayersTransitioned = overlayLayers.every(layer =>
        tracker.transitionedItems.has(layer)
      );
      const hasTransform = tracker.transitionsToTrack.has('transform');
      const hasBorderRadius =
        tracker.transitionsToTrack.has('border-radius') ||
        tracker.transitionsToTrack.has('border-bottom-left-radius');

      return allLayersTransitioned && hasTransform && hasBorderRadius;
    };

    const checkCompletion = () => {
      if (tracker.resolved) return;

      const isComplete =
        elementType === 'content'
          ? checkContentCompletion()
          : checkOverlayCompletion();

      if (isComplete) {
        tracker.resolved = true;
        cleanup();
        resolve();
      }
    };

    const handleTransitionEnd = (event: Event) => {
      if (tracker.resolved) return;
      if (!(event instanceof TransitionEvent)) return;

      const transitionEvent = event as TransitionEvent;
      const target = transitionEvent.target as Element;
      const isTargetMenuItem = menuItems.includes(target);
      const isTargetOverlayLayer = overlayLayers.includes(target);

      if (!isTargetMenuItem && !isTargetOverlayLayer) return;

      const propertyName = transitionEvent.propertyName;

      if (!tracker.handledProperties.has(target)) {
        tracker.handledProperties.set(target, new Set());
      }

      const targetProperties = tracker.handledProperties.get(target)!;

      if (targetProperties.has(propertyName)) return;
      targetProperties.add(propertyName);

      const trackedProperties = [
        ...TRANSITION_PROPERTIES.CONTENT,
        ...TRANSITION_PROPERTIES.OVERLAY,
      ];
      const isTrackedProperty = trackedProperties.includes(
        propertyName as (typeof trackedProperties)[number]
      );

      if (isTrackedProperty) {
        tracker.transitionsToTrack.add(propertyName);

        if (isTargetMenuItem || isTargetOverlayLayer) {
          tracker.transitionedItems.add(target);
        }

        checkCompletion();
      }
    };

    menuItems.forEach(item => {
      item.addEventListener('transitionend', handleTransitionEnd);
    });
    overlayLayers.forEach(layer => {
      layer.addEventListener('transitionend', handleTransitionEnd);
    });

    tracker.timeoutId = setTimeout(() => {
      if (!tracker.resolved) {
        tracker.resolved = true;
        cleanup();
        resolve();
      }
    }, ANIMATION_TIMEOUT);
  });
};

