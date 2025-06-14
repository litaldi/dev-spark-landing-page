
/**
 * HTTP Security utilities
 */

/**
 * Security headers for fetch requests
 */
export const securityHeaders = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

/**
 * Secure fetch wrapper with default security headers
 */
export async function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const secureOptions: RequestInit = {
    ...options,
    headers: {
      ...securityHeaders,
      ...options.headers
    },
    credentials: 'same-origin', // Prevent CSRF
    mode: 'cors'
  };

  try {
    const response = await fetch(url, secureOptions);
    
    // Check for common security issues
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error('Secure fetch error:', error);
    throw error;
  }
}

/**
 * Validate URL to prevent SSRF attacks
 */
export function validateURL(url: string): boolean {
  try {
    const parsedURL = new URL(url);
    
    // Only allow HTTP and HTTPS
    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      return false;
    }
    
    // Prevent access to local/private networks
    const hostname = parsedURL.hostname.toLowerCase();
    
    // Reject localhost and private IPs
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.')
    ) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Content Security Policy helpers
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Secure storage utilities
 */
export const secureStorage = {
  set(key: string, value: string): void {
    try {
      // Use sessionStorage for sensitive data
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing secure data:', error);
    }
  },
  
  get(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving secure data:', error);
      return null;
    }
  },
  
  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing secure data:', error);
    }
  },
  
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing secure data:', error);
    }
  }
};
