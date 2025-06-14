
import { EnhancedInputValidator } from '@/lib/security/enhanced-input-validation';
import { EnhancedCSRFProtection } from '@/lib/security/enhanced-csrf-protection';

export interface SecureAuthUser {
  id: string;
  email: string;
  name: string;
  isFirstTimeUser?: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

export class SecureAuth {
  private static readonly USER_KEY = 'secure_user';
  private static readonly TOKEN_KEY = 'secure_tokens';

  static isAuthenticated(): boolean {
    const tokens = this.getTokens();
    return tokens !== null && tokens.expiresAt > Date.now();
  }

  static getCurrentUser(): SecureAuthUser | null {
    try {
      const userData = sessionStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  static storeUserData(user: SecureAuthUser): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static storeTokens(tokens: AuthTokens): void {
    sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokens));
  }

  static getTokens(): AuthTokens | null {
    try {
      const tokens = sessionStorage.getItem(this.TOKEN_KEY);
      return tokens ? JSON.parse(tokens) : null;
    } catch {
      return null;
    }
  }

  static clearAuth(): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

// Legacy function exports for backward compatibility
export function getCurrentUserFromStorage(): SecureAuthUser | null {
  return SecureAuth.getCurrentUser();
}

export function isAuthenticated(): boolean {
  try {
    // Defensive check to ensure SecureAuth exists and has the required methods
    if (typeof SecureAuth === 'undefined' || !SecureAuth || typeof SecureAuth.isAuthenticated !== 'function') {
      console.warn('SecureAuth class is not properly initialized');
      return false;
    }
    return SecureAuth.isAuthenticated();
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

export function clearUserData(): void {
  try {
    SecureAuth.clearAuth();
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}

export function storeUserData(email: string, name: string, isFirstTimeUser: boolean = false): void {
  try {
    const user: SecureAuthUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      name,
      isFirstTimeUser
    };
    SecureAuth.storeUserData(user);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

export function getSecureHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    // Add defensive check for SecureAuth
    if (typeof SecureAuth !== 'undefined' && SecureAuth && typeof SecureAuth.getTokens === 'function') {
      const tokens = SecureAuth.getTokens();
      if (tokens) {
        headers['Authorization'] = `Bearer ${tokens.accessToken}`;
      }
    }

    const csrfToken = EnhancedCSRFProtection.getToken();
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
  } catch (error) {
    console.error('Error getting secure headers:', error);
  }

  return headers;
}

export async function refreshAuthTokens(): Promise<boolean> {
  try {
    // Add defensive check for SecureAuth
    if (typeof SecureAuth === 'undefined' || !SecureAuth || typeof SecureAuth.getTokens !== 'function') {
      console.warn('SecureAuth class is not available for token refresh');
      return false;
    }

    const tokens = SecureAuth.getTokens();
    if (!tokens || !tokens.refreshToken) {
      return false;
    }

    // Simulate API call to refresh tokens
    // In a real app, this would be an actual API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTokens: AuthTokens = {
      accessToken: 'new_access_' + Math.random().toString(36),
      refreshToken: tokens.refreshToken, // Keep the same refresh token
      expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
      userId: tokens.userId
    };

    SecureAuth.storeTokens(newTokens);
    return true;
  } catch (error) {
    console.error('Error refreshing auth tokens:', error);
    return false;
  }
}
