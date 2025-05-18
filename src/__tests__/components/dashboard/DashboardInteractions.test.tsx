
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { setupLocalStorageMock } from './__mocks__/dashboardMocks';
import { setupDashboardActionsMocks, renderDashboard } from './utils/dashboardTestUtils';

// Import mock components to ensure they're loaded before tests run
import '@/components/dashboard/WelcomeSection';
import '@/components/dashboard/LearningPathSection';

describe('DashboardContent Interactions', () => {
  let mockActions;
  
  beforeEach(() => {
    jest.clearAllMocks();
    setupLocalStorageMock();
    mockActions = setupDashboardActionsMocks();
  });

  test('calls startFirstLesson when button is clicked', () => {
    renderDashboard({
      userName: "Test User",
      isFirstTimeUser: true
    });
    
    fireEvent.click(screen.getByTestId('start-first-lesson'));
    expect(mockActions.mockStartFirstLesson).toHaveBeenCalled();
  });

  test('calls startSession when button is clicked', () => {
    renderDashboard({
      userName: "Test User",
      isFirstTimeUser: false
    });
    
    fireEvent.click(screen.getByTestId('start-session'));
    expect(mockActions.mockStartSession).toHaveBeenCalled();
  });

  test('calls startLesson with lesson id when lesson button is clicked', () => {
    renderDashboard({
      userName: "Test User",
      isFirstTimeUser: false
    });
    
    fireEvent.click(screen.getByTestId('start-lesson'));
    expect(mockActions.mockStartLesson).toHaveBeenCalledWith('lesson-123');
  });
});
