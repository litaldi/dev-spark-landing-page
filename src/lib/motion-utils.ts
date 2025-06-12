
/**
 * Motion utilities for handling reduced motion preferences
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
 * Apply reduced motion styles
 * @param shouldReduce Whether to apply reduced motion
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
 * Get appropriate animation duration based on motion preference
 * @param normalDuration Normal animation duration in ms
 * @param reducedDuration Reduced animation duration in ms (default: 0)
 */
export function getAnimationDuration(normalDuration: number, reducedDuration: number = 0): number {
  return prefersReducedMotion() ? reducedDuration : normalDuration;
}

/**
 * Create CSS transition string respecting motion preferences
 * @param property CSS property to transition
 * @param duration Duration in ms
 * @param easing Easing function (default: ease)
 */
export function createTransition(property: string, duration: number, easing: string = 'ease'): string {
  const actualDuration = getAnimationDuration(duration);
  return `${property} ${actualDuration}ms ${easing}`;
}
