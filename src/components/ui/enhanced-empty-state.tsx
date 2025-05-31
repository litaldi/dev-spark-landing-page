
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  illustration?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const EnhancedEmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  secondaryAction,
  illustration,
  className,
  size = "md"
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: {
      container: "p-6",
      icon: "h-6 w-6",
      iconContainer: "p-3",
      title: "text-lg",
      description: "text-sm"
    },
    md: {
      container: "p-8",
      icon: "h-8 w-8", 
      iconContainer: "p-4",
      title: "text-xl",
      description: "text-base"
    },
    lg: {
      container: "p-12",
      icon: "h-10 w-10",
      iconContainer: "p-6", 
      title: "text-2xl",
      description: "text-lg"
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <Card className={cn(currentSize.container, "text-center border-dashed", className)}>
      <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
        {illustration || (
          <div className={cn(
            "bg-muted/50 rounded-full flex items-center justify-center",
            currentSize.iconContainer
          )}>
            <Icon className={cn("text-muted-foreground", currentSize.icon)} />
          </div>
        )}
        
        <div className="space-y-2 text-center">
          <h3 className={cn(
            "font-semibold text-foreground tracking-tight",
            currentSize.title
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            currentSize.description
          )}>
            {description}
          </p>
        </div>
        
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full sm:w-auto">
            {action && (
              <Button 
                onClick={action.onClick} 
                variant={action.variant || "default"}
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button 
                onClick={secondaryAction.onClick} 
                variant="outline"
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
