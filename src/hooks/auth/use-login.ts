
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeUserData } from "./auth-utils";
import { AuthUser } from "./types";

interface UseLoginResult {
  login: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  errorMessage: string | null;
  clearError: () => void;
}

export function useLogin(
  setCurrentUser: (user: AuthUser) => void
): UseLoginResult {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  
  const clearError = () => setErrorMessage(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call
      // For now, we'll just simulate successful login
      const userName = email.split('@')[0];
      storeUserData(email, userName, false);
      
      // Check if the user has completed onboarding
      const isFirstTimeUser = localStorage.getItem("onboardingComplete") !== "true";
      
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
      
      // Set current user state
      setCurrentUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: userName,
        email,
        isFirstTimeUser
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
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
