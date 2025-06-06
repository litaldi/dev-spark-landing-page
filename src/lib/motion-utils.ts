
/**
 * Motion and animation utilities for accessibility and performance
 */

/**
 * Checks if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Applies reduced motion styles when needed
 */
export const applyReducedMotionStyles = (forceReduce: boolean = false): void => {
  const shouldReduce = forceReduce || prefersReducedMotion();
  
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
};

/**
 * Creates a motion-safe animation class
 */
export const motionSafeClass = (animationClass: string): string => {
  return prefersReducedMotion() ? '' : animationClass;
};

/**
 * Safe animation helper for React components
 */
export const useMotionSafe = () => {
  const isMotionSafe = !prefersReducedMotion();
  
  return {
    isMotionSafe,
    safeClass: (animationClass: string) => isMotionSafe ? animationClass : '',
    safeDuration: (duration: number) => isMotionSafe ? duration : 0
  };
};
