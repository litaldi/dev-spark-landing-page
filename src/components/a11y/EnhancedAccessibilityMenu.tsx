
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Type, Contrast, Keyboard, RotateCcw, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AccessibilitySettings {
  textSize: number;
  highContrast: boolean;
  keyboardNavigation: boolean;
  reduceMotion: boolean;
  largePointer: boolean;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 100,
  highContrast: false,
  keyboardNavigation: false,
  reduceMotion: false,
  largePointer: false,
};

export const EnhancedAccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('accessibility-settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
        applySettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    }
  }, []);

  // Apply settings to the document
  const applySettings = (newSettings: AccessibilitySettings) => {
    try {
      // Text size
      document.documentElement.style.fontSize = `${newSettings.textSize}%`;
      
      // High contrast
      if (newSettings.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      
      // Keyboard navigation
      if (newSettings.keyboardNavigation) {
        document.body.classList.add('keyboard-navigation');
      } else {
        document.body.classList.remove('keyboard-navigation');
      }
      
      // Reduce motion
      if (newSettings.reduceMotion) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
      
      // Large pointer
      if (newSettings.largePointer) {
        document.documentElement.classList.add('large-pointer');
      } else {
        document.documentElement.classList.remove('large-pointer');
      }
    } catch (error) {
      console.error('Error applying accessibility settings:', error);
    }
  };

  // Save settings to localStorage and apply them
  const saveSettings = () => {
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      applySettings(settings);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
    }
  };

  // Update a specific setting
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  // Reset all settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
    setHasUnsavedChanges(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <Settings className="h-4 w-4" />
        {hasUnsavedChanges && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </Button>

      {/* Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 z-50"
          >
            <Card className="border shadow-xl bg-background/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Accessibility Settings
                  </CardTitle>
                  {hasUnsavedChanges && (
                    <Badge variant="secondary" className="text-xs">
                      Unsaved
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Text Size Control */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Text Size
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {settings.textSize}%
                    </span>
                  </div>
                  <Slider
                    value={[settings.textSize]}
                    onValueChange={([value]) => updateSetting('textSize', value)}
                    min={75}
                    max={150}
                    step={5}
                    className="w-full"
                    aria-label="Adjust text size"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Small</span>
                    <span>Normal</span>
                    <span>Large</span>
                  </div>
                </div>

                <Separator />

                {/* Toggle Settings */}
                <div className="space-y-4">
                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <Contrast className="h-4 w-4" />
                      High Contrast Mode
                    </label>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                      aria-label="Toggle high contrast mode"
                    />
                  </div>

                  {/* Keyboard Navigation */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <Keyboard className="h-4 w-4" />
                      Enhanced Focus
                    </label>
                    <Switch
                      checked={settings.keyboardNavigation}
                      onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                      aria-label="Toggle keyboard navigation mode"
                    />
                  </div>

                  {/* Reduce Motion */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <RotateCcw className="h-4 w-4" />
                      Reduce Motion
                    </label>
                    <Switch
                      checked={settings.reduceMotion}
                      onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
                      aria-label="Toggle reduced motion"
                    />
                  </div>

                  {/* Large Pointer */}
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                      <span className="w-4 h-4 rounded-full border-2 border-current" />
                      Large Pointer
                    </label>
                    <Switch
                      checked={settings.largePointer}
                      onCheckedChange={(checked) => updateSetting('largePointer', checked)}
                      aria-label="Toggle large pointer"
                    />
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={saveSettings}
                    disabled={!hasUnsavedChanges}
                    size="sm"
                    className="flex-1 flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    {hasUnsavedChanges ? 'Save Changes' : 'Saved'}
                  </Button>
                  
                  <Button
                    onClick={resetSettings}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium mb-1">About these settings:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Text Size: Adjusts font sizes across the entire application</li>
                    <li>• High Contrast: Increases color contrast for better visibility</li>
                    <li>• Enhanced Focus: Shows clearer focus indicators when navigating with keyboard</li>
                    <li>• Reduce Motion: Minimizes animations and transitions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
