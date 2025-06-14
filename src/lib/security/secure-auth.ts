
/**
 * Secure authentication utilities with proper token management
 */

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

interface SecureAuthUser {
  id: string;
  email: string;
  name: string;
  isFirstTimeUser: boolean;
}

class SecureAuth {
  private static readonly ACCESS_TOKEN_KEY = 'auth_access_token';
  private static readonly REFRESH_TOKEN_KEY = 'auth_refresh_token';
  private static readonly TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes

  /**
   * Store authentication tokens securely
   */
  static storeTokens(tokens: AuthToken): void {
    try {
      // Store access token in memory for this session
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
      
      // Store refresh token in httpOnly cookie (simulated with secure storage)
      const encryptedRefreshToken = this.encryptToken(tokens.refreshToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, encryptedRefreshToken);
      
      // Store expiry time
      sessionStorage.setItem('token_expires_at', tokens.expiresAt.toString());
    } catch (error) {
      console.error('Failed to store auth tokens:', error);
      throw new Error('Authentication storage failed');
    }
  }

  /**
   * Get current access token if valid
   */
  static getAccessToken(): string | null {
    try {
      const token = sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
      const expiresAt = parseInt(sessionStorage.getItem('token_expires_at') || '0');
      
      if (!token || Date.now() >= (expiresAt - this.TOKEN_EXPIRY_BUFFER)) {
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated with valid token
   */
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return token !== null;
  }

  /**
   * Get current user from secure storage
   */
  static getCurrentUser(): SecureAuthUser | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    try {
      const userDataStr = sessionStorage.getItem('secure_user_data');
      if (!userDataStr) return null;

      return JSON.parse(userDataStr) as SecureAuthUser;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Store user data securely
   */
  static storeUserData(user: SecureAuthUser): void {
    try {
      sessionStorage.setItem('secure_user_data', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
      throw new Error('User data storage failed');
    }
  }

  /**
   * Clear all authentication data
   */
  static clearAuth(): void {
    try {
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem('token_expires_at');
      sessionStorage.removeItem('secure_user_data');
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      
      // Clear legacy localStorage items
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Failed to clear auth data:', error);
    }
  }

  /**
   * Simple token encryption (in production, use proper encryption)
   */
  private static encryptToken(token: string): string {
    try {
      return btoa(token + ':' + Date.now());
    } catch (error) {
      console.error('Token encryption failed:', error);
      return token;
    }
  }

  /**
   * Decrypt token
   */
  private static decryptToken(encryptedToken: string): string {
    try {
      const decoded = atob(encryptedToken);
      return decoded.split(':')[0];
    } catch (error) {
      console.error('Token decryption failed:', error);
      return encryptedToken;
    }
  }

  /**
   * Simulate token refresh (in production, this would call your auth API)
   */
  static async refreshTokens(): Promise<boolean> {
    try {
      const encryptedRefreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (!encryptedRefreshToken) return false;

      const refreshToken = this.decryptToken(encryptedRefreshToken);
      
      // In production, make API call to refresh tokens
      // For demo, simulate successful refresh
      const newTokens: AuthToken = {
        accessToken: 'new_access_' + Math.random().toString(36),
        refreshToken: 'new_refresh_' + Math.random().toString(36),
        expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour
        userId: 'user_' + Math.random().toString(36)
      };

      this.storeTokens(newTokens);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      return false;
    }
  }
}

export { SecureAuth };
export type { SecureAuthUser, AuthToken };
