
// Re-export all keyboard utility functions from the new module structure
// This maintains backward compatibility with existing imports

export * from './keyboard-utils/focus-management';
export * from './keyboard-utils/key-handlers';
export * from './keyboard-utils/a11y-helpers';

// Note: This file is now just a re-export facade and does not contain any implementation logic.
// All implementations have been moved to dedicated files in the keyboard-utils directory.

