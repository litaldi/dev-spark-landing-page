
import React from 'react';

/**
 * Motion utilities for accessibility and user preferences
 */

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Apply reduced motion styles to the document
 * @param shouldReduce Whether to apply reduced motion styles
 */
export const applyReducedMotionStyles = (shouldReduce: boolean): void => {
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
};

/**
 * Create a safe animation function that respects user preferences
 * @param animationFn Function that performs the animation
 * @param fallbackFn Optional fallback function if motion is reduced
 */
export const createSafeAnimation = (
  animationFn: () => void,
  fallbackFn?: () => void
): (() => void) => {
  return () => {
    if (prefersReducedMotion() && fallbackFn) {
      fallbackFn();
    } else {
      animationFn();
    }
  };
};

/**
 * Get appropriate transition duration based on user preferences
 * @param normalDuration Normal transition duration
 * @param reducedDuration Reduced transition duration
 */
export const getTransitionDuration = (
  normalDuration: number,
  reducedDuration: number = 0
): number => {
  return prefersReducedMotion() ? reducedDuration : normalDuration;
};

/**
 * CSS-in-JS utility for conditional animations
 * @param normalStyles Normal animation styles
 * @param reducedStyles Reduced motion styles
 */
export const getAnimationStyles = (
  normalStyles: React.CSSProperties,
  reducedStyles: React.CSSProperties = {}
): React.CSSProperties => {
  return prefersReducedMotion() ? { ...normalStyles, ...reducedStyles } : normalStyles;
};

/**
 * Hook to watch for changes in motion preferences
 */
export const useMotionPreference = (): boolean => {
  const [prefersReduced, setPrefersReduced] = React.useState(prefersReducedMotion);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  return prefersReduced;
};
