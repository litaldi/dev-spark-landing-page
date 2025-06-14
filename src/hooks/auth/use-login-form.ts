import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { z } from "zod";
import { sanitizeInput } from "@/lib/security";

// Form validation schema
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .transform(sanitizeInput),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .transform(sanitizeInput),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface UseLoginFormResult {
  isLoading: boolean;
  isBlocked: boolean;
  timeRemaining: number;
  errorMessage: string | null;
  clearError: () => void;
  handleSubmit: (data: LoginFormValues) => Promise<boolean>;
  handleMagicLink: (email: string) => void;
  setFocusField: (field: string | null) => void;
  focusField: string | null;
}

export function useLoginForm(onMagicLink?: (email: string) => void) {
  const { login, isLoading, errorMessage, clearError } = useAuth();
  const { toast } = useToast();
  
  // For accessibility, track focus management during form interactions
  const [focusField, setFocusField] = useState<string | null>(null);
  
  // Implement rate limiting for login attempts
  const {
    isBlocked,
    timeRemaining,
    registerAttempt,
    resetLimit,
  } = useRateLimit("login", {
    maxRequests: 5,           // Max 5 attempts
    timeWindow: 60000 * 10,   // Within 10 minutes
    blockDuration: 60000 * 15 // Block for 15 minutes after exceeding
  });
  
  // Submit handler with rate limiting
  const handleSubmit = async (data: LoginFormValues): Promise<boolean> => {
    clearError();
    
    // Check rate limiting before proceeding
    const { isAllowed, remainingAttempts } = registerAttempt();
    if (!isAllowed) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many login attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return false;
    }
    
    // If we're running low on attempts, warn the user
    if (remainingAttempts <= 2) {
      toast({
        title: "Login Attempt Limit",
        description: `You have ${remainingAttempts} login attempts remaining before a temporary block.`,
        variant: "default",
      });
    }
    
    // Proceed with login attempt
    const success = await login(data.email, data.password);
    
    // If login was successful, reset the rate limit
    if (success) {
      resetLimit();
    }
    
    return success;
  };

  const handleMagicLink = (email: string) => {
    if (!z.string().email().safeParse(email).success) {
      setFocusField("email");
      return;
    }

    // Apply rate limiting to magic link requests as well
    const { isAllowed } = registerAttempt();
    if (!isAllowed) {
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      toast({
        title: "Too many login attempts",
        description: `For security reasons, please try again in ${minutesRemaining} minutes.`,
        variant: "destructive",
      });
      return;
    }

    if (onMagicLink) {
      onMagicLink(sanitizeInput(email));
    }
  };

  return {
    isLoading,
    isBlocked,
    timeRemaining,
    errorMessage,
    clearError,
    handleSubmit,
    handleMagicLink,
    setFocusField,
    focusField
  };
}
