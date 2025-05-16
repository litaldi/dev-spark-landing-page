
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
  
  // Add rate limiting to prevent abuse
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  
  const handleSubmit = async (data?: T) => {
    // Implement simple rate limiting
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    
    // Prevent rapid form submissions (1 second cooldown)
    if (timeSinceLastSubmit < 1000) {
      toast({
        title: "Please wait",
        description: "You're submitting too quickly. Please wait a moment.",
        variant: "destructive",
      });
      return false;
    }
    
    // Limit number of submissions in a short period
    if (submitCount > 10 && timeSinceLastSubmit < 60000) { // 10 submissions per minute
      toast({
        title: "Too many attempts",
        description: "You've made too many submissions. Please try again later.",
        variant: "destructive",
      });
      return false;
    }
    
    // Update rate limiting state
    setLastSubmitTime(now);
    setSubmitCount(prev => prev + 1);
    
    // Begin actual submission
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
      // Safely handle different error types
      let message: string;
      
      if (typeof err === 'string') {
        message = err;
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = errorMessage;
      }
      
      // Set a sanitized error message
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
