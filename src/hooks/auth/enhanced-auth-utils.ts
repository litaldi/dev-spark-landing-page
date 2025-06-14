
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

// Simplified auth utilities without the problematic SecureAuth class
const USER_KEY = 'secure_user';
const TOKEN_KEY = 'secure_tokens';

// Core authentication functions
export function isAuthenticated(): boolean {
  try {
    const tokens = getStoredTokens();
    return tokens !== null && tokens.expiresAt > Date.now();
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
}

export function getCurrentUserFromStorage(): SecureAuthUser | null {
  try {
    const userData = sessionStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
}

export function getStoredTokens(): AuthTokens | null {
  try {
    const tokens = sessionStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch {
    return null;
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
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data:', error);
  }
}

export function storeAuthTokens(tokens: AuthTokens): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing auth tokens:', error);
  }
}

export function clearUserData(): void {
  try {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}

export function getSecureHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const tokens = getStoredTokens();
    if (tokens) {
      headers['Authorization'] = `Bearer ${tokens.accessToken}`;
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
    const tokens = getStoredTokens();
    if (!tokens || !tokens.refreshToken) {
      return false;
    }

    // Simulate API call to refresh tokens
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTokens: AuthTokens = {
      accessToken: 'new_access_' + Math.random().toString(36),
      refreshToken: tokens.refreshToken, // Keep the same refresh token
      expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
      userId: tokens.userId
    };

    storeAuthTokens(newTokens);
    return true;
  } catch (error) {
    console.error('Error refreshing auth tokens:', error);
    return false;
  }
}
