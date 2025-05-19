
/**
 * Gets all focusable elements within a container
 * @param container The container element to search within
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
    '[contentEditable=true]:not([tabindex="-1"])'
  ].join(',');

  const elements = Array.from(
    container.querySelectorAll(focusableSelectors)
  ) as HTMLElement[];

  // Sort by tabindex
  return elements.sort((a, b) => {
    const aIndex = parseInt(a.getAttribute('tabindex') || '0', 10);
    const bIndex = parseInt(b.getAttribute('tabindex') || '0', 10);
    if (aIndex === bIndex) return 0;
    if (aIndex === 0) return 1;
    if (bIndex === 0) return -1;
    return aIndex - bIndex;
  });
}

/**
 * Sets up focus trapping within a container
 * @param container The container to trap focus within
 * @returns Cleanup function to remove event listeners
 */
export function trapFocus(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    // If shift + tab and on first element, move to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // If tab and on last element, move to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  container.addEventListener('keydown', handleTabKey);
  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Returns focus to a specified element
 * @param element Element to focus
 * @param options Focus options
 */
export function returnFocus(element: HTMLElement | null, options?: FocusOptions): void {
  if (element && typeof element.focus === 'function') {
    element.focus(options);
  }
}

/**
 * Manages focus for modal/dialog patterns
 * @param containerRef Reference to the modal/dialog container
 * @param returnElement Element to return focus to when modal closes
 * @returns Object with focus management functions
 */
export function useFocusManagement(
  containerRef: React.RefObject<HTMLElement>,
  returnElement?: HTMLElement | null
) {
  return {
    trap: () => {
      if (containerRef.current) {
        return trapFocus(containerRef.current);
      }
      return () => {};
    },
    focusFirst: () => {
      if (containerRef.current) {
        const elements = getFocusableElements(containerRef.current);
        if (elements.length > 0) {
          elements[0].focus();
        } else {
          containerRef.current.focus();
        }
      }
    },
    returnFocus: () => {
      if (returnElement) {
        returnFocus(returnElement);
      }
    }
  };
}
