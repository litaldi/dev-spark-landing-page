
// Export all keyboard utility functions from a central point

// Re-export from focus-management.ts
export { 
  detectKeyboardNavigation,
  useKeyboardFocusDetection,
  prefersReducedMotion,
  focusElement,
  useTrapFocus
} from './focus-management';

// Re-export from key-handlers.ts
export { 
  handleEnterAndSpace,
  handleArrowKeys
} from './key-handlers';

// Re-export from a11y-helpers.ts
export { 
  getFocusableElements,
  createSkipLink,
  announceToScreenReader,
  handleEscapeKey
} from './a11y-helpers';

// Explicitly export trapFocus from a11y-helpers to avoid naming conflicts
import { trapFocus } from './a11y-helpers';
export { trapFocus };
