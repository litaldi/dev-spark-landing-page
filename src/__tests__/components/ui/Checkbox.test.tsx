
import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import { Checkbox } from '@/components/ui/checkbox';

describe('Checkbox Component', () => {
  test('renders correctly', () => {
    render(<Checkbox aria-label="Accept terms" />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toBeInTheDocument();
  });

  test('handles checked state', () => {
    const handleCheckedChange = jest.fn();
    render(
      <Checkbox 
        checked={true} 
        onCheckedChange={handleCheckedChange} 
        aria-label="Test checkbox"
      />
    );
    
    const checkbox = screen.getByRole('checkbox', { name: 'Test checkbox' });
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    
    // Click the checkbox to toggle state
    fireEvent.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledWith(false);
  });

  test('handles disabled state', () => {
    render(<Checkbox disabled aria-label="Disabled checkbox" />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Disabled checkbox' });
    expect(checkbox).toBeDisabled();
  });

  test('applies custom className', () => {
    render(<Checkbox className="test-class" aria-label="Custom class checkbox" />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Custom class checkbox' });
    expect(checkbox).toHaveClass('test-class');
  });

  test('renders the indicator when checked', () => {
    render(<Checkbox checked aria-label="Checked checkbox" />);
    
    const checkbox = screen.getByRole('checkbox', { name: 'Checked checkbox' });
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    
    // Check for the presence of the Check icon (indicator)
    const indicator = checkbox.querySelector('svg');
    expect(indicator).toBeInTheDocument();
  });
});
