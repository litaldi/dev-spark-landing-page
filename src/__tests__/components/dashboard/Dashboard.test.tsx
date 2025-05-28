
import React from 'react';
import { render, screen, waitFor } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

// Mock the dashboard hooks
jest.mock('@/hooks/dashboard/use-dashboard-actions', () => ({
  useDashboardActions: () => ({
    handleQuickAction: jest.fn(),
    isLoading: false,
  }),
}));

jest.mock('@/hooks/use-local-storage', () => ({
  useLocalStorage: () => ['Test User', jest.fn()],
}));

describe('Dashboard Component', () => {
  test('renders dashboard correctly when user is logged in', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  test('displays user progress section', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/your progress/i)).toBeInTheDocument();
  });

  test('shows recent activity section', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/recent activity/i)).toBeInTheDocument();
    });
  });

  test('displays quick access shortcuts', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/quick access/i)).toBeInTheDocument();
    });
  });

  test('shows learning recommendations', async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/recommended/i)).toBeInTheDocument();
    });
  });
});
