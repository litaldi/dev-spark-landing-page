
/**
 * Enhanced CSRF protection with token rotation and validation
 */

export class EnhancedCSRFProtection {
  private static readonly TOKEN_KEY = 'csrf-token';
  private static readonly TOKEN_TIMESTAMP_KEY = 'csrf-token-timestamp';
  private static readonly TOKEN_LIFETIME = 60 * 60 * 1000; // 1 hour
  private static readonly ROTATION_INTERVAL = 15 * 60 * 1000; // 15 minutes

  static initialize(): string {
    const existingToken = this.getToken();
    
    if (existingToken && this.isTokenValid()) {
      return existingToken;
    }

    return this.generateNewToken();
  }

  static getToken(): string | null {
    try {
      return sessionStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.warn('Could not retrieve CSRF token:', error);
      return null;
    }
  }

  static generateNewToken(): string {
    try {
      const array = new Uint8Array(32);
      crypto.getRandomValues(array);
      const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      
      sessionStorage.setItem(this.TOKEN_KEY, token);
      sessionStorage.setItem(this.TOKEN_TIMESTAMP_KEY, Date.now().toString());
      
      return token;
    } catch (error) {
      console.error('Failed to generate CSRF token:', error);
      throw new Error('CSRF token generation failed');
    }
  }

  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    
    if (!storedToken || !token) {
      return false;
    }

    if (!this.isTokenValid()) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    return this.constantTimeCompare(token, storedToken);
  }

  static isTokenValid(): boolean {
    try {
      const timestamp = sessionStorage.getItem(this.TOKEN_TIMESTAMP_KEY);
      
      if (!timestamp) {
        return false;
      }

      const tokenAge = Date.now() - parseInt(timestamp, 10);
      return tokenAge < this.TOKEN_LIFETIME;
    } catch (error) {
      return false;
    }
  }

  static shouldRotateToken(): boolean {
    try {
      const timestamp = sessionStorage.getItem(this.TOKEN_TIMESTAMP_KEY);
      
      if (!timestamp) {
        return true;
      }

      const tokenAge = Date.now() - parseInt(timestamp, 10);
      return tokenAge > this.ROTATION_INTERVAL;
    } catch (error) {
      return true;
    }
  }

  static rotateTokenIfNeeded(): string {
    if (this.shouldRotateToken()) {
      return this.generateNewToken();
    }

    return this.getToken() || this.generateNewToken();
  }

  static clearToken(): void {
    try {
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.TOKEN_TIMESTAMP_KEY);
    } catch (error) {
      console.warn('Could not clear CSRF token:', error);
    }
  }

  static addToHeaders(headers: Record<string, string>): Record<string, string> {
    const token = this.rotateTokenIfNeeded();
    
    return {
      ...headers,
      'X-CSRF-Token': token,
      'X-Requested-With': 'XMLHttpRequest'
    };
  }

  static addToFormData(formData: FormData): void {
    const token = this.rotateTokenIfNeeded();
    formData.append('csrf-token', token);
  }

  private static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }
}
