
/**
 * Creates an announcer element for screen readers if one doesn't exist
 * @returns The announcer element
 */
function createScreenReaderAnnouncer(): HTMLElement {
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }
  
  return announcer;
}

/**
 * Announces a message to screen readers
 * @param message The message to announce
 * @param politeness The politeness level (polite or assertive)
 */
export function announceToScreenReader(
  message: string, 
  politeness: 'polite' | 'assertive' = 'polite'
): void {
  const announcer = createScreenReaderAnnouncer();
  
  // Update politeness level if needed
  if (announcer.getAttribute('aria-live') !== politeness) {
    announcer.setAttribute('aria-live', politeness);
  }
  
  // Set the message (using a slight delay to ensure screen readers catch it)
  announcer.textContent = '';
  
  // Using setTimeout to ensure the DOM update cycle has completed
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}

/**
 * Adds skip links to the page for keyboard navigation
 * @param mainContentId ID of the main content element
 * @returns The skip link element
 */
export function createSkipLink(mainContentId: string = 'main-content'): HTMLElement {
  const existingSkipLink = document.querySelector('.skip-link') as HTMLElement;
  if (existingSkipLink) return existingSkipLink;
  
  const skipLink = document.createElement('a');
  skipLink.href = `#${mainContentId}`;
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:dark:bg-gray-900 focus:px-4 focus:py-2 focus:rounded focus:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500';
  skipLink.textContent = 'Skip to content';
  
  document.body.prepend(skipLink);
  return skipLink;
}

/**
 * Checks if an element is visible to screen readers
 * @param element The element to check
 * @returns Whether the element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  
  // Check if element is not hidden using CSS
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }
  
  // Check if element has aria-hidden="true"
  if (element.getAttribute('aria-hidden') === 'true') {
    return false;
  }
  
  // Check if element has role="presentation" or role="none"
  const role = element.getAttribute('role');
  if (role === 'presentation' || role === 'none') {
    return false;
  }
  
  return true;
}
