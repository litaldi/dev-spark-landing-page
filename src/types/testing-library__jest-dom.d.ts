
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Extend the Jest matcher types to include custom matchers
declare namespace jest {
  interface Matchers<R, T = any> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string | RegExp): R;
    toBeVisible(): R;
    toBeChecked(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeEmpty(): R;
    toBeEmptyDOMElement(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toContainElement(element: HTMLElement | SVGElement | null): R;
    toContainHTML(html: string): R;
    toHaveAccessibleDescription(description?: string | RegExp): R;
    toHaveAccessibleName(name?: string): R;
    toHaveAttribute(attr: string, value?: any): R;
    toHaveClass(...classNames: string[]): R;
    toHaveFocus(): R;
    toHaveFormValues(expectedValues: Record<string, any>): R;
    toHaveStyle(css: string | Record<string, any>): R;
    toHaveValue(value?: string | string[] | number): R;
    toBeInTheDOM(): R;
    toHaveDescription(text?: string | RegExp): R;
  }
}

export {};
