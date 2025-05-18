
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  test('renders correctly with default props', () => {
    render(<Input placeholder="Enter your name" />);
    
    const inputElement = screen.getByPlaceholderText('Enter your name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('flex h-11');
  });

  test('applies custom className', () => {
    render(<Input className="test-class" />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('test-class');
  });

  test('handles disabled state correctly', () => {
    render(<Input disabled />);
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveAttribute('data-state', 'disabled');
  });

  test('handles aria attributes correctly', () => {
    render(
      <Input 
        aria-invalid={true} 
        aria-describedby="error-message"
        aria-required={true}
      />
    );
    
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('aria-invalid', 'true');
    expect(inputElement).toHaveAttribute('aria-describedby', 'error-message');
    expect(inputElement).toHaveAttribute('aria-required', 'true');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="input-with-ref" />);
    
    expect(ref.current).not.toBeNull();
    expect(screen.getByTestId('input-with-ref')).toBe(ref.current);
  });

  test('can handle user input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(<Input onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    await user.type(inputElement, 'test input');
    
    expect(handleChange).toHaveBeenCalled();
    expect(inputElement).toHaveValue('test input');
  });
});
