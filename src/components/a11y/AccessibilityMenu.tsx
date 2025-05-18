
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
  TextSize,
  Keyboard,
  Contrast
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export type AccessibilitySettings = {
  textSize: number;
  highContrast: boolean;
  keyboardMode: boolean;
};

const defaultSettings: AccessibilitySettings = {
  textSize: 100, // 100%
  highContrast: false,
  keyboardMode: false,
};

export function AccessibilityMenu() {
  const [settings, setSettings] = useLocalStorage<AccessibilitySettings>(
    "accessibility-settings",
    defaultSettings
  );

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
    
    return () => {
      // Clean up if component unmounts
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('keyboard-navigation');
    };
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <Popover>
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
                  <TextSize className="h-4 w-4" />
                  <Label htmlFor="text-size">Text Size: {settings.textSize}%</Label>
                </div>
              </div>
              <Slider 
                id="text-size"
                min={75}
                max={150}
                step={5}
                value={[settings.textSize]}
                onValueChange={(values) => updateSetting("textSize", values[0])}
                aria-label="Adjust text size"
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
                  <Contrast className="h-4 w-4" />
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
                  <Keyboard className="h-4 w-4" />
                  Keyboard Navigation
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enhanced focus visibility for keyboard users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
