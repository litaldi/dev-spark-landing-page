
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";

interface MobileNavigationHeaderProps {
  onClose: () => void;
}

export function MobileNavigationHeader({ onClose }: MobileNavigationHeaderProps) {
  return (
    <div className="p-6 border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg ring-2 ring-primary/20" 
            aria-hidden="true"
          >
            D
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">DevAI</h2>
            <p className="text-xs text-muted-foreground">Learning Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AccessibilityMenu />
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-9 w-9 hover:bg-accent/80 transition-colors rounded-lg"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
