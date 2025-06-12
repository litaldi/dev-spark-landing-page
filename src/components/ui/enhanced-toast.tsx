
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  title: string;
  description?: string;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
    iconClassName: 'text-green-600 dark:text-green-400'
  },
  error: {
    icon: XCircle,
    className: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
    iconClassName: 'text-red-600 dark:text-red-400'
  },
  warning: {
    icon: AlertCircle,
    className: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
    iconClassName: 'text-yellow-600 dark:text-yellow-400'
  },
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
    iconClassName: 'text-blue-600 dark:text-blue-400'
  }
};

export const EnhancedToast: React.FC<ToastProps> = ({
  type,
  title,
  description,
  onClose,
  action,
  className
}) => {
  const config = toastConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg transition-all duration-300',
        'animate-in slide-in-from-top-2 fade-in-0',
        config.className,
        className
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', config.iconClassName)} aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{title}</p>
            {description && (
              <p className="mt-1 text-sm opacity-90">{description}</p>
            )}
            {action && (
              <div className="mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={action.onClick}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              </div>
            )}
          </div>
          {onClose && (
            <div className="ml-4 flex flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md opacity-70 hover:opacity-100"
                onClick={onClose}
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for using enhanced toasts
export const useEnhancedToast = () => {
  const showToast = (toast: Omit<ToastProps, 'onClose'>) => {
    // This would integrate with your toast provider
    // For now, we'll use a simple implementation
    console.log('Toast:', toast);
    
    // In a real implementation, you'd dispatch to a toast context
    // Example: dispatch({ type: 'ADD_TOAST', payload: toast });
  };

  return {
    success: (title: string, description?: string, action?) => 
      showToast({ type: 'success', title, description, action }),
    error: (title: string, description?: string, action?) => 
      showToast({ type: 'error', title, description, action }),
    warning: (title: string, description?: string, action?) => 
      showToast({ type: 'warning', title, description, action }),
    info: (title: string, description?: string, action?) => 
      showToast({ type: 'info', title, description, action })
  };
};
