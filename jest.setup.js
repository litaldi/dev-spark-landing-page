
import '@testing-library/jest-dom';

// Mock for document.createElement for announceToScreenReader tests
global.document.createElement = jest.fn().mockImplementation(() => ({
  setAttribute: jest.fn(),
  classList: {
    add: jest.fn(),
  },
  textContent: '',
}));

// Mock for document functions used in tests
global.document.body.appendChild = jest.fn();
global.document.body.removeChild = jest.fn();

// Set up custom Jest matchers
expect.extend({
  // Add any custom matchers here if needed
});
