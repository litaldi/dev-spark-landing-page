
// Re-export everything from testing libraries
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Re-export our custom utilities
export { screen } from './utils/screen-utils';
export { fireEvent } from './utils/fire-event-utils';
export { waitFor, act } from './utils/wait-utils';
export { render } from './utils/render-utils';
export {
  simulateHover,
  simulateFocus,
  simulateTabNavigation,
  simulateScreenReader,
  announceToScreenReader
} from './utils/interaction-helpers';
