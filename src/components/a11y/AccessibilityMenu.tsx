
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
  textSize: 100, // 100%
  highContrast: false,
  keyboardMode: false,
  reducedMotion: false,
  largePointer: false,
  lineHeight: 1.5, // Default line height
  letterSpacing: 0, // Default letter spacing
};

export function AccessibilityMenu() {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    "accessibility-settings",
    defaultSettings
  );
  const [isOpen, setIsOpen] = useState(false);

  // Apply settings on component mount and when they change
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
    
    // Apply reduced motion
    applyReducedMotionStyles(settings.reducedMotion);
    
    // Apply large pointer
    if (settings.largePointer) {
      document.documentElement.classList.add('large-pointer');
    } else {
      document.documentElement.classList.remove('large-pointer');
    }
    
    // Apply line height - Fix: Safely handle line height with null check
    if (settings.lineHeight !== undefined && settings.lineHeight !== null) {
      document.documentElement.style.setProperty('--a11y-line-height', settings.lineHeight.toString());
    }
    
    // Apply letter spacing - Fix: Safely handle letter spacing with null check
    if (settings.letterSpacing !== undefined && settings.letterSpacing !== null) {
      document.documentElement.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);
    }
    
    return () => {
      // Clean up if component unmounts
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('keyboard-navigation');
      document.documentElement.classList.remove('large-pointer');
      document.documentElement.style.removeProperty('--a11y-line-height');
      document.documentElement.style.removeProperty('--a11y-letter-spacing');
    };
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
    
    // Announce the change to screen readers
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
    
    announceToScreenReader(message, 'polite');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      announceToScreenReader('Accessibility menu opened', 'polite');
    } else {
      announceToScreenReader('Accessibility menu closed', 'polite');
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full" 
          aria-label="Accessibility options"
        >
          <Accessibility className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Accessibility Settings</h4>
            <p className="text-xs text-muted-foreground">
              Customize your experience to improve accessibility.
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" aria-hidden="true" />
                  <Label htmlFor="text-size">Text Size: {settings.textSize}%</Label>
                </div>
              </div>
              <Slider 
                id="text-size"
                min={75}
                max={200}
                step={5}
                value={[settings.textSize]}
                onValueChange={(values) => updateSetting("textSize", values[0])}
                aria-label="Adjust text size"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
                  <Label htmlFor="letter-spacing">Letter Spacing: {settings.letterSpacing}</Label>
                </div>
              </div>
              <Slider 
                id="letter-spacing"
                min={0}
                max={5}
                step={0.5}
                value={[settings.letterSpacing]}
                onValueChange={(values) => updateSetting("letterSpacing", values[0])}
                aria-label="Adjust letter spacing"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="high-contrast"
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                aria-label="Toggle high contrast mode"
              />
              <div className="grid gap-1">
                <Label htmlFor="high-contrast" className="flex items-center gap-2">
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
                checked={settings.keyboardMode}
                onCheckedChange={(checked) => updateSetting("keyboardMode", checked)}
                aria-label="Toggle keyboard navigation mode"
              />
              <div className="grid gap-1">
                <Label htmlFor="keyboard-mode" className="flex items-center gap-2">
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
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                aria-label="Toggle reduced motion"
              />
              <div className="grid gap-1">
                <Label htmlFor="reduced-motion" className="flex items-center gap-2">
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
                checked={settings.largePointer}
                onCheckedChange={(checked) => updateSetting("largePointer", checked)}
                aria-label="Toggle large pointer"
              />
              <div className="grid gap-1">
                <Label htmlFor="large-pointer" className="flex items-center gap-2">
                  <MousePointer className="h-4 w-4" aria-hidden="true" />
                  Large Pointer
                </Label>
                <p className="text-xs text-muted-foreground">
                  Increases cursor size for better visibility.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            <p>Press <kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Tab</kbd> to navigate and <kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Space</kbd> or <kbd className="px-1 py-0.5 bg-muted border rounded text-xs">Enter</kbd> to toggle options.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
