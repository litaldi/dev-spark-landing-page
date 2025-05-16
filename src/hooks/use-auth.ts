
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useFormState } from "@/hooks/use-form-state";

interface UseAuthOptions {
  redirectTo?: string;
  isDemoEnabled?: boolean;
}

export interface AuthUser {
  email: string;
  name: string;
  isDemoUser: boolean;
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  persona: string;
  acceptTerms: boolean;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectTo = "/dashboard", isDemoEnabled = true } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    
    return {
      email: localStorage.getItem("userEmail") || "",
      name: localStorage.getItem("userName") || "",
      isDemoUser: localStorage.getItem("isDemoUser") === "true"
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
      
      if (isDemoUser && isDemoEnabled) {
        // Store demo user flag and info in localStorage
        localStorage.setItem("isDemoUser", "true");
        localStorage.setItem("userName", "Demo User");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Demo Mode",
          description: "You've logged in as a demo user.",
        });
      } else {
        // In a real app, this would be an actual API call
        // For now, we'll just simulate successful login
        localStorage.setItem("isDemoUser", "false");
        localStorage.setItem("userName", email.split('@')[0]);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
      }
      
      // Redirect to specified path
      navigate(redirectTo);
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
      
      // Redirect to onboarding
      navigate("/auth/onboarding");
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
    
    navigate("/");
  };

  return {
    isLoading,
    errorMessage,
    clearError,
    login,
    register,
    logout,
    isAuthenticated,
    getCurrentUser
  };
}
