
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
  className?: string;
  onDismiss?: () => void;
}

export function FeedbackMessage({ type, message, className, onDismiss }: FeedbackMessageProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    loading: Loader,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    loading: 'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800',
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 border rounded-lg',
        styles[type],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <Icon 
        className={cn(
          'h-5 w-5 flex-shrink-0',
          type === 'loading' && 'animate-spin'
        )} 
        aria-hidden="true" 
      />
      <span className="flex-1 text-sm font-medium">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
          aria-label="Dismiss message"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('text-center py-12 px-4', className)}>
      {Icon && (
        <div className="mx-auto w-16 h-16 mb-4 text-muted-foreground/50">
          <Icon className="w-full h-full" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
