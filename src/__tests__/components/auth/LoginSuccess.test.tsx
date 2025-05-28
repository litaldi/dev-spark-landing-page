
import React from 'react';
import { render, screen } from '../../test-utils';
import { LoginSuccess } from '@/components/auth/LoginSuccess';

describe('LoginSuccess Component', () => {
  test('renders correctly with a success message', () => {
    render(<LoginSuccess userName="Test User" redirectTo="/dashboard" isFirstTimeUser={false} />);
    
    const successMessage = screen.getByText(/login successful/i);
    expect(successMessage).toBeInTheDocument();
  });

  test('displays a link to the dashboard', () => {
    render(<LoginSuccess userName="Test User" redirectTo="/dashboard" isFirstTimeUser={false} />);
    
    const dashboardLink = screen.getByRole('link', { name: /go to dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });
});
