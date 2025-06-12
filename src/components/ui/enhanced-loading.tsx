
import React from 'react';
import { Loader2, Zap, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  'aria-label': ariaLabel = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )}
      aria-label={ariaLabel}
      role="status"
    />
  );
}

interface LoadingPageProps {
  message?: string;
  submessage?: string;
  showProgress?: boolean;
  progress?: number;
  error?: boolean;
  onRetry?: () => void;
}

export function LoadingPage({ 
  message = "Loading...", 
  submessage = "Please wait while we prepare everything for you",
  showProgress = false,
  progress = 0,
  error = false,
  onRetry
}: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <div className="flex justify-center">
          <div className="relative">
            <div className={cn(
              "p-4 rounded-full transition-colors duration-300",
              error ? "bg-destructive/10" : "bg-primary/10"
            )}>
              <div className="relative">
                {error ? (
                  <AlertCircle className="h-12 w-12 text-destructive animate-pulse" />
                ) : (
                  <>
                    <Zap className="h-12 w-12 text-primary animate-pulse" />
                    <LoadingSpinner 
                      size="lg" 
                      className="absolute -top-1 -right-1 h-6 w-6 text-primary/60" 
                    />
                  </>
                )}
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

        {showProgress && !error && (
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        )}

        {error && onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try Again
          </button>
        )}

        {!error && (
          <div className="flex justify-center space-x-1" aria-hidden="true">
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
        )}
      </div>
    </div>
  );
}

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export function LoadingCard({ 
  title = "Loading content...", 
  description,
  className,
  variant = 'default'
}: LoadingCardProps) {
  return (
    <div className={cn(
      "border rounded-lg bg-background/50 backdrop-blur-sm animate-fade-in",
      variant === 'compact' ? "p-4 space-y-3" : "p-6 space-y-4",
      className
    )}>
      <div className="flex items-center gap-3">
        <LoadingSpinner size="sm" />
        <div className="space-y-1 flex-1">
          <div className="font-medium text-sm text-foreground">{title}</div>
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded animate-pulse" style={{ width: '75%' }}></div>
        <div className="h-3 bg-muted rounded animate-pulse" style={{ width: '50%' }}></div>
        <div className="h-3 bg-muted rounded animate-pulse" style={{ width: '83%' }}></div>
      </div>
    </div>
  );
}

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({ lines = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}
