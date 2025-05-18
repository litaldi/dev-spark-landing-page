
/**
 * Utility functions for keyboard accessibility
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableElementsString = 
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
  const elements = Array.from(
    container.querySelectorAll(focusableElementsString)
  ) as HTMLElement[];
  
  // Filter out hidden elements
  return elements.filter(el => {
    const style = window.getComputedStyle(el);
    return !(style.display === 'none' || style.visibility === 'hidden');
  });
}

/**
 * Trap focus within a container (for modals, dialogs, etc)
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) return () => {};
  
  // Focus the first element
  focusableElements[0].focus();
  
  const handleKeyDown = (e: KeyboardEvent) => {
    // Handle Tab key press
    if (e.key === 'Tab') {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      // If Shift+Tab on first element, move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If Tab on last element, move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // Add event listener
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Create an announcement for screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Create announcement element
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.classList.add('sr-only'); // Visually hidden
  
  // Set the message and add to DOM
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  // Remove after a delay
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 3000);
}

/**
 * Handle Escape key press
 */
export function handleEscapeKey(callback: () => void): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
