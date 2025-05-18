
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useFormState } from "@/hooks/use-form-state";

interface UseAuthOptions {
  redirectTo?: string;
  isDemoEnabled?: boolean;
  showSuccessScreen?: boolean;
}

export interface AuthUser {
  email: string;
  name: string;
  isDemoUser: boolean;
  isFirstTimeUser?: boolean;
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  persona: string;
  acceptTerms: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { 
    redirectTo = "/dashboard", 
    isDemoEnabled = true, 
    showSuccessScreen = true 
  } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const clearError = () => setErrorMessage(null);

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  // Get current user data
  const getCurrentUser = (): AuthUser | null => {
    if (!isAuthenticated()) return null;
    
    const isFirstTimeUser = localStorage.getItem("onboardingComplete") !== "true";
    
    return {
      email: localStorage.getItem("userEmail") || "",
      name: localStorage.getItem("userName") || "",
      isDemoUser: localStorage.getItem("isDemoUser") === "true",
      isFirstTimeUser
    };
  };

  // Login handler
  const login = async (email: string, password: string) => {
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
        localStorage.setItem("isDemoUser", "true");
        userName = "Demo User";
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("onboardingComplete", "true"); // Demo users skip onboarding
        
        toast({
          title: "Demo Mode",
          description: "You've logged in as a demo user.",
        });
      } else {
        // In a real app, this would be an actual API call
        // For now, we'll just simulate successful login
        localStorage.setItem("isDemoUser", "false");
        userName = email.split('@')[0];
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        
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
      
      // Show success screen or redirect directly
      if (showSuccessScreen) {
        setShowLoginSuccess(true);
        // Redirect will happen in the success screen component
      } else {
        // Redirect to specified path
        navigate(redirectTo);
      }
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid email or password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (userData: RegisterFormData) => {
    setIsLoading(true);
    clearError();
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store user info
      localStorage.setItem("isDemoUser", "false");
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Set current user state
      setCurrentUser({
        name: userData.name,
        email: userData.email,
        isDemoUser: false,
        isFirstTimeUser: true
      });
      
      // Show success screen or redirect directly to onboarding
      if (showSuccessScreen) {
        setShowLoginSuccess(true);
        // Will redirect to onboarding in the success component
      } else {
        // Redirect to onboarding
        navigate("/auth/onboarding");
      }
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isDemoUser");
    
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
    getCurrentUser,
    showLoginSuccess,
    currentUser,
    resetLoginSuccess
  };
}
