
import { useEffect, useRef } from 'react';
import { trapFocus, handleEscapeKey, getFocusableElements } from '@/lib/keyboard-utils';

interface KeyboardNavigationOptions {
  trapFocus?: boolean;
  escapeHandler?: () => void;
  autoFocus?: boolean;
  returnFocusRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
}

export function useKeyboardNavigation(
  containerRef: React.RefObject<HTMLElement>,
  options: KeyboardNavigationOptions = {}
) {
  const {
    trapFocus: shouldTrapFocus = false,
    escapeHandler,
    autoFocus = false,
    returnFocusRef,
    enabled = true
  } = options;
  
  // Store the element that had focus before we captured it
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    
    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    
    let cleanupTrapFocus: (() => void) | undefined;
    let cleanupEscapeKey: (() => void) | undefined;
    
    if (containerRef.current) {
      // Auto-focus the first focusable element
      if (autoFocus) {
        const focusableElements = getFocusableElements(containerRef.current);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          // If no focusable elements, focus the container itself
          containerRef.current.setAttribute('tabindex', '-1');
          containerRef.current.focus();
        }
      }
      
      // Set up focus trapping if requested
      if (shouldTrapFocus) {
        cleanupTrapFocus = trapFocus(containerRef.current);
      }
      
      // Set up escape key handler if provided
      if (escapeHandler) {
        cleanupEscapeKey = handleEscapeKey(escapeHandler);
      }
    }
    
    // Cleanup function
    return () => {
      // Return focus to the original element
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      } else if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
      
      // Clean up event listeners
      if (cleanupTrapFocus) cleanupTrapFocus();
      if (cleanupEscapeKey) cleanupEscapeKey();
    };
  }, [containerRef, shouldTrapFocus, escapeHandler, autoFocus, returnFocusRef, enabled]);
  
  return {
    getPreviousFocusElement: () => previousFocusRef.current
  };
}
