import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Re-export everything from testing libraries
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Import screen, fireEvent, and waitFor from their correct sources
export { screen } from '@testing-library/react';

// For fireEvent and waitFor, we need to create them or import from dom-testing-library
// Since they're not available in @testing-library/react v16+, let's create mock versions
const fireEvent = {
  mouseEnter: (element: Element) => {
    const event = new MouseEvent('mouseenter', { bubbles: true });
    element.dispatchEvent(event);
  },
  mouseOver: (element: Element) => {
    const event = new MouseEvent('mouseover', { bubbles: true });
    element.dispatchEvent(event);
  },
  focus: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.focus();
    }
  },
  click: (element: Element) => {
    const event = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(event);
  }
};

const waitFor = async (callback: () => void, options?: { timeout?: number }) => {
  const timeout = options?.timeout || 1000;
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  // Final attempt
  callback();
};

// Re-export the utilities
export { fireEvent, waitFor, act };

// Create a custom render function that includes providers
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllProviders, ...options });

// Helper function for testing hover effects
const simulateHover = (element: Element) => {
  fireEvent.mouseEnter(element);
  fireEvent.mouseOver(element);
};

// Helper function for testing focus effects
const simulateFocus = (element: Element) => {
  fireEvent.focus(element);
};

// Helper function for simulating keyboard navigation
const simulateTabNavigation = (container: HTMLElement, forward = true) => {
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
        // Cast to HTMLElement which has focus() method
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
const simulateScreenReader = (element: Element) => {
  // Get all text content, including aria-label, that a screen reader would read
  const getScreenReaderText = (el: Element): string => {
    let text = '';
    
    // Get aria-label if present
    const ariaLabel = el.getAttribute('aria-label');
    if (ariaLabel) {
      text += ariaLabel + ' ';
    }
    
    // Get text content
    text += el.textContent || '';
    
    // Get description from aria-describedby if present
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
const announceToScreenReader = (message: string) => {
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

// Override the default render with our custom render
export { customRender as render, simulateHover, simulateFocus, simulateTabNavigation, simulateScreenReader, announceToScreenReader };
