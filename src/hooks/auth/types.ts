
/**
 * Enhanced auth-related types for the authentication system
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  isFirstTimeUser?: boolean;
}

// Alias for backward compatibility
export interface SecureAuthUser extends AuthUser {}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  persona: string;
  acceptTerms: boolean;
}

export interface UseAuthOptions {
  redirectTo?: string;
  isDemoEnabled?: boolean;
  showSuccessScreen?: boolean;
}
