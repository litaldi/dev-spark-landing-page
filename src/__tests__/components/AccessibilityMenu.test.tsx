import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import { AccessibilityMenu } from '@/components/a11y/AccessibilityMenu';
import * as useLocalStorageModule from '@/hooks/use-local-storage';

// Mock the useLocalStorage hook
jest.mock('@/hooks/use-local-storage', () => ({
  useLocalStorage: jest.fn(),
}));

describe('AccessibilityMenu Component', () => {
  const defaultSettings = {
    textSize: 100,
    highContrast: false,
    keyboardMode: false,
  };

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementation for useLocalStorage
    const mockSetSettings = jest.fn();
    (useLocalStorageModule.useLocalStorage as jest.Mock).mockReturnValue([
      defaultSettings, 
      mockSetSettings
    ]);
    
    // Reset any DOM modifications from previous tests
    document.documentElement.style.fontSize = '';
    document.documentElement.classList.remove('high-contrast');
    document.body.classList.remove('keyboard-navigation');
  });

  test('renders the accessibility button', () => {
    render(<AccessibilityMenu />);
    
    const button = screen.getByRole('button', { name: /accessibility options/i });
    expect(button).toBeInTheDocument();
  });

  test('opens the menu when button is clicked', async () => {
    render(<AccessibilityMenu />);
    
    // Click the button to open the menu
    const button = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(button);
    
    // Check that menu content is visible
    const heading = await screen.findByText(/accessibility settings/i);
    expect(heading).toBeInTheDocument();
  });

  test('changes text size when slider is adjusted', async () => {
    // Mock the set function to update the mock state
    let currentSettings = { ...defaultSettings };
    const mockSetSettings = jest.fn((newSettings) => {
      currentSettings = typeof newSettings === 'function' 
        ? newSettings(currentSettings) 
        : newSettings;
    });
    
    (useLocalStorageModule.useLocalStorage as jest.Mock).mockReturnValue([
      currentSettings, 
      mockSetSettings
    ]);

    render(<AccessibilityMenu />);
    
    // Open the menu
    const button = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(button);
    
    // Find the slider
    const slider = await screen.findByRole('slider', { name: /adjust text size/i });
    expect(slider).toBeInTheDocument();
    
    // Simulate changing the slider value
    // Note: React Testing Library doesn't directly support slider thumb movement,
    // so we're triggering the change event directly
    fireEvent.change(slider, { target: { value: '120' } });
    
    // Check that the set function was called with the new text size
    await waitFor(() => {
      expect(mockSetSettings).toHaveBeenCalledWith(expect.objectContaining({
        textSize: expect.any(Number),
      }));
    });
  });

  test('toggles high contrast mode', async () => {
    // Mock the set function to update the mock state
    let currentSettings = { ...defaultSettings };
    const mockSetSettings = jest.fn((newSettings) => {
      currentSettings = typeof newSettings === 'function' 
        ? newSettings(currentSettings) 
        : newSettings;
    });
    
    (useLocalStorageModule.useLocalStorage as jest.Mock).mockReturnValue([
      currentSettings, 
      mockSetSettings
    ]);

    render(<AccessibilityMenu />);
    
    // Open the menu
    const button = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(button);
    
    // Find and click the high contrast switch
    const contrastSwitch = await screen.findByRole('switch', { name: /toggle high contrast mode/i });
    fireEvent.click(contrastSwitch);
    
    // Check that the set function was called with the high contrast enabled
    await waitFor(() => {
      expect(mockSetSettings).toHaveBeenCalledWith(expect.objectContaining({
        highContrast: true,
      }));
    });
  });

  test('toggles keyboard navigation mode', async () => {
    // Mock the set function to update the mock state
    let currentSettings = { ...defaultSettings };
    const mockSetSettings = jest.fn((newSettings) => {
      currentSettings = typeof newSettings === 'function' 
        ? newSettings(currentSettings) 
        : newSettings;
    });
    
    (useLocalStorageModule.useLocalStorage as jest.Mock).mockReturnValue([
      currentSettings, 
      mockSetSettings
    ]);

    render(<AccessibilityMenu />);
    
    // Open the menu
    const button = screen.getByRole('button', { name: /accessibility options/i });
    fireEvent.click(button);
    
    // Find and click the keyboard mode switch
    const keyboardSwitch = await screen.findByRole('switch', { name: /toggle keyboard navigation mode/i });
    fireEvent.click(keyboardSwitch);
    
    // Check that the set function was called with keyboard mode enabled
    await waitFor(() => {
      expect(mockSetSettings).toHaveBeenCalledWith(expect.objectContaining({
        keyboardMode: true,
      }));
    });
  });

  test('applies settings to document when they change', async () => {
    // Mock the settings with non-default values
    const customSettings = {
      textSize: 120,
      highContrast: true,
      keyboardMode: true,
    };
    
    (useLocalStorageModule.useLocalStorage as jest.Mock).mockReturnValue([
      customSettings,
      jest.fn(),
    ]);

    render(<AccessibilityMenu />);
    
    // Check that the settings are applied to the document
    await waitFor(() => {
      expect(document.documentElement.style.fontSize).toBe('120%');
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      expect(document.body.classList.contains('keyboard-navigation')).toBe(true);
    });
  });
});
