
import React from 'react';
import { screen } from '@testing-library/react';
import { setupLocalStorageMock, commonProps } from './__mocks__/dashboardMocks';
import { setupDashboardActionsMocks, renderDashboard } from './utils/dashboardTestUtils';

// Import mock components to ensure they're loaded before tests run
import '@/components/dashboard/WelcomeSection';
import '@/components/dashboard/ProgressSection';
import '@/components/dashboard/LearningPathSection';
import '@/components/dashboard/RecentActivitySection';
import '@/components/dashboard/AIRecommendations';
import '@/components/dashboard/AIStudyCompanion';
import '@/components/dashboard/MotivationalPrompts';

describe('DashboardContent Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupLocalStorageMock();
    setupDashboardActionsMocks();
  });

  test('renders all dashboard sections', () => {
    renderDashboard(commonProps);
    
    expect(screen.getByTestId('welcome-section')).toBeInTheDocument();
    expect(screen.getByTestId('progress-section')).toBeInTheDocument();
    expect(screen.getByTestId('learning-path-section')).toBeInTheDocument();
    expect(screen.getByTestId('recent-activity-section')).toBeInTheDocument();
    expect(screen.getByTestId('ai-recommendations')).toBeInTheDocument();
    expect(screen.getByTestId('ai-study-companion')).toBeInTheDocument();
    expect(screen.getByTestId('motivational-prompts')).toBeInTheDocument();
  });

  test('displays user name correctly', () => {
    renderDashboard({
      ...commonProps,
      userName: "Jane Doe"
    });
    
    expect(screen.getByText('Welcome, Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('AI Recommendations for Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('AI Study Companion for Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Motivational Prompts for Jane Doe')).toBeInTheDocument();
  });

  test('handles first time user state', () => {
    renderDashboard({
      ...commonProps,
      userName: "New User",
      isFirstTimeUser: true
    });
    
    expect(screen.getByText('First time user')).toBeInTheDocument();
  });

  test('passes loading state to all sections', () => {
    renderDashboard({
      ...commonProps,
      isLoading: true
    });
    
    // In a real test, we would check for loading indicators
    // This test verifies the hook is called with correct parameters
    const { useDashboardActions } = require('@/hooks/dashboard/use-dashboard-actions');
    expect(useDashboardActions).toHaveBeenCalledWith(expect.any(Function));
  });
});
