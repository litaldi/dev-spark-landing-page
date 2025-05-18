
import '@testing-library/jest-dom';

// Make sure jest is recognized before using it
const mockFn = jest.fn;

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

// Set up custom Jest matchers
expect.extend({
  // Add any custom matchers here if needed
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
