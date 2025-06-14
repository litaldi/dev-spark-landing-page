
import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { axe } from 'jest-axe';

// Mock form component for testing
const TestForm = () => (
  <form>
    <label htmlFor="email">Email</label>
    <input id="email" type="email" required aria-describedby="email-error" />
    <div id="email-error" role="alert">Please enter a valid email</div>
    <button type="submit">Submit</button>
  </form>
);

describe('Form Validation Accessibility', () => {
  test('form has proper labels and error messaging', async () => {
    const { container } = render(<TestForm />);
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });
});
