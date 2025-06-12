
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
  try {
    let skipLink = document.getElementById('skip-nav-link');
    
    if (!skipLink) {
      skipLink = document.createElement('a');
      skipLink.id = 'skip-nav-link';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md transition-all duration-200';
      skipLink.innerText = 'Skip to content';
      skipLink.setAttribute('href', `#${contentId}`);
      
      // Add keyboard event listener
      skipLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetElement = document.getElementById(contentId);
          if (targetElement) {
            targetElement.focus();
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  } catch (error) {
    console.error('Error creating skip link:', error);
  }
};

/**
 * Announces a message to screen readers
 * @param message Text to announce
 * @param priority Priority level for announcement (polite or assertive)
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  try {
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
    
    // Clear the announcer first
    announcer.textContent = '';
    
    // Use setTimeout to ensure the announcement happens
    setTimeout(() => {
      if (announcer) {
        announcer.textContent = message;
      }
    }, 100);
  } catch (error) {
    console.error('Error announcing to screen reader:', error);
  }
};

/**
 * Function to trap focus within an element
 * @param container Element to trap focus within
 * @returns Cleanup function to remove event listeners
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  try {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return () => {};
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the first element initially
    firstElement.focus();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  } catch (error) {
    console.error('Error trapping focus:', error);
    return () => {};
  }
};

/**
 * Handle escape key press
 * @param callback Function to execute when escape key is pressed
 * @returns Cleanup function to remove event listeners
 */
export const handleEscapeKey = (callback: () => void): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      callback();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Manages focus restoration after modal/dialog closes
 */
export class FocusManager {
  private previousActiveElement: HTMLElement | null = null;
  
  saveFocus() {
    this.previousActiveElement = document.activeElement as HTMLElement;
  }
  
  restoreFocus() {
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      setTimeout(() => {
        this.previousActiveElement?.focus();
      }, 0);
    }
  }
  
  clear() {
    this.previousActiveElement = null;
  }
}

/**
 * Creates a global focus manager instance
 */
export const globalFocusManager = new FocusManager();
