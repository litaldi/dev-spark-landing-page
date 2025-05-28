
import React from 'react';
import { render, screen, fireEvent, userEvent } from '../../test-utils';
import { Input } from '@/components/ui/input';
import { axe } from 'jest-axe';

describe('Input Component Extended Tests', () => {
  // Test keyboard interactions
  test('focuses and blurs correctly', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur}
        placeholder="Test input"
      />
    );
    
    const inputElement = screen.getByPlaceholderText('Test input');
    
    // Focus the input
    inputElement.focus();
    expect(handleFocus).toHaveBeenCalled();
    expect(document.activeElement).toBe(inputElement);
    
    // Blur the input
    inputElement.blur();
    expect(handleBlur).toHaveBeenCalled();
    expect(document.activeElement).not.toBe(inputElement);
  });
  
  // Test controlled input behavior
  test('handles controlled input correctly', async () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Input 
        value="initial value" 
        onChange={handleChange}
      />
    );
    
    const inputElement = screen.getByDisplayValue('initial value');
    
    // Simulate typing
    await userEvent.type(inputElement, ' updated');
    expect(handleChange).toHaveBeenCalledTimes(' updated'.length);
    
    // Update the controlled value
    rerender(
      <Input 
        value="new value" 
        onChange={handleChange}
      />
    );
    
    // Check that value was updated
    expect(screen.getByDisplayValue('new value')).toBeInTheDocument();
  });
  
  // Test with various HTML attributes
  test('passes HTML attributes to the input element', () => {
    render(
      <Input 
        id="test-id"
        name="test-name"
        type="email"
        placeholder="Enter email"
        required
        maxLength={50}
        minLength={5}
        autoComplete="off"
        data-testid="email-input"
      />
    );
    
    const inputElement = screen.getByTestId('email-input');
    
    expect(inputElement).toHaveAttribute('id', 'test-id');
    expect(inputElement).toHaveAttribute('name', 'test-name');
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter email');
    expect(inputElement).toHaveAttribute('required');
    expect(inputElement).toHaveAttribute('maxLength', '50');
    expect(inputElement).toHaveAttribute('minLength', '5');
    expect(inputElement).toHaveAttribute('autoComplete', 'off');
  });
  
  // Test accessibility
  test('accessibility features', async () => {
    const { container } = render(
      <>
        <label htmlFor="name-input">Your Name</label>
        <Input
          id="name-input"
          aria-describedby="name-description"
          aria-required="true"
        />
        <p id="name-description">Please enter your full name as it appears on your ID.</p>
      </>
    );
    
    const inputElement = screen.getByLabelText('Your Name');
    
    expect(inputElement).toHaveAttribute('aria-describedby', 'name-description');
    expect(inputElement).toHaveAttribute('aria-required', 'true');
    
    // Test for accessibility violations
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  // Test input with prefixes and suffixes (common pattern for components)
  test('integrates with icon prefixes and suffixes', () => {
    render(
      <div className="flex items-center">
        <span className="mr-2">📧</span>
        <Input placeholder="Email" />
        <span className="ml-2">✓</span>
      </div>
    );
    
    expect(screen.getByText('📧')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});
