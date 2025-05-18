
import { simulateHover, simulateFocus, simulateTabNavigation, simulateScreenReader } from '../test-utils';

// Re-export the test utilities
export {
  simulateHover,
  simulateFocus, 
  simulateTabNavigation,
  simulateScreenReader
};

/**
 * Wait for a specific time in tests
 */
export const wait = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock IntersectionObserver for tests
 */
export const setupIntersectionObserverMock = (): void => {
  class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    
    constructor(private callback: IntersectionObserverCallback) {}
    
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver
  });
};

/**
 * Helper to test form submissions
 */
export const submitForm = (formElement: HTMLFormElement): void => {
  const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
  formElement.dispatchEvent(submitEvent);
};

/**
 * Helper to test keyboard interactions
 */
export const pressKey = (element: Element, key: string): void => {
  const keyEvent = new KeyboardEvent('keydown', { key, bubbles: true });
  element.dispatchEvent(keyEvent);
};
