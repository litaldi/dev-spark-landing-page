
/**
 * Sets up a handler for the Escape key
 * @param handler Function to call when Escape is pressed
 * @returns Cleanup function to remove event listener
 */
export function handleEscapeKey(handler: () => void): () => void {
  const escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handler();
    }
  };
  
  document.addEventListener('keydown', escapeHandler);
  return () => {
    document.removeEventListener('keydown', escapeHandler);
  };
}

/**
 * Helper to create a keyboard handler for specific keys
 * @param keys Array of keys to listen for
 * @param handler Function to call when a key is pressed
 * @param options Options for the event listener
 * @returns Cleanup function to remove event listener
 */
export function createKeyboardHandler(
  keys: string[],
  handler: (e: KeyboardEvent) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  const keyHandler = (e: KeyboardEvent) => {
    if (keys.includes(e.key)) {
      handler(e);
    }
  };
  
  document.addEventListener('keydown', keyHandler, options);
  return () => {
    document.removeEventListener('keydown', keyHandler, options);
  };
}

/**
 * Sets up arrow key navigation for a list of elements
 * @param container Container element with focusable children
 * @param options Navigation options
 * @returns Cleanup function to remove event listeners
 */
export function setupArrowKeyNavigation(
  container: HTMLElement,
  options: {
    vertical?: boolean;
    horizontal?: boolean;
    loop?: boolean;
  } = { vertical: true, horizontal: false, loop: true }
): () => void {
  const { vertical, horizontal, loop } = {
    vertical: true,
    horizontal: false,
    loop: true,
    ...options
  };
  
  const keyHandler = (e: KeyboardEvent) => {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      return;
    }
    
    const focusableElements = Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];
    
    if (focusableElements.length === 0) return;
    
    const currentIndex = focusableElements.findIndex(
      el => el === document.activeElement
    );
    
    let nextIndex = currentIndex;
    
    if (vertical && e.key === 'ArrowUp') {
      nextIndex = currentIndex - 1;
    } else if (vertical && e.key === 'ArrowDown') {
      nextIndex = currentIndex + 1;
    } else if (horizontal && e.key === 'ArrowLeft') {
      nextIndex = currentIndex - 1;
    } else if (horizontal && e.key === 'ArrowRight') {
      nextIndex = currentIndex + 1;
    } else {
      return; // Not a key we're handling
    }
    
    // Handle looping or boundary conditions
    if (nextIndex < 0) {
      nextIndex = loop ? focusableElements.length - 1 : 0;
    } else if (nextIndex >= focusableElements.length) {
      nextIndex = loop ? 0 : focusableElements.length - 1;
    }
    
    // Move focus
    e.preventDefault(); // Prevent page scrolling
    focusableElements[nextIndex].focus();
  };
  
  container.addEventListener('keydown', keyHandler);
  return () => {
    container.removeEventListener('keydown', keyHandler);
  };
}
