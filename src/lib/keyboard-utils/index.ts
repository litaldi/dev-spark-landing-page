
// Export all keyboard utility functions from a central point
export * from './focus-management';
export * from './key-handlers';
export * from './a11y-helpers';

// Re-exporting all the keyboard utility functions from the new modules ensures 
// backward compatibility with existing code that imports from '@/lib/keyboard-utils'
