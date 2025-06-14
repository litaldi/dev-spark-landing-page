
// Direct re-exports from keyboard-utils modules for backward compatibility
// This maintains existing imports while using the modular structure

export {
  detectKeyboardNavigation,
  useKeyboardFocusDetection,
  prefersReducedMotion,
  focusElement,
  useTrapFocus
} from './keyboard-utils/focus-management';

export { 
  handleEnterAndSpace,
  handleArrowKeys
} from './keyboard-utils/key-handlers';

export {
  getFocusableElements,
  createSkipLink,
  announceToScreenReader,
  handleEscapeKey,
  trapFocus
} from './keyboard-utils/a11y-helpers';
