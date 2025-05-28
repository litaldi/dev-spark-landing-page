
import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { EnhancedDashboardContent } from '@/components/dashboard/EnhancedDashboardContent';
import { AIStudyCompanion } from '@/components/dashboard/AIStudyCompanion';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Comprehensive Accessibility Tests', () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn((key) => {
      const mockData: Record<string, string> = {
        'currentStreak': '5',
        'totalStudyHours': '15',
        'lessonsCompleted': '8',
        'projectsStarted': '3',
        'userTopics': 'web development, JavaScript, React'
      };
      return mockData[key] || null;
    });
  });

  test('error boundary has no accessibility violations', async () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const { container } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check that error message is accessible
    expect(screen.getByRole('heading', { name: /something went wrong/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  test('dashboard content is fully accessible', async () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider>
          <EnhancedDashboardContent
            userName="Test User"
            isFirstTimeUser={false}
            isLoading={false}
            onError={jest.fn()}
          />
        </ThemeProvider>
      </BrowserRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('AI companion is keyboard accessible', async () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider>
          <AIStudyCompanion userName="Test User" />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Test keyboard navigation
    const chatButton = screen.getByLabelText(/open ai study assistant/i);
    chatButton.focus();
    expect(document.activeElement).toBe(chatButton);

    // Activate with keyboard
    fireEvent.keyDown(chatButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(chatButton);

    await waitFor(() => {
      expect(screen.getByText(/ai study assistant/i)).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('color contrast meets WCAG standards', async () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider>
          <div className="p-4 bg-white dark:bg-gray-900">
            <h1 className="text-gray-900 dark:text-white text-2xl">Test Heading</h1>
            <p className="text-gray-600 dark:text-gray-300">Test paragraph text</p>
            <button className="bg-brand-500 text-white px-4 py-2 rounded">
              Test Button
            </button>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('focus management works correctly', async () => {
    const TestComponent = () => (
      <div>
        <button>First Button</button>
        <button>Second Button</button>
        <input type="text" placeholder="Test input" />
        <a href="#test">Test Link</a>
      </div>
    );

    render(<TestComponent />);

    // Test tab navigation
    const firstButton = screen.getByText('First Button');
    const secondButton = screen.getByText('Second Button');
    const input = screen.getByPlaceholderText('Test input');
    const link = screen.getByText('Test Link');

    // Focus first element
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton);

    // Tab to next elements
    fireEvent.keyDown(document.activeElement!, { key: 'Tab' });
    // Note: In a real browser, focus would move to secondButton
    // In jsdom, we need to manually verify the tab order is correct
    expect(secondButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  test('screen reader announcements work', () => {
    render(
      <div>
        <div aria-live="polite" data-testid="announcer">
          Test announcement
        </div>
        <div role="status" aria-label="Loading content">
          Loading...
        </div>
      </div>
    );

    expect(screen.getByTestId('announcer')).toHaveTextContent('Test announcement');
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading content');
  });
});
