
/**
 * Motion utility functions for animation and transition management
 */

/**
 * Applies reduced motion styles to the document
 * Used to respect user preferences for reduced motion
 * 
 * @param shouldReduce Whether motion should be reduced
 */
export const applyReducedMotionStyles = (shouldReduce: boolean): void => {
  if (shouldReduce) {
    document.documentElement.classList.add('reduce-motion');
    
    // Add a style element with reduced motion styles if it doesn't exist
    if (!document.getElementById('reduced-motion-styles')) {
      const style = document.createElement('style');
      style.id = 'reduced-motion-styles';
      style.textContent = `
        .reduce-motion * {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    document.documentElement.classList.remove('reduce-motion');
    const style = document.getElementById('reduced-motion-styles');
    if (style) {
      style.remove();
    }
  }
};

/**
 * Creates a smooth scroll effect to an element
 * With fallback for browsers that don't support smooth scrolling
 * 
 * @param elementId ID of the element to scroll to
 * @param options Scroll options
 */
export const smoothScrollTo = (
  elementId: string, 
  options: { 
    offset?: number; 
    behavior?: ScrollBehavior;
    respectReducedMotion?: boolean;
  } = {}
): void => {
  const { 
    offset = 0, 
    behavior = 'smooth',
    respectReducedMotion = true
  } = options;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const shouldUseReducedMotion = 
    respectReducedMotion && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const actualBehavior = shouldUseReducedMotion ? 'auto' : behavior;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: actualBehavior,
  });
};

/**
 * Detects if the browser supports smooth scrolling
 * 
 * @returns Boolean indicating if smooth scrolling is supported
 */
export const isSmoothScrollSupported = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style;
};

/**
 * Returns a performance-optimized animation frame request
 * 
 * @param callback Function to call on animation frame
 * @returns Request ID that can be used to cancel the request
 */
export const requestOptimizedAnimationFrame = (callback: FrameRequestCallback): number => {
  // Use requestAnimationFrame if available
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(callback);
  }
  
  // Fallback to setTimeout with proper typing
  return window.setTimeout(callback, 16) as unknown as number;
};

/**
 * Cancels an animation frame request
 * 
 * @param requestId Request ID to cancel
 */
export const cancelOptimizedAnimationFrame = (requestId: number): void => {
  // Use cancelAnimationFrame if available
  if ('cancelAnimationFrame' in window) {
    window.cancelAnimationFrame(requestId);
    return;
  }
  
  // Fallback to clearTimeout with proper typing
  window.clearTimeout(requestId as unknown as number);
};
