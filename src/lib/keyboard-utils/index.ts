
// Main keyboard utility exports
export * from './focus-management';
export * from './key-handlers';

// Re-export from a11y-helpers
export {
  getFocusableElements,
  createSkipLink,
  announceToScreenReader,
  trapFocus,
  handleEscapeKey
} from './a11y-helpers';
