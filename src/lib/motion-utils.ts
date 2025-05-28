
/**
 * Motion utilities for handling reduced motion preferences
 */

/**
 * Applies reduced motion styles to the document
 * @param shouldReduce Whether to apply reduced motion styles
 */
export function applyReducedMotionStyles(shouldReduce: boolean): void {
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Creates a safe animation configuration based on motion preferences
 */
export function createSafeAnimation(animation: any) {
  const shouldReduce = prefersReducedMotion();
  
  if (shouldReduce) {
    return {
      ...animation,
      duration: 0.001,
      transition: { duration: 0.001 }
    };
  }
  
  return animation;
}
