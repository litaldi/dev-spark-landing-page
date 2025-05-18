
import React from 'react';
import { render } from '@testing-library/react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
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

// Helper to render DashboardContent with props
export const renderDashboard = (props) => {
  return render(
    <DashboardContent
      userName={props.userName || "Test User"}
      isFirstTimeUser={props.isFirstTimeUser !== undefined ? props.isFirstTimeUser : false}
      isLoading={props.isLoading !== undefined ? props.isLoading : false}
      onError={props.onError || jest.fn()}
    />
  );
};
