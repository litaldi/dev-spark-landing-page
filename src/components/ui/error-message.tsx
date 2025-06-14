
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
  variant?: 'default' | 'destructive';
}

export function ErrorMessage({ message, className, variant = 'destructive' }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-3 rounded-md border text-sm',
        variant === 'destructive' 
          ? 'bg-destructive/10 border-destructive/20 text-destructive' 
          : 'bg-muted border-border text-foreground',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
