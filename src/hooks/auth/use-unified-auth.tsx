
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  SecureAuth, 
  SecureAuthUser,
  getSecureHeaders,
  refreshAuthTokens 
} from "./enhanced-auth-utils";
import { EnhancedInputValidator } from "@/lib/security/enhanced-input-validation";
import { EnhancedCSRFProtection } from "@/lib/security/enhanced-csrf-protection";
import { useSecurityMonitor } from "@/hooks/use-security-monitor";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

interface UseAuthOptions {
  redirectTo?: string;
  showSuccessScreen?: boolean;
}

export function useUnifiedAuth(options: UseAuthOptions = {}) {
  const { redirectTo = "/dashboard", showSuccessScreen = true } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<SecureAuthUser | null>(
    () => SecureAuth.getCurrentUser()
  );

  const { toast } = useToast();
  const navigate = useNavigate();
  const { reportAuthFailure } = useSecurityMonitor();

  // Auto-refresh tokens periodically
  useEffect(() => {
    if (!SecureAuth.isAuthenticated()) return;

    const refreshInterval = setInterval(async () => {
      const refreshed = await refreshAuthTokens();
      if (!refreshed) {
        logout();
      }
    }, 15 * 60 * 1000); // Every 15 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

  const validateCredentials = (credentials: LoginCredentials | RegisterFormData) => {
    const emailValidation = EnhancedInputValidator.validateEmail(credentials.email);
    if (!emailValidation.isValid) {
      throw new Error('Please enter a valid email address');
    }

    if (!credentials.password) {
      throw new Error('Password is required');
    }

    if ('name' in credentials) {
      const nameValidation = EnhancedInputValidator.validateInput(credentials.name, {
        required: true,
        maxLength: 100
      });
      if (!nameValidation.isValid) {
        throw new Error('Please enter a valid name');
      }

      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwords do not match');
      }
    }

    return emailValidation;
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const emailValidation = validateCredentials(credentials);
      
      // Simulate API call (replace with actual API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: SecureAuthUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: emailValidation.sanitizedValue,
        name: emailValidation.sanitizedValue.split('@')[0],
        isFirstTimeUser: false
      };

      // Store user data securely
      SecureAuth.storeUserData(user);
      SecureAuth.storeTokens({
        accessToken: 'access_' + Math.random().toString(36),
        refreshToken: 'refresh_' + Math.random().toString(36),
        expiresAt: Date.now() + (60 * 60 * 1000),
        userId: user.id
      });

      setCurrentUser(user);

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });

      if (showSuccessScreen) {
        setShowLoginSuccess(true);
      } else {
        navigate(redirectTo);
      }

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setErrorMessage(message);
      reportAuthFailure({ type: 'login', error: message });
      
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: RegisterFormData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const emailValidation = validateCredentials(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: SecureAuthUser = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: emailValidation.sanitizedValue,
        name: formData.name,
        isFirstTimeUser: true
      };

      SecureAuth.storeUserData(user);
      SecureAuth.storeTokens({
        accessToken: 'access_' + Math.random().toString(36),
        refreshToken: 'refresh_' + Math.random().toString(36),
        expiresAt: Date.now() + (60 * 60 * 1000),
        userId: user.id
      });

      setCurrentUser(user);

      toast({
        title: "Account created!",
        description: "Welcome to the platform!",
      });

      if (showSuccessScreen) {
        setShowLoginSuccess(true);
      } else {
        navigate("/auth/onboarding");
      }

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setErrorMessage(message);
      
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    SecureAuth.clearAuth();
    EnhancedCSRFProtection.clearToken();
    
    toast({
      title: "Logged out",
      description: "You have been securely logged out.",
    });
    
    setCurrentUser(null);
    setShowLoginSuccess(false);
    navigate("/");
  }, [toast, navigate]);

  const resetLoginSuccess = useCallback(() => {
    setShowLoginSuccess(false);
  }, []);

  return {
    // State
    isLoading,
    errorMessage,
    showLoginSuccess,
    currentUser,
    
    // Actions
    login,
    register,
    logout,
    clearError,
    resetLoginSuccess,
    
    // Utilities
    isAuthenticated: SecureAuth.isAuthenticated,
    getCurrentUser: SecureAuth.getCurrentUser,
    getSecureHeaders,
    refreshTokens: refreshAuthTokens
  };
}

// Export types for convenience
export type { SecureAuthUser as AuthUser, RegisterFormData, UseAuthOptions };
