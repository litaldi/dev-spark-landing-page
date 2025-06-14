import React, { ReactElement } from 'react';
import { render, RenderOptions, waitFor } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';

// Export all testing library utilities explicitly
export { screen, fireEvent, waitFor, userEvent };
export * from '@testing-library/react';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Override the default render with our custom one
export { customRender as render };

// Helper function for screen reader announcements in tests
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

// Test helpers for simulating user interactions
export const simulateHover = (element: HTMLElement) => {
  element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
};

export const simulateFocus = (element: HTMLElement) => {
  element.focus();
  element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
};

export const simulateTabNavigation = (direction: 'forward' | 'backward' = 'forward') => {
  const event = new KeyboardEvent('keydown', {
    key: 'Tab',
    shiftKey: direction === 'backward',
    bubbles: true
  });
  document.dispatchEvent(event);
};

export const simulateScreenReader = (element: HTMLElement) => {
  // Mock screen reader by checking ARIA attributes
  const ariaLabel = element.getAttribute('aria-label');
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  const ariaDescribedBy = element.getAttribute('aria-describedby');
  
  return {
    label: ariaLabel,
    labelledBy: ariaLabelledBy,
    describedBy: ariaDescribedBy,
    role: element.getAttribute('role'),
    hasAriaLabel: !!ariaLabel,
    hasDescription: !!(ariaDescribedBy || element.getAttribute('title'))
  };
};
