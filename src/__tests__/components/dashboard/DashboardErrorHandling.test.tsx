
import React from 'react';
import { setupLocalStorageMock } from './__mocks__/dashboardMocks';
import { setupDashboardActionsMocks, renderDashboard } from './utils/dashboardTestUtils';
import * as dashboardActionsHook from '@/hooks/dashboard/use-dashboard-actions';

// Import mock components to ensure they're loaded
import '@/components/dashboard/WelcomeSection';

describe('DashboardContent Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupLocalStorageMock();
    setupDashboardActionsMocks();
  });

  test('passes error handler to dashboard actions', () => {
    const mockErrorHandler = jest.fn();
    
    renderDashboard({
      userName: "Test User",
      isFirstTimeUser: false,
      isLoading: false,
      onError: mockErrorHandler
    });
    
    expect(dashboardActionsHook.useDashboardActions).toHaveBeenCalledWith(mockErrorHandler);
  });
});
