
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

// Set up custom Jest matchers
expect.extend({
  // Add any custom matchers here if needed
});
