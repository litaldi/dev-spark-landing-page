
import { fireEvent } from './fire-event-utils';

// Helper function for testing hover effects
export const simulateHover = (element: Element) => {
  fireEvent.mouseEnter(element);
  fireEvent.mouseOver(element);
};

// Helper function for testing focus effects
export const simulateFocus = (element: Element) => {
  fireEvent.focus(element);
};

// Helper function for simulating keyboard navigation
export const simulateTabNavigation = (container: HTMLElement, forward = true) => {
  const tabbableElements = Array.from(
    container.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
  );
  
  if (!forward) {
    tabbableElements.reverse();
  }
  
  let previousFocusedElement: Element | null = null;
  
  return {
    tabToNext: () => {
      const nextElement = tabbableElements.find(
        (el) => previousFocusedElement === null || 
        (tabbableElements.indexOf(el) > tabbableElements.indexOf(previousFocusedElement))
      );
      
      if (nextElement) {
        previousFocusedElement = nextElement;
        (nextElement as HTMLElement).focus();
        return nextElement;
      }
      return null;
    },
    reset: () => {
      previousFocusedElement = null;
    }
  };
};

// Helper function to simulate screen reader behavior
export const simulateScreenReader = (element: Element) => {
  const getScreenReaderText = (el: Element): string => {
    let text = '';
    
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel) {
      text += ariaLabel + ' ';
    }
    
    text += el.textContent || '';
    
    const describedById = el.getAttribute('aria-describedby');
    if (describedById) {
      const descriptionElement = document.getElementById(describedById);
      if (descriptionElement) {
        text += ' ' + descriptionElement.textContent;
      }
    }
    
    return text.trim();
  };
  
  return {
    getText: () => getScreenReaderText(element),
    getRole: () => element.getAttribute('role') || element.tagName.toLowerCase(),
    isHidden: () => 
      element.getAttribute('aria-hidden') === 'true' || 
      element.classList.contains('sr-only') ||
      window.getComputedStyle(element as HTMLElement).display === 'none'
  };
};

// Screen reader announcer function
export const announceToScreenReader = (message: string) => {
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only');
    document.body.appendChild(announcer);
  }
  
  announcer.textContent = message;
};
