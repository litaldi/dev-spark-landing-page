
/**
 * Enhanced keyboard accessibility utility functions
 */

/**
 * Get all focusable elements within a container
 * @param container - The container element to search within
 * @param includeHidden - Whether to include hidden elements (default: false)
 */
export function getFocusableElements(container: HTMLElement, includeHidden: boolean = false): HTMLElement[] {
  const focusableElementsString = 
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
  const elements = Array.from(
    container.querySelectorAll(focusableElementsString)
  ) as HTMLElement[];
  
  // Filter out hidden elements if needed
  if (!includeHidden) {
    return elements.filter(el => {
      const style = window.getComputedStyle(el);
      const isHidden = style.display === 'none' || 
                       style.visibility === 'hidden' || 
                       style.opacity === '0' ||
                       el.getAttribute('aria-hidden') === 'true';
      return !isHidden;
    });
  }
  
  return elements;
}

/**
 * Trap focus within a container (for modals, dialogs, etc.)
 * @param container - The container element to trap focus within
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  
  if (focusableElements.length === 0) return () => {};
  
  // Focus the first element automatically
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
 * @param message - Message to announce
 * @param priority - Priority level (polite or assertive)
 * @param timeout - How long to keep the announcement in the DOM
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite',
  timeout: number = 3000
): void {
  // Check if there's already an announcement element
  let announcement = document.querySelector('.sr-announcement') as HTMLDivElement;
  
  if (!announcement) {
    // Create announcement element if it doesn't exist
    announcement = document.createElement('div');
    announcement.classList.add('sr-announcement', 'sr-only');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcement);
  } else {
    // Update existing element's priority if different
    announcement.setAttribute('aria-live', priority);
  }
  
  // Set the message
  announcement.textContent = message;
  
  // Remove after timeout (but don't remove the element itself)
  setTimeout(() => {
    if (announcement.textContent === message) {
      announcement.textContent = '';
    }
  }, timeout);
}

/**
 * Handle Escape key press
 * @param callback - The function to call when Escape is pressed
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

/**
 * Create a key handler that triggers on specified keys
 * @param keys - Array of keys to listen for
 * @param callback - The function to call when a matching key is pressed
 * @param options - Additional options
 */
export function createKeyHandler(
  keys: string[], 
  callback: (e: KeyboardEvent) => void,
  options: { preventDefault?: boolean } = {}
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (keys.includes(e.key)) {
      if (options.preventDefault) {
        e.preventDefault();
      }
      callback(e);
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Set up arrow key navigation for a group of elements
 * @param container - The container with navigable elements
 * @param selector - CSS selector for navigable items
 */
export function setupArrowNavigation(container: HTMLElement, selector: string): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
      return;
    }
    
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    if (elements.length === 0) return;
    
    const currentFocusIndex = elements.findIndex(el => el === document.activeElement);
    let nextIndex = currentFocusIndex;
    
    switch(e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = currentFocusIndex < elements.length - 1 ? currentFocusIndex + 1 : 0;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = currentFocusIndex > 0 ? currentFocusIndex - 1 : elements.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = elements.length - 1;
        break;
    }
    
    if (nextIndex !== currentFocusIndex) {
      elements[nextIndex].focus();
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}
