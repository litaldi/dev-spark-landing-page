
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accessibility, Eye, Type, Contrast, Keyboard, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  colorBlindMode: string;
  screenReaderMode: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  keyboardNavigation: false,
  colorBlindMode: 'none',
  screenReaderMode: false
};

export const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    'accessibility-settings',
    defaultSettings
  );

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.fontSize = `${settings.fontSize}%`;
    
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
    
    // Keyboard navigation
    if (settings.keyboardNavigation) {
      document.body.classList.add('keyboard-navigation');
    } else {
      document.body.classList.remove('keyboard-navigation');
    }
    
    // Color blind mode
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (settings.colorBlindMode !== 'none') {
      root.classList.add(settings.colorBlindMode);
    }
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-16 z-50 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Open accessibility options"
      >
        <Accessibility className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Accessibility className="h-5 w-5" />
                    Accessibility Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Font Size */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Text Size: {settings.fontSize}%
                    </Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => updateSetting('fontSize', value[0])}
                      min={75}
                      max={150}
                      step={5}
                      className="w-full"
                      aria-label="Adjust text size"
                    />
                  </div>

                  {/* High Contrast */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="flex items-center gap-2">
                      <Contrast className="h-4 w-4" />
                      High Contrast Mode
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                      aria-label="Toggle high contrast mode"
                    />
                  </div>

                  {/* Reduced Motion */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Reduce Motion
                    </Label>
                    <Switch
                      id="reduced-motion"
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                      aria-label="Toggle reduced motion"
                    />
                  </div>

                  {/* Keyboard Navigation */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="keyboard-nav" className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      Enhanced Keyboard Navigation
                    </Label>
                    <Switch
                      id="keyboard-nav"
                      checked={settings.keyboardNavigation}
                      onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                      aria-label="Toggle keyboard navigation mode"
                    />
                  </div>

                  {/* Color Blind Support */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Color Blind Support
                    </Label>
                    <Select
                      value={settings.colorBlindMode}
                      onValueChange={(value) => updateSetting('colorBlindMode', value)}
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

                  {/* Screen Reader Mode */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="screen-reader" className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Screen Reader Optimized
                    </Label>
                    <Switch
                      id="screen-reader"
                      checked={settings.screenReaderMode}
                      onCheckedChange={(checked) => updateSetting('screenReaderMode', checked)}
                      aria-label="Toggle screen reader optimization"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button onClick={resetSettings} variant="outline" className="flex-1">
                      Reset
                    </Button>
                    <Button onClick={() => setIsOpen(false)} className="flex-1">
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
