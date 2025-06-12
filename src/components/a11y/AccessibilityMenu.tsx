
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Accessibility, 
  Type, 
  Eye, 
  MousePointer,
  Palette,
  Volume2
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState([100]);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState('none');

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value);
    document.documentElement.style.fontSize = `${value[0]}%`;
  };

  const handleHighContrastToggle = (enabled: boolean) => {
    setHighContrast(enabled);
    document.documentElement.classList.toggle('high-contrast', enabled);
  };

  const handleReducedMotionToggle = (enabled: boolean) => {
    setReducedMotion(enabled);
    document.documentElement.classList.toggle('reduce-motion', enabled);
  };

  const handleKeyboardNavToggle = (enabled: boolean) => {
    setKeyboardNav(enabled);
    document.documentElement.classList.toggle('keyboard-navigation', enabled);
  };

  const handleColorBlindModeChange = (mode: string) => {
    setColorBlindMode(mode);
    // Remove all color blind classes
    document.documentElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (mode !== 'none') {
      document.documentElement.classList.add(mode);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          aria-label="Accessibility options"
          className="relative"
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Accessibility className="h-5 w-5" />
              Accessibility Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <Label className="text-sm font-medium">Font Size: {fontSize[0]}%</Label>
              </div>
              <Slider
                value={fontSize}
                onValueChange={handleFontSizeChange}
                max={150}
                min={75}
                step={25}
                className="w-full"
              />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <Label htmlFor="high-contrast" className="text-sm font-medium">
                  High Contrast
                </Label>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={handleHighContrastToggle}
              />
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                <Label htmlFor="reduced-motion" className="text-sm font-medium">
                  Reduced Motion
                </Label>
              </div>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={handleReducedMotionToggle}
              />
            </div>

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Label htmlFor="keyboard-nav" className="text-sm font-medium">
                  Enhanced Focus
                </Label>
              </div>
              <Switch
                id="keyboard-nav"
                checked={keyboardNav}
                onCheckedChange={handleKeyboardNavToggle}
              />
            </div>

            {/* Color Blind Support */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <Label className="text-sm font-medium">Color Blind Support</Label>
              </div>
              <select
                value={colorBlindMode}
                onChange={(e) => handleColorBlindModeChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input rounded-md bg-background"
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="tritanopia">Tritanopia</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
