
# Testing Guide

This project includes a comprehensive test suite to ensure quality and stability. This guide explains how to run the tests and contribute new tests.

## Available Test Commands

```bash
# Run all tests
npm test

# Run tests with coverage reports
npm test -- --coverage

# Run tests in watch mode (useful during development)
npm test -- --watch

# Run a specific test file
npm test -- src/__tests__/components/ui/Input.test.tsx
```

## Test Structure

Our tests are organized into the following categories in the `src/__tests__` directory:

- **components/**: Unit tests for individual UI components
- **hooks/**: Tests for custom React hooks
- **integration/**: Tests for component interactions
- **pages/**: Tests for page components
- **accessibility/**: Tests for accessibility features
- **utils/**: Tests for utility functions

## Writing Tests

### Unit Tests

When writing unit tests for components:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComponentName } from '@/components/path/to/component';

describe('ComponentName', () => {
  test('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  // Add more tests...
});
```

### Integration Tests

Integration tests verify that components work together correctly:

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ParentComponent } from '@/components/path/to/parent';

describe('Integration Test for ParentComponent', () => {
  test('child component interaction works', async () => {
    render(<ParentComponent />);
    
    // Interact with child component
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    
    // Verify expected behavior
    expect(screen.getByText('Response from child')).toBeInTheDocument();
  });
});
```

### Testing Hooks

For testing hooks, use `renderHook` from `@testing-library/react-hooks`:

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCustomHook } from '@/hooks/use-custom-hook';

describe('useCustomHook', () => {
  test('returns expected initial value', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe('initial');
  });
  
  test('updates value correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(result.current.value).toBe('updated');
  });
});
```

### Accessibility Tests

For accessibility testing:

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccessibleComponent } from '@/components/path/to/component';

describe('Accessibility Tests for AccessibleComponent', () => {
  test('has proper ARIA attributes', () => {
    render(<AccessibleComponent />);
    const element = screen.getByRole('button');
    
    expect(element).toHaveAttribute('aria-label');
    expect(element).not.toHaveAttribute('aria-hidden', 'true');
  });
  
  // Add more accessibility tests...
});
```

## Testing Utilities

We provide several testing utilities to make writing tests easier:

- `customRender`: A wrapper around RTL's render function that includes providers
- `simulateHover`: Helper to simulate hover events
- `simulateFocus`: Helper to simulate focus events
- `simulateTabNavigation`: Helper to simulate keyboard navigation
- `simulateScreenReader`: Helper to test screen reader accessibility

These utilities are available in `src/__tests__/test-utils.tsx`.

## Mocking

When your component depends on external services or hooks, use Jest's mocking capabilities:

```jsx
// Mock a hook
jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: { name: 'Test User' },
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

// Mock API calls
jest.mock('@/api/userApi', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
}));
```

## Coverage Requirements

We aim for at least 70% test coverage for all code. You can check coverage reports in the `coverage` directory after running `npm test -- --coverage`.

## Best Practices

1. Test behavior, not implementation details
2. Use descriptive test names
3. Follow the AAA pattern: Arrange, Act, Assert
4. Keep tests focused and small
5. Don't test third-party libraries, only your code
6. Use proper semantic queries (getByRole instead of getByTestId when possible)
7. Test edge cases and error states

