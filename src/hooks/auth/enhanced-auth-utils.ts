
import { SecureAuth, SecureAuthUser } from "@/lib/security/secure-auth";
import { EnhancedInputValidator } from "@/lib/security/enhanced-input-validation";

/**
 * Enhanced authentication utilities with secure token management
 */

/**
 * Check if user is authenticated with valid token
 */
export function isAuthenticated(): boolean {
  return SecureAuth.isAuthenticated();
}

/**
 * Get current user data from secure storage
 */
export function getCurrentUserFromStorage(): SecureAuthUser | null {
  return SecureAuth.getCurrentUser();
}

/**
 * Store user data securely after successful login
 */
export function storeUserData(
  email: string, 
  name: string, 
  skipOnboarding = false
): void {
  // Validate and sanitize inputs
  const emailValidation = EnhancedInputValidator.validateEmail(email);
  const nameValidation = EnhancedInputValidator.validateInput(name, {
    required: true,
    maxLength: 100
  });

  if (!emailValidation.isValid) {
    throw new Error('Invalid email format');
  }

  if (!nameValidation.isValid) {
    throw new Error('Invalid name format');
  }

  const user: SecureAuthUser = {
    id: 'user_' + Math.random().toString(36).substr(2, 9),
    email: emailValidation.sanitizedValue,
    name: nameValidation.sanitizedValue,
    isFirstTimeUser: !skipOnboarding
  };

  // Store user data securely
  SecureAuth.storeUserData(user);

  // Simulate storing auth tokens (in production, these would come from your auth API)
  SecureAuth.storeTokens({
    accessToken: 'access_' + Math.random().toString(36),
    refreshToken: 'refresh_' + Math.random().toString(36),
    expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
    userId: user.id
  });

  if (skipOnboarding) {
    localStorage.setItem("onboardingComplete", "true");
  }
}

/**
 * Clear user data during logout
 */
export function clearUserData(): void {
  SecureAuth.clearAuth();
  localStorage.removeItem("onboardingComplete");
}

/**
 * Refresh authentication tokens
 */
export async function refreshAuthTokens(): Promise<boolean> {
  return await SecureAuth.refreshTokens();
}

/**
 * Get secure headers for API requests
 */
export function getSecureHeaders(): Record<string, string> {
  const token = SecureAuth.getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
