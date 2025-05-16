
import { useState } from "react";

interface FormStateProps<T = any> {
  onSubmit: (data?: T) => Promise<boolean>;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormState<T = any>({
  onSubmit,
  successMessage = "Success!",
  errorMessage = "An error occurred. Please try again."
}: FormStateProps<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data?: T) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit(data);
      setIsSuccess(result);
      return result;
    } catch (err) {
      setError(typeof err === 'string' ? err : errorMessage);
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
