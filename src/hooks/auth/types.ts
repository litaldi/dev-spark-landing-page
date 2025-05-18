
/**
 * Auth-related types for the authentication system
 */

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

export interface UseAuthOptions {
  redirectTo?: string;
  isDemoEnabled?: boolean;
  showSuccessScreen?: boolean;
}
