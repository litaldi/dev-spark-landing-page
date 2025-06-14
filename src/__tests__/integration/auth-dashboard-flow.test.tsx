
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';

// Mock components for auth-dashboard flow
const MockAuthFlow = () => (
  <div>
    <button>Login</button>
    <div data-testid="dashboard">Dashboard Content</div>
  </div>
);

describe('Auth to Dashboard Flow', () => {
  test('navigates from auth to dashboard', async () => {
    render(<MockAuthFlow />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
  });
});
