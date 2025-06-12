
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

  // Ensure settings are properly typed and have fallbacks
  const safeSettings = React.useMemo(() => {
    if (!settings || typeof settings !== 'object') {
      return defaultSettings;
    }
    
    return {
      textSize: typeof settings.textSize === 'number' && !isNaN(settings.textSize) ? settings.textSize : 100,
      highContrast: Boolean(settings.highContrast),
      keyboardMode: Boolean(settings.keyboardMode),
      reducedMotion: Boolean(settings.reducedMotion),
      largePointer: Boolean(settings.largePointer),
      lineHeight: typeof settings.lineHeight === 'number' && !isNaN(settings.lineHeight) ? settings.lineHeight : 1.5,
      letterSpacing: typeof settings.letterSpacing === 'number' && !isNaN(settings.letterSpacing) ? settings.letterSpacing : 0,
    };
  }, [settings]);

  // Apply settings whenever they change
  useEffect(() => {
    try {
      // Apply text size
      if (safeSettings.textSize > 0) {
        document.documentElement.style.fontSize = `${safeSettings.textSize}%`;
      }
      
      // Apply high contrast mode
      if (safeSettings.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      // Apply keyboard navigation mode
      if (safeSettings.keyboardMode) {
        document.body.classList.add('keyboard-navigation');
      } else {
        document.body.classList.remove('keyboard-navigation');
      }
      
      // Apply reduced motion (checks both settings and user preference)
      const shouldReduceMotion = safeSettings.reducedMotion || (typeof prefersReducedMotion === 'function' ? prefersReducedMotion() : false);
      if (typeof applyReducedMotionStyles === 'function') {
        applyReducedMotionStyles(shouldReduceMotion);
      }
      
      // Apply large pointer
      if (safeSettings.largePointer) {
        document.documentElement.classList.add('large-pointer');
      } else {
        document.documentElement.classList.remove('large-pointer');
      }
      
      // Apply line height
      if (safeSettings.lineHeight > 0) {
        document.documentElement.style.setProperty('--a11y-line-height', safeSettings.lineHeight.toString());
      }
      
      // Apply letter spacing
      document.documentElement.style.setProperty('--a11y-letter-spacing', `${safeSettings.letterSpacing}px`);
      
      // Create skip link for keyboard navigation
      if (typeof createSkipLink === 'function') {
        createSkipLink('main-content');
      }
      
      // Add accessibility styles
      const styleId = 'accessibility-styles';
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      
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
        
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
        
        .high-contrast {
          filter: contrast(150%);
        }
      `;
    } catch (error) {
      console.error('Error applying accessibility settings:', error);
    }

    return () => {
      try {
        // Clean up
        document.documentElement.style.fontSize = '';
        document.documentElement.classList.remove('high-contrast');
        document.body.classList.remove('keyboard-navigation');
        document.documentElement.classList.remove('large-pointer');
        document.documentElement.style.removeProperty('--a11y-line-height');
        document.documentElement.style.removeProperty('--a11y-letter-spacing');
        
        const styleElement = document.getElementById('accessibility-styles');
        if (styleElement) {
          styleElement.remove();
        }
      } catch (error) {
        console.error('Error cleaning up accessibility settings:', error);
      }
    };
  }, [safeSettings]);

  // Create context value
  const contextValue: AccessibilityContextType = {
    settings: safeSettings,
    updateSettings: (key, value) => {
      try {
        setSettings(current => ({ ...current, [key]: value }));
      } catch (error) {
        console.error('Error updating accessibility settings:', error);
      }
    },
    resetSettings: () => {
      try {
        setSettings(defaultSettings);
      } catch (error) {
        console.error('Error resetting accessibility settings:', error);
      }
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
