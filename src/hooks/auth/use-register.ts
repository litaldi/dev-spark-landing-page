
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeUserData } from "./auth-utils";
import { AuthUser, RegisterFormData } from "./types";

interface UseRegisterResult {
  register: (userData: RegisterFormData) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
  clearError: () => void;
}

export function useRegister(
  setCurrentUser: (user: AuthUser) => void
): UseRegisterResult {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const clearError = () => setErrorMessage(null);

  const register = async (userData: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store user info
      storeUserData(userData.email, userData.name, false);
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Set current user state
      setCurrentUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        isFirstTimeUser: true
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
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
