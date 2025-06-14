
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAccessibility } from '@/components/a11y/AccessibilityProvider';
import { 
  Accessibility, 
  Eye, 
  Keyboard, 
  MousePointer, 
  Volume2, 
  Contrast,
  Type,
  RotateCcw,
  Settings,
  X
} from 'lucide-react';

interface EnhancedAccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnhancedAccessibilityMenu: React.FC<EnhancedAccessibilityMenuProps> = ({
  isOpen,
  onClose
}) => {
  const { settings, updateSettings, resetSettings } = useAccessibility();

  const accessibilityOptions = [
    {
      id: 'textSize',
      title: 'Text Size',
      description: 'Adjust the text size for better readability',
      icon: <Type className="h-4 w-4" />,
      type: 'slider' as const,
      value: settings.textSize,
      min: 75,
      max: 150,
      step: 5,
      unit: '%'
    },
    {
      id: 'highContrast',
      title: 'High Contrast',
      description: 'Increase contrast for better visibility',
      icon: <Contrast className="h-4 w-4" />,
      type: 'switch' as const,
      value: settings.highContrast
    },
    {
      id: 'keyboardMode',
      title: 'Keyboard Navigation',
      description: 'Enhanced focus indicators for keyboard users',
      icon: <Keyboard className="h-4 w-4" />,
      type: 'switch' as const,
      value: settings.keyboardMode
    },
    {
      id: 'reducedMotion',
      title: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: <Volume2 className="h-4 w-4" />,
      type: 'switch' as const,
      value: settings.reducedMotion
    },
    {
      id: 'largePointer',
      title: 'Large Pointer',
      description: 'Increase cursor size for better visibility',
      icon: <MousePointer className="h-4 w-4" />,
      type: 'switch' as const,
      value: settings.largePointer
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-50 overflow-y-auto"
          >
            <Card className="h-full rounded-none border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Accessibility</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close accessibility menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Quick Actions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Quick Actions</h3>
                    <Badge variant="secondary" className="text-xs">
                      {Object.values(settings).filter(Boolean).length} active
                    </Badge>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSettings}
                    className="w-full justify-start"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset All Settings
                  </Button>
                </div>

                <Separator />

                {/* Accessibility Options */}
                <div className="space-y-6">
                  {accessibilityOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                          {option.icon}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{option.title}</h4>
                            
                            {option.type === 'switch' && (
                              <Switch
                                checked={option.value as boolean}
                                onCheckedChange={(checked) => 
                                  updateSettings(option.id as any, checked)
                                }
                                aria-label={`Toggle ${option.title}`}
                              />
                            )}
                          </div>
                          
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                          
                          {option.type === 'slider' && (
                            <div className="space-y-2">
                              <Slider
                                value={[option.value as number]}
                                onValueChange={([value]) => 
                                  updateSettings(option.id as any, value)
                                }
                                min={option.min}
                                max={option.max}
                                step={option.step}
                                className="w-full"
                                aria-label={`Adjust ${option.title}`}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{option.min}{option.unit}</span>
                                <span className="font-medium">
                                  {option.value}{option.unit}
                                </span>
                                <span>{option.max}{option.unit}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Separator />

                {/* Additional Resources */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Additional Resources</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      Screen Reader Guide
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Keyboard className="h-4 w-4 mr-2" />
                      Keyboard Shortcuts
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Browser Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
