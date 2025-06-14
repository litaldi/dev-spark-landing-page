
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeUserData } from "./enhanced-auth-utils";
import { SecureAuthUser, RegisterFormData } from "./types";
import { EnhancedInputValidator } from "@/lib/security/enhanced-input-validation";

interface UseEnhancedRegisterResult {
  register: (userData: RegisterFormData) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
  clearError: () => void;
}

export function useEnhancedRegister(
  setCurrentUser: (user: SecureAuthUser) => void
): UseEnhancedRegisterResult {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const clearError = () => setErrorMessage(null);

  const register = async (userData: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // Enhanced validation for all inputs
      const emailValidation = EnhancedInputValidator.validateEmail(userData.email);
      const nameValidation = EnhancedInputValidator.validateInput(userData.name, {
        required: true,
        minLength: 2,
        maxLength: 50
      });
      const passwordValidation = EnhancedInputValidator.validatePassword(userData.password);
      const personaValidation = EnhancedInputValidator.validateInput(userData.persona, {
        required: true,
        maxLength: 100
      });

      // Check all validations
      const validations = [emailValidation, nameValidation, passwordValidation, personaValidation];
      const firstError = validations.find(v => !v.isValid);
      
      if (firstError) {
        setErrorMessage(firstError.errors[0] || 'Invalid input');
        return false;
      }

      if (!userData.acceptTerms) {
        setErrorMessage("You must accept the terms and conditions");
        return false;
      }
      
      // Simulate API call with sanitized inputs
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store user info with sanitized data
      storeUserData(emailValidation.sanitizedValue, nameValidation.sanitizedValue, false);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Set current user state with secure user object
      setCurrentUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: nameValidation.sanitizedValue,
        email: emailValidation.sanitizedValue,
        isFirstTimeUser: true
      });
      
      return true;
    } catch (error) {
      console.error("Enhanced registration error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    errorMessage,
    clearError
  };
}
