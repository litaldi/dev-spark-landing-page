
import React from 'react';

// Mock components used by DashboardContent
export const mockComponents = {
  WelcomeSection: jest.mock('@/components/dashboard/WelcomeSection', () => ({
    WelcomeSection: ({ userName, isFirstTimeUser, onStartFirstLesson, onStartTodaysSession }) => (
      <div data-testid="welcome-section">
        <p>Welcome, {userName}</p>
        {isFirstTimeUser && <p>First time user</p>}
        <button onClick={onStartFirstLesson} data-testid="start-first-lesson">Start First Lesson</button>
        <button onClick={onStartTodaysSession} data-testid="start-session">Start Today's Session</button>
      </div>
    ),
  })),

  ProgressSection: jest.mock('@/components/dashboard/ProgressSection', () => ({
    ProgressSection: ({ weeklyGoalHours, currentHours, streakDays }) => (
      <div data-testid="progress-section">
        <p>Goal: {weeklyGoalHours}h</p>
        <p>Progress: {currentHours}h</p>
        <p>Streak: {streakDays} days</p>
      </div>
    ),
  })),

  LearningPathSection: jest.mock('@/components/dashboard/LearningPathSection', () => ({
    LearningPathSection: ({ onStartLesson }) => (
      <div data-testid="learning-path-section">
        <button onClick={() => onStartLesson('lesson-123')} data-testid="start-lesson">
          Start Lesson
        </button>
      </div>
    ),
  })),

  RecentActivitySection: jest.mock('@/components/dashboard/RecentActivitySection', () => ({
    RecentActivitySection: () => <div data-testid="recent-activity-section">Recent Activity</div>,
  })),

  AIRecommendations: jest.mock('@/components/dashboard/AIRecommendations', () => ({
    AIRecommendations: ({ userName, userTopics }) => (
      <div data-testid="ai-recommendations">
        AI Recommendations for {userName}
        {userTopics && <p>Topics: {userTopics.join(', ')}</p>}
      </div>
    ),
  })),

  AIStudyCompanion: jest.mock('@/components/dashboard/AIStudyCompanion', () => ({
    AIStudyCompanion: ({ userName }) => (
      <div data-testid="ai-study-companion">AI Study Companion for {userName}</div>
    ),
  })),

  MotivationalPrompts: jest.mock('@/components/dashboard/MotivationalPrompts', () => ({
    MotivationalPrompts: ({ userName }) => (
      <div data-testid="motivational-prompts">Motivational Prompts for {userName}</div>
    ),
  })),
};

// Setup mock for localStorage
export const setupLocalStorageMock = () => {
  Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
    if (key === 'lastSessionDate') return '2025-05-15T10:30:00.000Z';
    if (key === 'userTopics') return 'JavaScript, HTML, CSS';
    return null;
  });
};

// Common testing props
export const commonProps = {
  userName: "Test User",
  isFirstTimeUser: false,
  isLoading: false,
  onError: jest.fn()
};
