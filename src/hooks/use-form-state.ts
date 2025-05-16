
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FormStateProps<T = any> {
  onSubmit: (data?: T) => Promise<boolean>;
  successMessage?: string;
  errorMessage?: string;
  resetAfterSuccess?: boolean;
}

export function useFormState<T = any>({
  onSubmit,
  successMessage = "Success!",
  errorMessage = "An error occurred. Please try again.",
  resetAfterSuccess = false,
}: FormStateProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (data?: T) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit(data);
      setIsSuccess(result);
      
      if (result && successMessage) {
        toast({
          title: "Success",
          description: successMessage,
        });
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

  return {
    isSubmitting,
    isSuccess,
    error,
    handleSubmit,
    resetState
  };
}
