
/**
 * Utility functions for handling motion preferences
 */

/**
 * Checks if the user prefers reduced motion
 * @returns Whether the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Applies reduced motion styles based on user preferences or settings
 * @param shouldReduceMotion Override for the user's preference
 */
export function applyReducedMotionStyles(shouldReduceMotion?: boolean): void {
  const shouldReduce = shouldReduceMotion ?? prefersReducedMotion();
  
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
}

/**
 * Hook for accessing and responding to motion preferences
 */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(prefersReducedMotion());
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Update the state when the preference changes
    const handleChange = () => {
      setPrefersReduced(mediaQuery.matches);
      applyReducedMotionStyles(mediaQuery.matches);
    };
    
    // Set up event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Apply initial styles
    applyReducedMotionStyles(mediaQuery.matches);
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  return prefersReduced;
}
