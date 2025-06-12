
import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner = ({ size = 'md', text, className }: { 
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = {
    sm: 'gap-2 text-sm',
    md: 'gap-3 text-base',
    lg: 'gap-4 text-lg'
  };

  return (
    <div className={cn(
      'flex items-center justify-center',
      containerClasses[size],
      className
    )}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      {text && (
        <span className="text-muted-foreground font-medium">
          {text}
        </span>
      )}
    </div>
  );
};

export const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  fallback,
  className,
  size = 'md',
  text = 'Loading...'
}) => {
  const defaultFallback = (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <LoadingSpinner size={size} text={text} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

export const PageLoadingBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LoadingBoundary
      className="min-h-[50vh]"
      size="lg"
      text="Loading page..."
    >
      {children}
    </LoadingBoundary>
  );
};

export const ComponentLoadingBoundary: React.FC<{ 
  children: React.ReactNode;
  text?: string;
}> = ({ children, text = 'Loading component...' }) => {
  return (
    <LoadingBoundary
      className="min-h-[200px]"
      size="md"
      text={text}
    >
      {children}
    </LoadingBoundary>
  );
};
