
import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, XCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface FeedbackOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

const feedbackConfig = {
  success: {
    icon: CheckCircle,
    className: 'text-green-600 dark:text-green-400',
    defaultDuration: 4000
  },
  error: {
    icon: XCircle,
    className: 'text-red-600 dark:text-red-400',
    defaultDuration: 6000
  },
  warning: {
    icon: AlertCircle,
    className: 'text-yellow-600 dark:text-yellow-400',
    defaultDuration: 5000
  },
  info: {
    icon: Info,
    className: 'text-blue-600 dark:text-blue-400',
    defaultDuration: 4000
  },
  loading: {
    icon: Loader2,
    className: 'text-gray-600 dark:text-gray-400 animate-spin',
    defaultDuration: Infinity
  }
};

export function showFeedback(
  type: FeedbackType,
  message: string,
  options: FeedbackOptions = {}
) {
  const config = feedbackConfig[type];
  const Icon = config.icon;
  
  const duration = options.duration ?? config.defaultDuration;
  
  return toast(message, {
    duration: duration,
    icon: <Icon className={cn('h-4 w-4', config.className)} />,
    description: options.description,
    action: options.action ? {
      label: options.action.label,
      onClick: options.action.onClick
    } : undefined,
    dismissible: options.dismissible ?? true,
    className: 'border shadow-lg',
  });
}

// Convenience functions
export const feedback = {
  success: (message: string, options?: FeedbackOptions) =>
    showFeedback('success', message, options),
    
  error: (message: string, options?: FeedbackOptions) =>
    showFeedback('error', message, options),
    
  warning: (message: string, options?: FeedbackOptions) =>
    showFeedback('warning', message, options),
    
  info: (message: string, options?: FeedbackOptions) =>
    showFeedback('info', message, options),
    
  loading: (message: string, options?: FeedbackOptions) =>
    showFeedback('loading', message, options),
    
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) =>
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    })
};

// Form feedback component for inline validation
interface FormFeedbackProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  className?: string;
}

export function FormFeedback({ type, message, className }: FormFeedbackProps) {
  const config = feedbackConfig[type];
  const Icon = config.icon;
  
  return (
    <div className={cn(
      'flex items-center gap-2 text-sm p-3 rounded-md border',
      type === 'success' && 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
      type === 'error' && 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
      type === 'warning' && 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
      className
    )}>
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
