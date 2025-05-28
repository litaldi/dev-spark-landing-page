
import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Re-export everything from testing libraries
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Create a screen object that works with our setup
const screen = {
  getByRole: (role: string, options?: any) => document.querySelector(`[role="${role}"]`) as HTMLElement,
  getByText: (text: string | RegExp) => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      const content = node.textContent || '';
      if (typeof text === 'string' ? content.includes(text) : text.test(content)) {
        return node.parentElement as HTMLElement;
      }
    }
    throw new Error(`Unable to find text: ${text}`);
  },
  getByLabelText: (text: string | RegExp) => {
    const labels = Array.from(document.querySelectorAll('label'));
    for (const label of labels) {
      const content = label.textContent || '';
      if (typeof text === 'string' ? content.includes(text) : text.test(content)) {
        const forAttr = label.getAttribute('for');
        if (forAttr) {
          return document.getElementById(forAttr) as HTMLElement;
        }
        return label.querySelector('input, textarea, select') as HTMLElement;
      }
    }
    throw new Error(`Unable to find label: ${text}`);
  },
  getByTestId: (testId: string) => document.querySelector(`[data-testid="${testId}"]`) as HTMLElement,
  queryByText: (text: string | RegExp) => {
    try {
      return screen.getByText(text);
    } catch {
      return null;
    }
  },
  queryByRole: (role: string, options?: any) => document.querySelector(`[role="${role}"]`) as HTMLElement | null,
  findByText: async (text: string | RegExp) => {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        try {
          resolve(screen.getByText(text));
        } catch {
          setTimeout(attempt, 10);
        }
      };
      attempt();
      setTimeout(() => reject(new Error(`Unable to find text: ${text}`)), 1000);
    });
  },
  findByRole: async (role: string, options?: any) => {
    return new Promise((resolve, reject) => {
      const attempt = () => {
        const element = document.querySelector(`[role="${role}"]`) as HTMLElement;
        if (element) {
          resolve(element);
        } else {
          setTimeout(attempt, 10);
        }
      };
      attempt();
      setTimeout(() => reject(new Error(`Unable to find role: ${role}`)), 1000);
    });
  }
};

export { screen };

// Create a comprehensive fireEvent object with all the methods tests expect
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
  },
  change: (element: Element, eventOptions?: { target: { value: string | number } }) => {
    const event = new Event('change', { bubbles: true });
    if (eventOptions?.target && 'value' in element) {
      (element as any).value = eventOptions.target.value;
    }
    element.dispatchEvent(event);
  },
  submit: (element: Element) => {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
  },
  keyDown: (element: Element, eventOptions?: { key: string; code?: string; keyCode?: number }) => {
    const event = new KeyboardEvent('keydown', {
      key: eventOptions?.key || '',
      code: eventOptions?.code || '',
      keyCode: eventOptions?.keyCode || 0,
      bubbles: true
    });
    element.dispatchEvent(event);
  },
  keyUp: (element: Element, eventOptions?: { key: string; code?: string; keyCode?: number }) => {
    const event = new KeyboardEvent('keyup', {
      key: eventOptions?.key || '',
      code: eventOptions?.code || '',
      keyCode: eventOptions?.keyCode || 0,
      bubbles: true
    });
    element.dispatchEvent(event);
  },
  blur: (element: Element) => {
    if (element instanceof HTMLElement) {
      element.blur();
    }
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
