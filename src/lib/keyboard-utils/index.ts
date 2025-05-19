
// Export all keyboard utility functions from a central point

// Re-export from focus-management.ts (with renamed function)
export * from './focus-management';

// Re-export from key-handlers.ts
export * from './key-handlers';

// Re-export from a11y-helpers.ts
// We need to be explicit to avoid the trapFocus ambiguity
export { 
  getFocusableElements,
  createSkipLink,
  announceToScreenReader,
  handleEscapeKey
} from './a11y-helpers';

// Explicitly export trapFocus from a11y-helpers to avoid naming conflicts
import { trapFocus } from './a11y-helpers';
export { trapFocus };

// Re-exporting all the keyboard utility functions from the new modules ensures 
// backward compatibility with existing code that imports from '@/lib/keyboard-utils'
