
import React, { useEffect, useRef } from 'react';
import { announceToScreenReader } from '@/lib/keyboard-utils/a11y-helpers';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormErrorProps {
  id: string;
  error?: string | null;
  children?: React.ReactNode;
  autoAnnounce?: boolean;
  className?: string;
  icon?: boolean;
}

/**
 * An enhanced component that displays form errors with proper ARIA attributes
 * and announces errors to screen readers
 */
export function FormError({
  id,
  error,
  children,
  autoAnnounce = true,
  className,
  icon = true
}: FormErrorProps) {
  const prevErrorRef = useRef<string | null | undefined>(null);
  
  // Announce error to screen readers when it appears or changes
  useEffect(() => {
    if (error && autoAnnounce && error !== prevErrorRef.current) {
      announceToScreenReader(`Error: ${error}`, 'assertive');
      prevErrorRef.current = error;
    }
  }, [error, autoAnnounce]);
  
  if (!error && !children) {
    return null;
  }
  
  return (
    <div 
      id={id}
      role="alert"
      aria-live="assertive"
      className={cn(
        "form-error-message text-destructive text-sm mt-1 flex items-center gap-1.5 transition-opacity animate-fade-in",
        className
      )}
    >
      {icon && <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />}
      <span>{error || children}</span>
    </div>
  );
}

/**
 * Hook that helps manage form errors and announcements
 */
export function useFormErrorAnnouncement() {
  const [announcedErrors, setAnnouncedErrors] = React.useState<string[]>([]);
  
  const announceFormErrors = React.useCallback((errors: Record<string, string>) => {
    // Get all error messages
    const errorMessages = Object.values(errors);
    
    // Filter out errors that have already been announced
    const newErrors = errorMessages.filter(err => !announcedErrors.includes(err));
    
    // If there are new errors, announce them
    if (newErrors.length > 0) {
      // Count the errors for the announcement
      const errorCount = newErrors.length;
      // Format the announcement properly
      const announcement = `Form has ${errorCount} ${errorCount === 1 ? 'error' : 'errors'}: ${newErrors.join('. ')}`;
      announceToScreenReader(announcement, 'assertive');
      
      // Add these errors to the announced list
      setAnnouncedErrors(prev => [...prev, ...newErrors]);
    }
  }, [announcedErrors]);
  
  // Reset announced errors when the form is successful
  const resetAnnouncements = React.useCallback(() => {
    setAnnouncedErrors([]);
  }, []);
  
  return {
    announceFormErrors,
    resetAnnouncements
  };
}
