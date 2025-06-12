
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Accessibility, 
  Eye, 
  Volume2, 
  Keyboard, 
  Monitor, 
  Sun, 
  Moon, 
  Languages,
  Type,
  Contrast,
  MousePointer
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  language: string;
  direction: 'ltr' | 'rtl';
  theme: 'light' | 'dark' | 'system';
  cursorSize: number;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReaderMode: false,
  keyboardNavigation: true,
  colorBlindMode: 'none',
  language: 'en',
  direction: 'ltr',
  theme: 'system',
  cursorSize: 1,
};

export const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Apply settings to document
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}px`;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Direction
    root.dir = settings.direction;
    
    // Color blind mode
    root.className = root.className.replace(/colorblind-\w+/g, '');
    if (settings.colorBlindMode !== 'none') {
      root.classList.add(`colorblind-${settings.colorBlindMode}`);
    }
    
    // Cursor size
    root.style.setProperty('--cursor-scale', settings.cursorSize.toString());
    
    // Keyboard navigation indicators
    if (settings.keyboardNavigation) {
      root.classList.add('keyboard-navigation');
    } else {
      root.classList.remove('keyboard-navigation');
    }
    
    // Theme
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
    
    // Save settings
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  const announceChange = (message: string) => {
    // Create or update ARIA live region for announcements
    let announcer = document.getElementById('a11y-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  };

  return (
    <>
      {/* Accessibility Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 shadow-lg"
        aria-label={`${isOpen ? 'Close' : 'Open'} accessibility controls`}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 right-4 z-50 w-80 max-h-96 overflow-y-auto"
          >
            <Card id="accessibility-panel" className="shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Accessibility className="h-5 w-5" />
                  Accessibility Controls
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Font Size */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Font Size: {settings.fontSize}px
                  </Label>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) => {
                      updateSetting('fontSize', value);
                      announceChange(`Font size changed to ${value} pixels`);
                    }}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                    aria-label="Adjust font size"
                  />
                </div>

                {/* Theme */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Theme
                  </Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value: 'light' | 'dark' | 'system') => {
                      updateSetting('theme', value);
                      announceChange(`Theme changed to ${value}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-3 w-3" />
                          System
                        </div>
                      </SelectItem>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-3 w-3" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-3 w-3" />
                          Dark
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language & Direction */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Language
                    </Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => {
                        updateSetting('language', value);
                        // Auto-set RTL for Hebrew and Arabic
                        if (value === 'he' || value === 'ar') {
                          updateSetting('direction', 'rtl');
                        } else {
                          updateSetting('direction', 'ltr');
                        }
                        announceChange(`Language changed to ${value}`);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="he">עברית (Hebrew)</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <Select
                      value={settings.direction}
                      onValueChange={(value: 'ltr' | 'rtl') => {
                        updateSetting('direction', value);
                        announceChange(`Text direction changed to ${value === 'rtl' ? 'right-to-left' : 'left-to-right'}`);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ltr">LTR</SelectItem>
                        <SelectItem value="rtl">RTL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Accessibility Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Contrast className="h-4 w-4" />
                      High Contrast
                    </Label>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => {
                        updateSetting('highContrast', checked);
                        announceChange(`High contrast ${checked ? 'enabled' : 'disabled'}`);
                      }}
                      aria-label="Toggle high contrast mode"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Reduce Motion
                    </Label>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => {
                        updateSetting('reducedMotion', checked);
                        announceChange(`Reduced motion ${checked ? 'enabled' : 'disabled'}`);
                      }}
                      aria-label="Toggle reduced motion"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      Keyboard Navigation
                    </Label>
                    <Switch
                      checked={settings.keyboardNavigation}
                      onCheckedChange={(checked) => {
                        updateSetting('keyboardNavigation', checked);
                        announceChange(`Keyboard navigation ${checked ? 'enabled' : 'disabled'}`);
                      }}
                      aria-label="Toggle enhanced keyboard navigation"
                    />
                  </div>
                </div>

                {/* Color Blind Support */}
                <div className="space-y-2">
                  <Label>Color Blind Support</Label>
                  <Select
                    value={settings.colorBlindMode}
                    onValueChange={(value: AccessibilitySettings['colorBlindMode']) => {
                      updateSetting('colorBlindMode', value);
                      announceChange(`Color blind mode set to ${value === 'none' ? 'none' : value}`);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="protanopia">Protanopia</SelectItem>
                      <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                      <SelectItem value="tritanopia">Tritanopia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cursor Size */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Cursor Size: {settings.cursorSize}x
                  </Label>
                  <Slider
                    value={[settings.cursorSize]}
                    onValueChange={([value]) => {
                      updateSetting('cursorSize', value);
                      announceChange(`Cursor size changed to ${value}x`);
                    }}
                    min={1}
                    max={3}
                    step={0.5}
                    className="w-full"
                    aria-label="Adjust cursor size"
                  />
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    resetSettings();
                    announceChange('Accessibility settings reset to defaults');
                  }}
                  className="w-full"
                >
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen reader announcer */}
      <div id="a11y-announcer" aria-live="polite" aria-atomic="true" className="sr-only" />
    </>
  );
};
