
/**
 * Enhanced CSRF protection with automatic token management
 */

interface CSRFConfig {
  tokenName: string;
  headerName: string;
  cookieName: string;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
}

class EnhancedCSRFProtection {
  private static readonly DEFAULT_CONFIG: CSRFConfig = {
    tokenName: 'csrf-token',
    headerName: 'X-CSRF-Token',
    cookieName: 'csrf-token',
    secure: window.location.protocol === 'https:',
    sameSite: 'strict'
  };

  private static config: CSRFConfig = this.DEFAULT_CONFIG;
  private static currentToken: string | null = null;

  /**
   * Initialize CSRF protection
   */
  static initialize(customConfig?: Partial<CSRFConfig>): string {
    this.config = { ...this.DEFAULT_CONFIG, ...customConfig };
    
    let token = this.getStoredToken();
    if (!token || !this.isTokenValid(token)) {
      token = this.generateToken();
      this.storeToken(token);
    }
    
    this.currentToken = token;
    this.setupFormInterception();
    this.setupFetchInterception();
    
    return token;
  }

  /**
   * Generate a cryptographically secure CSRF token
   */
  private static generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validate token format and expiry
   */
  private static isTokenValid(token: string): boolean {
    if (!token || token.length !== 64) return false;
    
    // Check if token was generated recently (within 24 hours)
    const tokenTimestamp = sessionStorage.getItem(`${this.config.tokenName}_timestamp`);
    if (tokenTimestamp) {
      const age = Date.now() - parseInt(tokenTimestamp);
      return age < 24 * 60 * 60 * 1000; // 24 hours
    }
    
    return true; // If no timestamp, assume valid for now
  }

  /**
   * Store token securely
   */
  private static storeToken(token: string): void {
    try {
      sessionStorage.setItem(this.config.tokenName, token);
      sessionStorage.setItem(`${this.config.tokenName}_timestamp`, Date.now().toString());
      
      // Also store in a meta tag for easier access
      let metaTag = document.querySelector(`meta[name="${this.config.tokenName}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = this.config.tokenName;
        document.head.appendChild(metaTag);
      }
      metaTag.content = token;
    } catch (error) {
      console.error('Failed to store CSRF token:', error);
    }
  }

  /**
   * Get stored token
   */
  private static getStoredToken(): string | null {
    try {
      return sessionStorage.getItem(this.config.tokenName) ||
             document.querySelector(`meta[name="${this.config.tokenName}"]`)?.getAttribute('content') ||
             null;
    } catch (error) {
      console.error('Failed to retrieve CSRF token:', error);
      return null;
    }
  }

  /**
   * Get current CSRF token
   */
  static getToken(): string {
    if (!this.currentToken) {
      this.currentToken = this.initialize();
    }
    return this.currentToken;
  }

  /**
   * Validate a token against the current token
   */
  static validateToken(token: string): boolean {
    const currentToken = this.getToken();
    return currentToken === token && this.isTokenValid(token);
  }

  /**
   * Add CSRF token to form data
   */
  static addToFormData(formData: FormData): FormData {
    const token = this.getToken();
    formData.append(this.config.tokenName, token);
    return formData;
  }

  /**
   * Add CSRF token to headers
   */
  static addToHeaders(headers: Record<string, string> = {}): Record<string, string> {
    const token = this.getToken();
    return {
      ...headers,
      [this.config.headerName]: token,
    };
  }

  /**
   * Intercept form submissions to add CSRF tokens
   */
  private static setupFormInterception(): void {
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      
      // Only intercept forms that modify state (POST, PUT, DELETE, PATCH)
      const method = (form.method || 'GET').toUpperCase();
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        // Check if CSRF token is already present
        const existingToken = form.querySelector(`input[name="${this.config.tokenName}"]`) as HTMLInputElement;
        
        if (!existingToken) {
          // Add hidden input with CSRF token
          const tokenInput = document.createElement('input');
          tokenInput.type = 'hidden';
          tokenInput.name = this.config.tokenName;
          tokenInput.value = this.getToken();
          form.appendChild(tokenInput);
        } else {
          // Update existing token
          existingToken.value = this.getToken();
        }
      }
    });
  }

  /**
   * Intercept fetch requests to add CSRF tokens
   */
  private static setupFetchInterception(): void {
    const originalFetch = window.fetch;
    
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const request = new Request(input, init);
      const method = request.method.toUpperCase();
      
      // Add CSRF token to state-changing requests
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
        // Only add to same-origin requests
        const url = new URL(request.url, window.location.origin);
        if (url.origin === window.location.origin) {
          const headers = new Headers(request.headers);
          headers.set(this.config.headerName, this.getToken());
          
          return originalFetch(new Request(request, { headers }));
        }
      }
      
      return originalFetch(request);
    };
  }

  /**
   * Refresh the CSRF token
   */
  static refreshToken(): string {
    const newToken = this.generateToken();
    this.storeToken(newToken);
    this.currentToken = newToken;
    return newToken;
  }

  /**
   * Clear CSRF token
   */
  static clearToken(): void {
    try {
      sessionStorage.removeItem(this.config.tokenName);
      sessionStorage.removeItem(`${this.config.tokenName}_timestamp`);
      
      const metaTag = document.querySelector(`meta[name="${this.config.tokenName}"]`);
      if (metaTag) {
        metaTag.remove();
      }
      
      this.currentToken = null;
    } catch (error) {
      console.error('Failed to clear CSRF token:', error);
    }
  }
}

export { EnhancedCSRFProtection };
export type { CSRFConfig };
