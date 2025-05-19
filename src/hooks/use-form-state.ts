
import { useState, useCallback } from 'react';
import { announceToScreenReader } from '@/lib/keyboard-utils';
import { useToast } from '@/hooks/use-toast';

interface FormStateOptions<T> {
  onSubmit: (data: T) => Promise<boolean | void>;
  successMessage?: string;
  errorMessage?: string;
  focusOptions?: {
    successElementId?: string;
    errorElementId?: string;
    announceResult?: boolean;
  };
}

/**
 * Hook for managing form state with accessibility enhancements
 */
export function useFormState<T>({
  onSubmit,
  successMessage = 'Form submitted successfully',
  errorMessage = 'An error occurred. Please try again.',
  focusOptions
}: FormStateOptions<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSubmit = useCallback(
    async (data: T) => {
      try {
        setIsSubmitting(true);
        setError(null);
        
        const result = await onSubmit(data);
        
        setSuccess(true);
        
        // Show success toast if there's a success message
        if (successMessage) {
          toast({
            title: "Success",
            description: successMessage,
            variant: "success",
          });
        }
        
        // Announce success to screen readers
        if (focusOptions?.announceResult) {
          announceToScreenReader(successMessage, 'assertive');
        }
        
        // Focus on success element if specified
        if (focusOptions?.successElementId) {
          const element = document.getElementById(focusOptions.successElementId);
          if (element) {
            element.focus();
          }
        }
        
        return result;
      } catch (err) {
        setSuccess(false);
        const message = err instanceof Error ? err.message : errorMessage;
        setError(message);
        
        // Show error toast
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        
        // Announce error to screen readers
        if (focusOptions?.announceResult) {
          announceToScreenReader(`Error: ${message}`, 'assertive');
        }
        
        // Focus on error element if specified
        if (focusOptions?.errorElementId) {
          const element = document.getElementById(focusOptions.errorElementId);
          if (element) {
            element.focus();
          }
        }
        
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, successMessage, errorMessage, focusOptions, toast]
  );
  
  const resetFormState = useCallback(() => {
    setIsSubmitting(false);
    setSuccess(false);
    setError(null);
  }, []);

  return {
    isSubmitting,
    success,
    error,
    handleSubmit,
    resetFormState,
    announceToScreenReader
  };
}
