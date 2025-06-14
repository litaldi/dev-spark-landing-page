
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '../test-utils';
import { AccessibilityMenu } from '@/components/a11y/AccessibilityMenu';

// Mock local storage implementation for testing
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

// Replace the global localStorage with our mock
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

// Create a test component that will be affected by accessibility settings
const TestComponent = () => {
  return (
    <div data-testid="test-container">
      <header>
        <AccessibilityMenu />
      </header>
      <main>
        <h1 data-testid="main-heading">Test Heading</h1>
        <button data-testid="focus-button">Focus Test</button>
      </main>
    </div>
  );
};

describe('Accessibility Integration', () => {
  beforeEach(() => {
    // Reset mock localStorage
    mockLocalStorage.clear();
    
    // Reset DOM modifications
    document.documentElement.style.fontSize = '';
    document.documentElement.classList.remove('high-contrast');
    document.body.classList.remove('keyboard-navigation');
    
    // Restore the original implementation of useLocalStorage
    jest.restoreAllMocks();
  });

  test('accessibility settings persist after page reload', async () => {
    // First render - set accessibility settings
    const { unmount } = render(<TestComponent />);
    
    // Open accessibility menu
    const accessibilityButton = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(accessibilityButton);
    
    // Change text size
    const slider = await screen.findByRole('slider', { name: /adjust text size/i });
    fireEvent.change(slider, { target: { value: '120' } });
    
    // Enable high contrast
    const contrastSwitch = screen.getByRole('switch', { name: /toggle high contrast mode/i });
    fireEvent.click(contrastSwitch);
    
    // Close menu by clicking outside (simulating a blur event)
    fireEvent.click(document.body);
    
    // Unmount to simulate page navigation/reload
    unmount();
    
    // Second render - check if settings persist
    render(<TestComponent />);
    
    // Wait for settings to be applied from localStorage
    await waitFor(() => {
      // Check document styles
      expect(document.documentElement.style.fontSize).toBe('120%');
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    });
    
    // Open menu again to check if UI reflects the stored settings
    const newAccessibilityButton = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(newAccessibilityButton);
    
    // Verify the UI shows the correct settings
    const newSlider = await screen.findByRole('slider', { name: /adjust text size/i });
    expect(newSlider).toHaveValue('120');
    
    const newContrastSwitch = screen.getByRole('switch', { name: /toggle high contrast mode/i });
    expect(newContrastSwitch).toBeChecked();
  });

  test('keyboard navigation mode improves focus visibility', async () => {
    // Spy on classList.add to verify it's called
    const classListAddSpy = jest.spyOn(document.body.classList, 'add');
    
    render(<TestComponent />);
    
    // Open accessibility menu
    const accessibilityButton = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(accessibilityButton);
    
    // Enable keyboard navigation mode
    const keyboardSwitch = await screen.findByRole('switch', { name: /toggle keyboard navigation mode/i });
    fireEvent.click(keyboardSwitch);
    
    // Verify the keyboard-navigation class is added to body
    expect(classListAddSpy).toHaveBeenCalledWith('keyboard-navigation');
    expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
    
    // Close the menu
    fireEvent.click(document.body);
    
    // Test tab navigation with keyboard mode enabled
    const focusButton = screen.getByTestId('focus-button');
    focusButton.focus();
    
    // In a real browser, this would show enhanced focus styles
    // Here we can only verify the class is present
    expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
  });
});
