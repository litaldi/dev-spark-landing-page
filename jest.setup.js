
import '@testing-library/jest-dom';

// Make sure jest is recognized before using it
const mockFn = jest.fn;

// Ensure our custom matchers are registered
expect.extend({
  toHaveAccessibleName: (element, expectedName) => {
    const accessibleName = element.getAttribute('aria-label') || 
                          element.getAttribute('aria-labelledby') ||
                          element.textContent || '';
                          
    const hasName = accessibleName.trim() !== '';
    const nameMatches = expectedName ? accessibleName.includes(expectedName) : true;
    
    return {
      pass: hasName && nameMatches,
      message: () => {
        if (!hasName) {
          return `Expected element to have an accessible name, but it doesn't have one.`;
        }
        if (!nameMatches) {
          return `Expected element to have accessible name containing "${expectedName}", but got "${accessibleName}".`;
        }
        return `Expected element not to have accessible name, but it has "${accessibleName}".`;
      },
    };
  }
});

// Mock for document.createElement for announceToScreenReader tests
global.document.createElement = mockFn().mockImplementation(() => ({
  setAttribute: mockFn(),
  classList: {
    add: mockFn(),
  },
  textContent: '',
}));

// Mock for document functions used in tests
global.document.body.appendChild = mockFn();
global.document.body.removeChild = mockFn();

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress React 18 console errors
const originalError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: The current testing environment is not configured to support act/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};
