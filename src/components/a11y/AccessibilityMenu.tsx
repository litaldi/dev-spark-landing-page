
import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accessibility,
  Type,
  Keyboard,
  Contrast,
  MousePointer,
  MoveHorizontal,
  Sparkles
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { announceToScreenReader } from "@/lib/keyboard-utils";
import { applyReducedMotionStyles } from "@/lib/motion-utils";

export type AccessibilitySettings = {
  textSize: number;
  highContrast: boolean;
  keyboardMode: boolean;
  reducedMotion: boolean;
  largePointer: boolean;
  lineHeight: number;
  letterSpacing: number;
};

const defaultSettings: AccessibilitySettings = {
  textSize: 100,
  highContrast: false,
  keyboardMode: false,
  reducedMotion: false,
  largePointer: false,
  lineHeight: 1.5,
  letterSpacing: 0,
};

export function AccessibilityMenu() {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    "accessibility-settings",
    defaultSettings
  );
  const [isOpen, setIsOpen] = useState(false);

  // Ensure settings have safe defaults and proper types
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

  useEffect(() => {
    try {
      // Apply text size safely
      if (typeof safeSettings.textSize === 'number' && safeSettings.textSize > 0) {
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
      
      // Apply reduced motion
      if (typeof applyReducedMotionStyles === 'function') {
        applyReducedMotionStyles(safeSettings.reducedMotion);
      }
      
      // Apply large pointer
      if (safeSettings.largePointer) {
        document.documentElement.classList.add('large-pointer');
      } else {
        document.documentElement.classList.remove('large-pointer');
      }
      
      // Apply line height safely
      if (typeof safeSettings.lineHeight === 'number' && safeSettings.lineHeight > 0) {
        document.documentElement.style.setProperty('--a11y-line-height', safeSettings.lineHeight.toString());
      }
      
      // Apply letter spacing safely
      if (typeof safeSettings.letterSpacing === 'number') {
        document.documentElement.style.setProperty('--a11y-letter-spacing', `${safeSettings.letterSpacing}px`);
      }
    } catch (error) {
      console.error('Error applying accessibility settings:', error);
    }
    
    return () => {
      try {
        // Clean up styles
        document.documentElement.style.fontSize = '';
        document.documentElement.classList.remove('high-contrast');
        document.body.classList.remove('keyboard-navigation');
        document.documentElement.classList.remove('large-pointer');
        document.documentElement.style.removeProperty('--a11y-line-height');
        document.documentElement.style.removeProperty('--a11y-letter-spacing');
      } catch (error) {
        console.error('Error cleaning up accessibility settings:', error);
      }
    };
  }, [safeSettings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    try {
      const newSettings = { ...safeSettings, [key]: value };
      setSettings(newSettings);
      
      // Announce changes to screen readers
      let message = '';
      
      switch (key) {
        case 'textSize':
          message = `Text size set to ${value}%`;
          break;
        case 'highContrast':
          message = value ? 'High contrast mode enabled' : 'High contrast mode disabled';
          break;
        case 'keyboardMode':
          message = value ? 'Keyboard navigation mode enabled' : 'Keyboard navigation mode disabled';
          break;
        case 'reducedMotion':
          message = value ? 'Reduced motion mode enabled' : 'Reduced motion mode disabled';
          break;
        case 'largePointer':
          message = value ? 'Large pointer enabled' : 'Large pointer disabled';
          break;
        case 'lineHeight':
          message = `Line height set to ${value}`;
          break;
        case 'letterSpacing':
          message = `Letter spacing set to ${value}`;
          break;
        default:
          message = 'Accessibility setting updated';
      }
      
      if (typeof announceToScreenReader === 'function') {
        announceToScreenReader(message, 'polite');
      }
    } catch (error) {
      console.error('Error updating accessibility setting:', error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    try {
      if (open) {
        if (typeof announceToScreenReader === 'function') {
          announceToScreenReader('Accessibility menu opened', 'polite');
        }
      } else {
        if (typeof announceToScreenReader === 'function') {
          announceToScreenReader('Accessibility menu closed', 'polite');
        }
      }
    } catch (error) {
      console.error('Error announcing menu state:', error);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full hover:bg-accent/80 focus:ring-2 focus:ring-primary focus:ring-offset-2" 
          aria-label="Open accessibility options"
        >
          <Accessibility className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 bg-popover border shadow-lg z-50" 
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              Accessibility Settings
            </h4>
            <p className="text-xs text-muted-foreground">
              Customize your experience to improve accessibility and usability.
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" aria-hidden="true" />
                  <Label htmlFor="text-size">Text Size: {safeSettings.textSize}%</Label>
                </div>
              </div>
              <Slider 
                id="text-size"
                min={75}
                max={200}
                step={5}
                value={[safeSettings.textSize]}
                onValueChange={(values) => updateSetting("textSize", values[0] || 100)}
                className="cursor-pointer"
                aria-label="Adjust text size"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
                  <Label htmlFor="letter-spacing">Letter Spacing: {safeSettings.letterSpacing}px</Label>
                </div>
              </div>
              <Slider 
                id="letter-spacing"
                min={0}
                max={5}
                step={0.5}
                value={[safeSettings.letterSpacing]}
                onValueChange={(values) => updateSetting("letterSpacing", values[0] || 0)}
                className="cursor-pointer"
                aria-label="Adjust letter spacing"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="high-contrast"
                checked={safeSettings.highContrast}
                onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                aria-label="Toggle high contrast mode"
              />
              <div className="grid gap-1 flex-1">
                <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
                  <Contrast className="h-4 w-4" aria-hidden="true" />
                  High Contrast
                </Label>
                <p className="text-xs text-muted-foreground">
                  Increases color contrast for better readability.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="keyboard-mode"
                checked={safeSettings.keyboardMode}
                onCheckedChange={(checked) => updateSetting("keyboardMode", checked)}
                aria-label="Toggle keyboard navigation mode"
              />
              <div className="grid gap-1 flex-1">
                <Label htmlFor="keyboard-mode" className="flex items-center gap-2 cursor-pointer">
                  <Keyboard className="h-4 w-4" aria-hidden="true" />
                  Keyboard Navigation
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enhanced focus visibility for keyboard users.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="reduced-motion"
                checked={safeSettings.reducedMotion}
                onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                aria-label="Toggle reduced motion"
              />
              <div className="grid gap-1 flex-1">
                <Label htmlFor="reduced-motion" className="flex items-center gap-2 cursor-pointer">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Reduced Motion
                </Label>
                <p className="text-xs text-muted-foreground">
                  Minimizes animations and transitions.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="large-pointer"
                checked={safeSettings.largePointer}
                onCheckedChange={(checked) => updateSetting("largePointer", checked)}
                aria-label="Toggle large pointer"
              />
              <div className="grid gap-1 flex-1">
                <Label htmlFor="large-pointer" className="flex items-center gap-2 cursor-pointer">
                  <MousePointer className="h-4 w-4" aria-hidden="true" />
                  Large Pointer
                </Label>
                <p className="text-xs text-muted-foreground">
                  Increases cursor size for better visibility.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-3 text-xs text-muted-foreground">
            <p className="mb-2">Keyboard shortcuts:</p>
            <div className="space-y-1">
              <p><kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Tab</kbd> - Navigate options</p>
              <p><kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Space</kbd> - Toggle switches</p>
              <p><kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Esc</kbd> - Close menu</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
