
import { useEffect } from 'react';

/**
 * Detects if user is navigating with keyboard
 * @returns Cleanup function to remove event listeners
 */
export const detectKeyboardNavigation = () => {
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  };

  const handleMouseDown = () => {
    document.body.classList.remove('keyboard-navigation');
  };

  // Add event listeners
  document.addEventListener('keydown', handleTabKey);
  document.addEventListener('mousedown', handleMouseDown);

  // Clean up
  return () => {
    document.removeEventListener('keydown', handleTabKey);
    document.removeEventListener('mousedown', handleMouseDown);
  };
};

/**
 * Hook to apply enhanced focus state detection
 */
export const useKeyboardFocusDetection = () => {
  useEffect(() => {
    return detectKeyboardNavigation();
  }, []);
};

/**
 * Returns true if user prefers reduced motion
 * @returns Boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Moves focus to an element
 * @param selector CSS selector for the element to focus
 */
export const focusElement = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

/**
 * React hook to trap focus within a container
 * @param containerRef Reference to container element
 * @param active Whether focus trapping is active
 */
export const useTrapFocus = (containerRef: React.RefObject<HTMLElement>, active: boolean = true) => {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // If shift + tab and on first element, move to last element
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // If tab and on last element, move to first element
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [containerRef, active]);
};
