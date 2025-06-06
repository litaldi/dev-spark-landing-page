
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
  variant?: "default" | "encouraging" | "motivational";
}

export const EnhancedEmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  action,
  secondaryAction,
  illustration,
  className,
  size = "md",
  variant = "default"
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: {
      container: "p-6",
      icon: "h-8 w-8",
      iconContainer: "p-3",
      title: "text-lg",
      description: "text-sm"
    },
    md: {
      container: "p-8",
      icon: "h-12 w-12", 
      iconContainer: "p-4",
      title: "text-xl",
      description: "text-base"
    },
    lg: {
      container: "p-12",
      icon: "h-16 w-16",
      iconContainer: "p-6", 
      title: "text-2xl",
      description: "text-lg"
    }
  };

  const variantStyles = {
    default: {
      background: "bg-muted/30",
      iconBg: "bg-muted/50",
      iconColor: "text-muted-foreground"
    },
    encouraging: {
      background: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
      iconBg: "bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    motivational: {
      background: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
      iconBg: "bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50",
      iconColor: "text-green-600 dark:text-green-400"
    }
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className={cn(
        currentSize.container, 
        "text-center border-dashed relative overflow-hidden",
        currentVariant.background,
        className
      )}>
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-current rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-current rounded-full translate-x-12 translate-y-12" />
        </div>

        <div className="relative flex flex-col items-center space-y-6 max-w-md mx-auto">
          {illustration || (
            <motion.div 
              className={cn(
                "rounded-full flex items-center justify-center relative",
                currentSize.iconContainer,
                currentVariant.iconBg
              )}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className={cn(currentSize.icon, currentVariant.iconColor)} />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-current opacity-20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.1, 0.2]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
          
          <motion.div 
            className="space-y-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
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
          </motion.div>
          
          {(action || secondaryAction) && (
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {action && (
                <Button 
                  onClick={action.onClick} 
                  variant={action.variant || "default"}
                  className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
                >
                  {action.label}
                </Button>
              )}
              {secondaryAction && (
                <Button 
                  onClick={secondaryAction.onClick} 
                  variant="outline"
                  className="w-full sm:w-auto transition-all duration-200 hover:scale-105"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
