
import { act } from '@testing-library/react';

// Wait utility for async operations
export const waitFor = async (callback: () => void, options?: { timeout?: number }) => {
  const timeout = options?.timeout || 1000;
  const start = Date.now();
  
  while (Date.now() - start < timeout) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  // Final attempt
  callback();
};

// Re-export act for convenience
export { act };
