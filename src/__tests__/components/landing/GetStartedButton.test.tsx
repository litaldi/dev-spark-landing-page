import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import GetStartedButton from '@/components/landing/GetStartedButton';

describe('GetStartedButton Component', () => {
  test('renders correctly with default props', () => {
    render(<GetStartedButton />);
    
    const buttonElement = screen.getByRole('button', { name: 'Get Started for Free' });
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<GetStartedButton className="test-class" />);
    
    const buttonElement = screen.getByRole('button', { name: 'Get Started for Free' });
    expect(buttonElement).toHaveClass('test-class');
  });

  test('navigates to the registration page on click', () => {
    const navigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));
    
    render(<GetStartedButton />);
    
    const buttonElement = screen.getByRole('button', { name: 'Get Started for Free' });
    fireEvent.click(buttonElement);
    
    expect(navigate).toHaveBeenCalledWith('/auth/register');
  });

  test('handles mobile menu close when isMobile is true', () => {
    const onMenuClose = jest.fn();
    render(<GetStartedButton isMobile={true} onMenuClose={onMenuClose} />);
    
    const buttonElement = screen.getByRole('button', { name: 'Get Started for Free' });
    fireEvent.click(buttonElement);
    
    expect(onMenuClose).toHaveBeenCalled();
  });

  test('applies custom size and variant', () => {
    render(<GetStartedButton size="lg" variant="outline" />);
    
    const buttonElement = screen.getByRole('button', { name: 'Get Started for Free' });
    expect(buttonElement).toHaveClass('lg');
    expect(buttonElement).toHaveClass('outline');
  });

  test('renders custom children', () => {
    render(<GetStartedButton>Sign Up Now</GetStartedButton>);
    
    const buttonElement = screen.getByRole('button', { name: 'Sign Up Now' });
    expect(buttonElement).toBeInTheDocument();
  });
});
