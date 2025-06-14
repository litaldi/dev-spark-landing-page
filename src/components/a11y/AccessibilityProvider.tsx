import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AccessibilitySettings } from '@/components/a11y/AccessibilityMenu';
import { createSkipLink } from '@/lib/keyboard-utils/a11y-helpers';

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

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'accessibility-settings',
    defaultSettings
  );

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

  // Memoized style application for better performance
  const applyAccessibilityStyles = useCallback(() => {
    try {
      // Apply text size
      if (safeSettings.textSize > 0) {
        document.documentElement.style.fontSize = `${safeSettings.textSize}%`;
      }
      
      // Apply high contrast mode
      document.documentElement.classList.toggle('high-contrast', safeSettings.highContrast);
      
      // Apply keyboard navigation mode
      document.body.classList.toggle('keyboard-navigation', safeSettings.keyboardMode);
      
      // Apply large pointer
      document.documentElement.classList.toggle('large-pointer', safeSettings.largePointer);
      
      // Apply line height and letter spacing
      if (safeSettings.lineHeight > 0) {
        document.documentElement.style.setProperty('--a11y-line-height', safeSettings.lineHeight.toString());
      }
      document.documentElement.style.setProperty('--a11y-letter-spacing', `${safeSettings.letterSpacing}px`);
      
      // Create skip link
      createSkipLink('main-content');
      
      // Enhanced accessibility styles
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
          filter: contrast(150%) brightness(1.1);
        }
        
        /* RTL Support */
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .flex {
          flex-direction: row-reverse;
        }
        
        /* Enhanced focus indicators */
        .keyboard-navigation button:focus,
        .keyboard-navigation a:focus,
        .keyboard-navigation input:focus,
        .keyboard-navigation select:focus,
        .keyboard-navigation textarea:focus {
          box-shadow: 0 0 0 3px rgba(64, 156, 255, 0.3) !important;
        }
      `;
    } catch (error) {
      console.error('Error applying accessibility settings:', error);
    }
  }, [safeSettings]);

  useEffect(() => {
    applyAccessibilityStyles();

    return () => {
      try {
        // Cleanup
        document.documentElement.style.fontSize = '';
        document.documentElement.classList.remove('high-contrast', 'large-pointer');
        document.body.classList.remove('keyboard-navigation');
        document.documentElement.style.removeProperty('--a11y-line-height');
        document.documentElement.style.removeProperty('--a11y-letter-spacing');
      } catch (error) {
        console.error('Error cleaning up accessibility settings:', error);
      }
    };
  }, [applyAccessibilityStyles]);

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

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
