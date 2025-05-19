
import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AccessibilitySettings } from '@/components/a11y/AccessibilityMenu';
import { prefersReducedMotion } from '@/lib/keyboard-utils';
import { createSkipLink } from '@/lib/keyboard-utils/a11y-helpers';
import { applyReducedMotionStyles } from '@/lib/motion-utils';

// Default settings if none are found in local storage
const defaultSettings: AccessibilitySettings = {
  textSize: 100, // 100%
  highContrast: false,
  keyboardMode: false,
  reducedMotion: false,
  largePointer: false,
  lineHeight: 1.5,
  letterSpacing: 0,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
}

// Create the context
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'accessibility-settings',
    defaultSettings
  );

  // Apply settings whenever they change
  useEffect(() => {
    // Apply text size
    document.documentElement.style.fontSize = `${settings.textSize}%`;
    
    // Apply high contrast mode
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply keyboard navigation mode
    if (settings.keyboardMode) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }
    
    // Apply reduced motion (checks both settings and user preference)
    const shouldReduceMotion = settings.reducedMotion || prefersReducedMotion();
    applyReducedMotionStyles(shouldReduceMotion);
    
    // Apply large pointer
    if (settings.largePointer) {
      document.documentElement.classList.add('large-pointer');
    } else {
      document.documentElement.classList.remove('large-pointer');
    }
    
    // Apply line height
    document.documentElement.style.setProperty('--a11y-line-height', settings.lineHeight.toString());
    
    // Apply letter spacing
    document.documentElement.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);
    
    // Create skip link for keyboard navigation
    createSkipLink('main-content');
    
    // Add CSS classes for styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      body.keyboard-navigation *:focus {
        outline: 3px solid rgb(64, 156, 255) !important;
        outline-offset: 2px !important;
      }
      
      .large-pointer * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="black"/><circle cx="8" cy="8" r="6" fill="white"/></svg>') 16 16, auto !important;
      }
      
      html {
        line-height: var(--a11y-line-height, 1.5);
        letter-spacing: var(--a11y-letter-spacing, 0);
      }
      
      .reduce-motion * {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      // Clean up
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('keyboard-navigation');
      document.documentElement.classList.remove('large-pointer');
      document.documentElement.style.removeProperty('--a11y-line-height');
      document.documentElement.style.removeProperty('--a11y-letter-spacing');
      document.head.removeChild(styleElement);
    };
  }, [settings]);

  // Create context value
  const contextValue: AccessibilityContextType = {
    settings,
    updateSettings: (key, value) => {
      setSettings(current => ({ ...current, [key]: value }));
    },
    resetSettings: () => {
      setSettings(defaultSettings);
    },
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
}

// Hook to use the accessibility context
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
