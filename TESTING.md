
# Testing Documentation

This project uses Jest and React Testing Library for testing. The tests are organized into different categories:

## Unit Tests

Unit tests focus on testing individual functions, hooks, or components in isolation. These tests are located in the `src/__tests__` directory and are named with the pattern `*.test.ts` or `*.test.tsx`.

### Running Tests

To run all tests:

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

To run a specific test file:

```bash
npm test -- src/__tests__/hooks/use-form-state.test.ts
```

## Test Coverage

The project aims for a minimum of 70% coverage across all files. Coverage reports can be found in the `coverage` directory after running tests with the `--coverage` flag.

## Key Test Files

- `use-form-state.test.ts`: Tests for the form state management hook
- `Onboarding.test.tsx`: Tests for the Onboarding page component
- `form-interactions.test.tsx`: Integration tests for form interactions

## Mocking Strategy

The tests use Jest's mocking capabilities to mock:
- External dependencies (like useToast)
- DOM APIs (like document.createElement)
- React hooks (like useForm)

## Best Practices

1. Each test should be independent and not rely on the state from other tests
2. Use descriptive test names that explain what is being tested
3. Follow the AAA pattern: Arrange, Act, Assert
4. Mock external dependencies to isolate the code being tested
5. Focus on testing behavior, not implementation details

## Future Improvements

- Add end-to-end tests using Cypress or Playwright
- Implement visual regression testing
- Add more integration tests for complex user flows
