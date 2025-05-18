
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "./use-login";
import { useRegister } from "./use-register";
import { clearUserData, getCurrentUserFromStorage, isAuthenticated } from "./auth-utils";
import { AuthUser, RegisterFormData, UseAuthOptions } from "./types";

export function useAuth(options: UseAuthOptions = {}) {
  const { 
    redirectTo = "/dashboard", 
    isDemoEnabled = true, 
    showSuccessScreen = true 
  } = options;
  
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(getCurrentUserFromStorage());
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize login hook
  const {
    login,
    isLoading: isLoginLoading,
    errorMessage: loginErrorMessage,
    clearError: clearLoginError
  } = useLogin(isDemoEnabled, (user) => {
    setCurrentUser(user);
    if (showSuccessScreen) {
      setShowLoginSuccess(true);
    } else {
      // Redirect to specified path or onboarding for first-time users
      navigate(user.isFirstTimeUser ? "/auth/onboarding" : redirectTo);
    }
  });

  // Initialize register hook
  const {
    register,
    isLoading: isRegisterLoading,
    errorMessage: registerErrorMessage,
    clearError: clearRegisterError
  } = useRegister((user) => {
    setCurrentUser(user);
    if (showSuccessScreen) {
      setShowLoginSuccess(true);
    } else {
      // Redirect to onboarding
      navigate("/auth/onboarding");
    }
  });

  // Combine loading and error states
  const isLoading = isLoginLoading || isRegisterLoading;
  const errorMessage = loginErrorMessage || registerErrorMessage;
  const clearError = () => {
    clearLoginError();
    clearRegisterError();
  };

  // Logout handler
  const logout = () => {
    clearUserData();
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    setCurrentUser(null);
    navigate("/");
  };

  // Reset login success state
  const resetLoginSuccess = () => {
    setShowLoginSuccess(false);
  };

  return {
    isLoading,
    errorMessage,
    clearError,
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser: () => getCurrentUserFromStorage(),
    showLoginSuccess,
    currentUser,
    resetLoginSuccess
  };
}

// Re-export types for convenience
export type { AuthUser, RegisterFormData, UseAuthOptions };
