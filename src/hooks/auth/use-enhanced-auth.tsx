
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEnhancedLogin } from "./use-enhanced-login";
import { useEnhancedRegister } from "./use-enhanced-register";
import { 
  clearUserData, 
  getCurrentUserFromStorage, 
  isAuthenticated,
  refreshAuthTokens 
} from "./enhanced-auth-utils";
import { SecureAuthUser, RegisterFormData, UseAuthOptions } from "./types";
import { EnhancedCSRFProtection } from "@/lib/security/enhanced-csrf-protection";

export function useEnhancedAuth(options: UseAuthOptions = {}) {
  const { 
    redirectTo = "/dashboard", 
    showSuccessScreen = true 
  } = options;
  
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<SecureAuthUser | null>(getCurrentUserFromStorage());
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-refresh tokens on mount and periodically
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      if (isAuthenticated()) {
        const refreshed = await refreshAuthTokens();
        if (!refreshed) {
          // Token refresh failed, logout user
          logout();
        }
      }
    }, 15 * 60 * 1000); // Refresh every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  // Initialize enhanced login hook
  const {
    login,
    isLoading: isLoginLoading,
    errorMessage: loginErrorMessage,
    clearError: clearLoginError
  } = useEnhancedLogin((user) => {
    setCurrentUser(user);
    if (showSuccessScreen) {
      setShowLoginSuccess(true);
    } else {
      navigate(user.isFirstTimeUser ? "/auth/onboarding" : redirectTo);
    }
  });

  // Initialize enhanced register hook
  const {
    register,
    isLoading: isRegisterLoading,
    errorMessage: registerErrorMessage,
    clearError: clearRegisterError
  } = useEnhancedRegister((user) => {
    setCurrentUser(user);
    if (showSuccessScreen) {
      setShowLoginSuccess(true);
    } else {
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

  // Enhanced logout handler
  const logout = () => {
    clearUserData();
    EnhancedCSRFProtection.clearToken();
    
    toast({
      title: "Logged out",
      description: "You have been securely logged out.",
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
    resetLoginSuccess,
    refreshTokens: refreshAuthTokens
  };
}

// Re-export types for convenience
export type { SecureAuthUser as AuthUser, RegisterFormData, UseAuthOptions };
