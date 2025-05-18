
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
  isDemoEnabled = true,
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
      // Check if this is the demo user
      const isDemoUser = email === "demo@looplist.app" && password === "Demo123!";
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      let userName = "";
      let isFirstTimeUser = false;
      
      if (isDemoUser && isDemoEnabled) {
        // Store demo user flag and info in localStorage
        userName = "Demo User";
        storeUserData(email, userName, true, true); // Demo users skip onboarding
        
        toast({
          title: "Demo Mode",
          description: "You've logged in as a demo user.",
        });
      } else {
        // In a real app, this would be an actual API call
        // For now, we'll just simulate successful login
        userName = email.split('@')[0];
        storeUserData(email, userName, false);
        
        // Check if the user has completed onboarding
        isFirstTimeUser = localStorage.getItem("onboardingComplete") !== "true";
        
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
      }
      
      // Set current user state
      setCurrentUser({
        name: userName,
        email,
        isDemoUser: isDemoUser && isDemoEnabled,
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
