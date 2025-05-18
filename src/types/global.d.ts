
// Include the jest-dom matchers
import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }

  // Ensure Jest types are globally available
  const describe: jest.Describe;
  const test: jest.It;
  const it: jest.It;
  const expect: jest.Expect;
  const beforeEach: jest.Lifecycle;
  const afterEach: jest.Lifecycle;
  const beforeAll: jest.Lifecycle;
  const afterAll: jest.Lifecycle;

  // Add custom matcher interfaces
  namespace jest {
    interface Matchers<R> {
      // Custom matchers
      toHaveAccessibleName(expectedName?: string): R;
      
      // Testing Library matchers
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(...classNames: string[]): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveStyle(css: Record<string, any>): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toBeEmpty(): R;
      toHaveFocus(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveValue(value?: string | string[] | number): R;
      toHaveDisplayValue(value: string | string[] | RegExp): R;
      toBePartiallyChecked(): R;
    }
  }
}

// This is important - explicitly declare the jest namespace to avoid TS2503 errors
declare const jest: typeof import('jest');

// This exports an empty object to make the file a module
export {};
