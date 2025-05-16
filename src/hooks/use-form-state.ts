
import { useState } from "react";

interface FormStateProps {
  onSubmit: () => Promise<boolean>;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormState({
  onSubmit,
  successMessage = "Success!",
  errorMessage = "An error occurred. Please try again."
}: FormStateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onSubmit();
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
