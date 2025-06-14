
import React from 'react';

/**
 * Focus management utilities for accessibility
 */

/**
 * Detect if user is navigating with keyboard
 */
export function detectKeyboardNavigation(): void {
  let isUsingKeyboard = false;

  function handleFirstTab(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      isUsingKeyboard = true;
      document.body.classList.add('keyboard-navigation');
      document.removeEventListener('keydown', handleFirstTab);
      document.addEventListener('mousedown', handleMouseDown);
    }
  }

  function handleMouseDown() {
    isUsingKeyboard = false;
    document.body.classList.remove('keyboard-navigation');
    document.addEventListener('keydown', handleFirstTab);
    document.removeEventListener('mousedown', handleMouseDown);
  }

  document.addEventListener('keydown', handleFirstTab);
}

/**
 * React hook for keyboard focus detection
 */
export function useKeyboardFocusDetection() {
  React.useEffect(() => {
    detectKeyboardNavigation();
  }, []);
}

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
 * Focus an element safely
 */
export function focusElement(element: HTMLElement | null): void {
  if (element && typeof element.focus === 'function') {
    try {
      element.focus();
    } catch (error) {
      console.warn('Failed to focus element:', error);
    }
  }
}

/**
 * React hook for focus trapping
 */
export function useTrapFocus(isActive: boolean = true) {
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}
