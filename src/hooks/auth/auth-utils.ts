
import { sanitizeInput } from "@/lib/security";
import { AuthUser } from "./types";

/**
 * Helper functions for authentication
 */

/**
 * Check if user is authenticated based on localStorage
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem("isLoggedIn") === "true";
}

/**
 * Get current user data from localStorage
 */
export function getCurrentUserFromStorage(): AuthUser | null {
  if (!isAuthenticated()) return null;
  
  const isFirstTimeUser = localStorage.getItem("onboardingComplete") !== "true";
  const email = localStorage.getItem("userEmail") || "";
  const name = localStorage.getItem("userName") || "";
  
  return {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email,
    name,
    isFirstTimeUser
  };
}

/**
 * Store user data in localStorage after successful login
 */
export function storeUserData(
  email: string, 
  name: string, 
  skipOnboarding = false
): void {
  localStorage.setItem("userName", sanitizeInput(name));
  localStorage.setItem("userEmail", sanitizeInput(email));
  localStorage.setItem("isLoggedIn", "true");
  
  if (skipOnboarding) {
    localStorage.setItem("onboardingComplete", "true");
  }
}

/**
 * Clear user data from localStorage during logout
 */
export function clearUserData(): void {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}
