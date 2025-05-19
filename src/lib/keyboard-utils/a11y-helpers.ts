
import React from 'react';

/**
 * Returns all focusable elements within a container
 * @param container HTML element to search within
 * @returns Array of focusable HTML elements
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
};

/**
 * Creates a skip link for improved keyboard navigation
 * @param contentId ID of the main content element to skip to
 */
export const createSkipLink = (contentId: string): void => {
  let skipLink = document.getElementById('skip-nav-link');
  
  if (!skipLink) {
    skipLink = document.createElement('a');
    skipLink.id = 'skip-nav-link';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md';
    skipLink.innerText = 'Skip to content';
    // Fix: Use setAttribute for href instead of direct property access
    skipLink.setAttribute('href', `#${contentId}`);
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
};

/**
 * Announces a message to screen readers
 * @param message Text to announce
 * @param priority Priority level for announcement (polite or assertive)
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  } else {
    announcer.setAttribute('aria-live', priority);
  }
  
  // Clear the announcer and then set the new content
  announcer.textContent = '';
  
  // Use setTimeout to ensure the announcement happens after the screen reader 
  // has a chance to detect that the content has been cleared
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
};

/**
 * Function to trap focus within an element
 * @param container Element to trap focus within
 * @returns Cleanup function to remove event listeners
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  const handleKeyDown = (e: KeyboardEvent) => {
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
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Handle escape key press
 * @param callback Function to execute when escape key is pressed
 * @returns Cleanup function to remove event listeners
 */
export const handleEscapeKey = (callback: () => void): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};
