import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import OnboardingPage from '@/pages/auth/Onboarding';

describe('Onboarding Page', () => {
  test('renders without errors', () => {
    render(<OnboardingPage />);
    
    // Check for main heading
    const headingElement = screen.getByText(/Welcome to DevSpark/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('navigates between steps', async () => {
    render(<OnboardingPage />);
    
    // Initial step - Stack Selection
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
    
    // Move to next step
    fireEvent.click(nextButton);
    
    // Wait for the Weekly Goals step to load
    await waitFor(() => {
      expect(screen.getByText(/weekly learning goal/i)).toBeInTheDocument();
    });
    
    // Go back to previous step
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    
    // Wait for the Stack Selection step to load
    await waitFor(() => {
      expect(screen.getByText(/select your tech stack/i)).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store: { [key: string]: string } = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = String(value);
        },
        clear: () => {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    
    render(<OnboardingPage />);
    
    // Select a tech stack
    const reactCheckbox = await screen.findByLabelText(/react/i);
    fireEvent.click(reactCheckbox);
    
    // Move to next step
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    // Adjust weekly goal
    const slider = await screen.findByRole('slider', { name: /weekly learning goal/i });
    fireEvent.change(slider, { target: { value: '20' } });
    
    // Submit the form
    const completeButton = screen.getByRole('button', { name: /complete setup/i });
    fireEvent.click(completeButton);
    
    // Wait for navigation to dashboard
    await waitFor(() => {
      expect(localStorageMock.getItem('onboardingComplete')).toBe('true');
    });
  });
});
