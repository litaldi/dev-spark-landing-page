
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeUserData } from "./enhanced-auth-utils";
import { SecureAuthUser } from "@/lib/security/secure-auth";
import { EnhancedInputValidator } from "@/lib/security/enhanced-input-validation";

interface UseEnhancedLoginResult {
  login: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
  clearError: () => void;
}

export function useEnhancedLogin(
  setCurrentUser: (user: SecureAuthUser) => void
): UseEnhancedLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const clearError = () => setErrorMessage(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // Enhanced input validation
      const emailValidation = EnhancedInputValidator.validateEmail(email);
      const passwordValidation = EnhancedInputValidator.validateInput(password, {
        required: true,
        minLength: 8
      });

      if (!emailValidation.isValid) {
        setErrorMessage(emailValidation.errors[0] || 'Invalid email');
        return false;
      }

      if (!passwordValidation.isValid) {
        setErrorMessage(passwordValidation.errors[0] || 'Invalid password');
        return false;
      }

      // Simulate API call with sanitized inputs
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Extract username from sanitized email
      const userName = emailValidation.sanitizedValue.split('@')[0];
      storeUserData(emailValidation.sanitizedValue, userName, false);
      
      // Check if the user has completed onboarding
      const isFirstTimeUser = localStorage.getItem("onboardingComplete") !== "true";
      
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
      
      // Set current user state with secure user object
      setCurrentUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: userName,
        email: emailValidation.sanitizedValue,
        isFirstTimeUser
      });
      
      return true;
    } catch (error) {
      console.error("Enhanced login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    errorMessage,
    clearError
  };
}
