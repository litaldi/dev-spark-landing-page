
/**
 * Motion and animation utilities for accessibility and performance
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/**
 * Apply reduced motion styles globally
 */
export function applyReducedMotionStyles(shouldReduce: boolean): void {
  try {
    if (shouldReduce) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  } catch (error) {
    console.error('Error applying reduced motion styles:', error);
  }
}

/**
 * Safe animation wrapper that respects motion preferences
 */
export function safeAnimate(
  element: HTMLElement,
  animation: Keyframe[] | PropertyIndexedKeyframes,
  options?: KeyframeAnimationOptions
): Animation | null {
  try {
    if (prefersReducedMotion()) {
      return null;
    }
    return element.animate(animation, options);
  } catch (error) {
    console.error('Error creating animation:', error);
    return null;
  }
}

/**
 * Create a fade in animation that respects motion preferences
 */
export function createFadeInAnimation(element: HTMLElement, duration = 300): Animation | null {
  return safeAnimate(
    element,
    [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { duration, easing: 'ease-out', fill: 'forwards' }
  );
}

/**
 * Create a scale animation that respects motion preferences
 */
export function createScaleAnimation(element: HTMLElement, scale = 1.05, duration = 200): Animation | null {
  return safeAnimate(
    element,
    [
      { transform: 'scale(1)' },
      { transform: `scale(${scale})` },
      { transform: 'scale(1)' }
    ],
    { duration, easing: 'ease-out' }
  );
}
