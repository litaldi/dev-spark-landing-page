
import React from 'react';
import { Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        s.className
      )} 
    />
  );
}

interface LoadingPageProps {
  message?: string;
  submessage?: string;
  showProgress?: boolean;
  progress?: number;
}

export function LoadingPage({ 
  message = "Loading...", 
  submessage = "Please wait while we prepare everything for you",
  showProgress = false,
  progress = 0
}: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <div className="p-4 bg-primary/10 rounded-full">
              <div className="relative">
                <Zap className="h-12 w-12 text-primary animate-pulse" />
                <LoadingSpinner 
                  size="lg" 
                  className="absolute -top-1 -right-1 h-6 w-6 text-primary/60" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            {message}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {submessage}
          </p>
        </div>

        {showProgress && (
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.4s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingCard({ 
  title = "Loading content...", 
  description,
  className 
}: LoadingCardProps) {
  return (
    <div className={cn(
      "p-6 border rounded-lg bg-background/50 backdrop-blur-sm",
      "animate-pulse space-y-4",
      className
    )}>
      <div className="flex items-center gap-3">
        <LoadingSpinner size="sm" />
        <div className="space-y-2 flex-1">
          <div className="font-medium text-sm text-foreground">{title}</div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-3 bg-muted rounded w-5/6"></div>
      </div>
    </div>
  );
}
