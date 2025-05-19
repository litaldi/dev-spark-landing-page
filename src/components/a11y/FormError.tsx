
import React from 'react';
import { announceToScreenReader } from '@/lib/keyboard-utils';

interface FormErrorProps {
  id: string;
  error?: string | null;
  children?: React.ReactNode;
  autoAnnounce?: boolean;
}

/**
 * A component that displays form errors with proper ARIA attributes
 * and announces errors to screen readers
 */
export function FormError({
  id,
  error,
  children,
  autoAnnounce = true
}: FormErrorProps) {
  // Announce error to screen readers when it appears
  React.useEffect(() => {
    if (error && autoAnnounce) {
      announceToScreenReader(`Error: ${error}`, 'assertive');
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
      className="form-error-message text-destructive text-sm mt-1"
    >
      {error || children}
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
      // Combine all new errors into a single message
      const errorMessage = newErrors.join('. ');
      announceToScreenReader(`Form has errors: ${errorMessage}`, 'assertive');
      
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
