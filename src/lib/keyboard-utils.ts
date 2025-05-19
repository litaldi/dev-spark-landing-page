
// Re-export all keyboard utility functions from the new module structure
// This maintains backward compatibility with existing imports

// Re-export from focus-management.ts (with renamed function)
export {
  detectKeyboardNavigation,
  useKeyboardFocusDetection,
  prefersReducedMotion,
  focusElement,
  useTrapFocus
} from './keyboard-utils/focus-management';

// Re-export from key-handlers.ts
export { 
  handleEnterAndSpace,
  handleArrowKeys
} from './keyboard-utils/key-handlers';

// Re-export from a11y-helpers.ts
export {
  getFocusableElements,
  createSkipLink,
  announceToScreenReader,
  handleEscapeKey
} from './keyboard-utils/a11y-helpers';

// Explicitly export trapFocus from a11y-helpers to avoid naming conflicts
import { trapFocus } from './keyboard-utils/a11y-helpers';
export { trapFocus };

// Note: This file is now just a re-export facade and does not contain any implementation logic.
// All implementations have been moved to dedicated files in the keyboard-utils directory.
