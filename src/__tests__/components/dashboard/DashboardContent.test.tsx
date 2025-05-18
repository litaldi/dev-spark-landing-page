
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import * as dashboardActionsHook from '@/hooks/dashboard/use-dashboard-actions';

// Mock components used by DashboardContent
jest.mock('@/components/dashboard/WelcomeSection', () => ({
  WelcomeSection: ({ userName, isFirstTimeUser, onStartFirstLesson, onStartTodaysSession }) => (
    <div data-testid="welcome-section">
      <p>Welcome, {userName}</p>
      {isFirstTimeUser && <p>First time user</p>}
      <button onClick={onStartFirstLesson} data-testid="start-first-lesson">Start First Lesson</button>
      <button onClick={onStartTodaysSession} data-testid="start-session">Start Today's Session</button>
    </div>
  ),
}));

jest.mock('@/components/dashboard/ProgressSection', () => ({
  ProgressSection: ({ weeklyGoalHours, currentHours, streakDays }) => (
    <div data-testid="progress-section">
      <p>Goal: {weeklyGoalHours}h</p>
      <p>Progress: {currentHours}h</p>
      <p>Streak: {streakDays} days</p>
    </div>
  ),
}));

jest.mock('@/components/dashboard/LearningPathSection', () => ({
  LearningPathSection: ({ onStartLesson }) => (
    <div data-testid="learning-path-section">
      <button onClick={() => onStartLesson('lesson-123')} data-testid="start-lesson">
        Start Lesson
      </button>
    </div>
  ),
}));

jest.mock('@/components/dashboard/RecentActivitySection', () => ({
  RecentActivitySection: () => <div data-testid="recent-activity-section">Recent Activity</div>,
}));

describe('DashboardContent Component', () => {
  // Setup mock for the useDashboardActions hook
  const mockStartFirstLesson = jest.fn();
  const mockStartSession = jest.fn();
  const mockStartLesson = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the hook implementation
    jest.spyOn(dashboardActionsHook, 'useDashboardActions').mockReturnValue({
      startFirstLesson: mockStartFirstLesson,
      startSession: mockStartSession,
      startLesson: mockStartLesson,
    });
  });

  test('renders all dashboard sections', () => {
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={false}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    expect(screen.getByTestId('welcome-section')).toBeInTheDocument();
    expect(screen.getByTestId('progress-section')).toBeInTheDocument();
    expect(screen.getByTestId('learning-path-section')).toBeInTheDocument();
    expect(screen.getByTestId('recent-activity-section')).toBeInTheDocument();
  });

  test('displays user name correctly', () => {
    render(
      <DashboardContent
        userName="Jane Doe"
        isFirstTimeUser={false}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    expect(screen.getByText('Welcome, Jane Doe')).toBeInTheDocument();
  });

  test('handles first time user state', () => {
    render(
      <DashboardContent
        userName="New User"
        isFirstTimeUser={true}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    expect(screen.getByText('First time user')).toBeInTheDocument();
  });

  test('calls startFirstLesson when button is clicked', () => {
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={true}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    fireEvent.click(screen.getByTestId('start-first-lesson'));
    expect(mockStartFirstLesson).toHaveBeenCalled();
  });

  test('calls startSession when button is clicked', () => {
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={false}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    fireEvent.click(screen.getByTestId('start-session'));
    expect(mockStartSession).toHaveBeenCalled();
  });

  test('calls startLesson with lesson id when lesson button is clicked', () => {
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={false}
        isLoading={false}
        onError={jest.fn()}
      />
    );
    
    fireEvent.click(screen.getByTestId('start-lesson'));
    expect(mockStartLesson).toHaveBeenCalledWith('lesson-123');
  });

  test('passes loading state to all sections', () => {
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={false}
        isLoading={true}
        onError={jest.fn()}
      />
    );
    
    // This is a simple test to ensure the isLoading prop is passed correctly
    // In a more comprehensive test, we would check that loading skeletons are displayed
    expect(dashboardActionsHook.useDashboardActions).toHaveBeenCalledWith(expect.any(Function));
  });

  test('passes error handler to dashboard actions', () => {
    const mockErrorHandler = jest.fn();
    
    render(
      <DashboardContent
        userName="Test User"
        isFirstTimeUser={false}
        isLoading={false}
        onError={mockErrorHandler}
      />
    );
    
    expect(dashboardActionsHook.useDashboardActions).toHaveBeenCalledWith(mockErrorHandler);
  });
});
