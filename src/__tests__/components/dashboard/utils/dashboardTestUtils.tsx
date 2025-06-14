
import React from 'react';
import { render } from '@testing-library/react';
import { EnhancedDashboardContent } from '@/components/dashboard/EnhancedDashboardContent';
import * as dashboardActionsHook from '@/hooks/dashboard/use-dashboard-actions';

// Setup dashboardActions mock hooks
export const setupDashboardActionsMocks = () => {
  const mockStartFirstLesson = jest.fn();
  const mockStartSession = jest.fn();
  const mockStartLesson = jest.fn();
  const mockHandleAction = jest.fn();
  
  jest.spyOn(dashboardActionsHook, 'useDashboardActions').mockReturnValue({
    handleAction: mockHandleAction,
    startFirstLesson: mockStartFirstLesson,
    startSession: mockStartSession,
    startLesson: mockStartLesson,
  });
  
  return {
    mockStartFirstLesson,
    mockStartSession,
    mockStartLesson,
    mockHandleAction
  };
};

// Helper to render EnhancedDashboardContent with props
export const renderDashboard = (props) => {
  return render(
    <EnhancedDashboardContent
      userName={props.userName || "Test User"}
      isFirstTimeUser={props.isFirstTimeUser !== undefined ? props.isFirstTimeUser : false}
      isLoading={props.isLoading !== undefined ? props.isLoading : false}
      onError={props.onError || jest.fn()}
    />
  );
};
