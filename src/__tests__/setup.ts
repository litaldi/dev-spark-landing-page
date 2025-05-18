
// This file is run before each test file
import '@testing-library/jest-dom';

// Extend Jest with missing matchers if needed
expect.extend({
  // If your version of testing-library/jest-dom doesn't have toHaveAccessibleName
  // we'll define it ourselves
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

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

// Mock matchMedia with proper type handling
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
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

// Suppress React 18 console errors about act()
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

// Mock IntersectionObserver with proper TypeScript type definitions
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(private readonly callback: IntersectionObserverCallback) {}
  
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
};
