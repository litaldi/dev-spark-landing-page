
import { useEffect } from 'react';

/**
 * Detects if user is navigating with keyboard
 */
export function detectKeyboardNavigation(): void {
  let isKeyboardUser = false;

  // Listen for keyboard events
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-navigation');
    }
  }

  // Listen for mouse events
  function handleMousedown() {
    isKeyboardUser = false;
    document.body.classList.remove('keyboard-navigation');
  }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('mousedown', handleMousedown);
}

/**
 * Hook to enable keyboard focus detection
 */
export function useKeyboardFocusDetection(): void {
  useEffect(() => {
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
      console.error('Error focusing element:', error);
    }
  }
}

/**
 * Hook to trap focus within a container
 */
export function useTrapFocus(containerRef: React.RefObject<HTMLElement>, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          focusElement(lastElement);
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          focusElement(firstElement);
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    focusElement(firstElement);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, isActive]);
}
