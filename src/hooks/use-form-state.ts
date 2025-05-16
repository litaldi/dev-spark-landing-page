
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface FocusOptions {
  focusId?: string;
  focusDelay?: number;
  announceResult?: boolean;
}

interface FormStateProps<T = any> {
  onSubmit: (data?: T) => Promise<boolean>;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSuccess?: boolean;
  focusOptions?: FocusOptions;
}

export function useFormState<T = any>({
  onSubmit,
  successMessage = "Success!",
  errorMessage = "An error occurred. Please try again.",
  resetAfterSuccess = false,
  focusOptions,
}: FormStateProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Reference for screen reader announcements
  const announceRef = useRef<HTMLDivElement | null>(null);
  
  const handleSubmit = async (data?: T) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit(data);
      setIsSuccess(result);
      
      if (result) {
        if (successMessage) {
          toast({
            title: "Success",
            description: successMessage,
          });
        }
        
        // Announce success to screen readers if enabled
        if (focusOptions?.announceResult) {
          announceToScreenReader(successMessage);
        }
        
        // Focus on the specified element after success
        if (focusOptions?.focusId) {
          setTimeout(() => {
            focusElement(focusOptions.focusId as string);
          }, focusOptions?.focusDelay || 100);
        }
      }
      
      return result;
    } catch (err) {
      const message = typeof err === 'string' ? err : errorMessage;
      setError(message);
      
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      
      // Announce error to screen readers if enabled
      if (focusOptions?.announceResult) {
        announceToScreenReader(`Error: ${message}`);
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  };

  // Focus a specific element by ID
  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element && 'focus' in element) {
      (element as HTMLElement).focus();
    }
  };
  
  // Announce message to screen readers
  const announceToScreenReader = (message: string) => {
    if (!announceRef.current) {
      announceRef.current = document.createElement('div');
      announceRef.current.setAttribute('aria-live', 'assertive');
      announceRef.current.setAttribute('role', 'status');
      announceRef.current.classList.add('sr-only'); // screen reader only
      document.body.appendChild(announceRef.current);
    }
    
    announceRef.current.textContent = message;
    
    // Clear the announcement after it's been read
    setTimeout(() => {
      if (announceRef.current) {
        announceRef.current.textContent = '';
      }
    }, 3000);
  };
  
  // Clean up the announcement div on unmount
  useEffect(() => {
    return () => {
      if (announceRef.current) {
        document.body.removeChild(announceRef.current);
      }
    };
  }, []);

  return {
    isSubmitting,
    isSuccess,
    error,
    handleSubmit,
    resetState,
    announceToScreenReader
  };
}
