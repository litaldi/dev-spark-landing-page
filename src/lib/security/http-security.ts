
/**
 * Security headers configuration object
 * This can be used with middleware in a production setup
 */
export const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.supabase.co https://*.lovable.app; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.lovable.app;",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};

/**
 * Adds security attributes to prevent clickjacking
 * @param window The window object
 */
export function applySecurityDefenses(): void {
  try {
    // Prevent clickjacking
    if (window.top !== window.self) {
      // We're in an iframe - block potentially malicious embedding
      throw new Error('This application does not allow embedding in iframes');
    }
    
    // Set CSP via meta tag if headers aren't available
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'Content-Security-Policy');
      meta.setAttribute('content', securityHeaders['Content-Security-Policy']);
      document.head.appendChild(meta);
    }
    
    // Strengthen session storage against XSS
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key: string, value: string) {
      if (typeof key === 'string' && key.includes('token')) {
        console.warn('Sensitive data should not be stored in localStorage/sessionStorage');
      }
      originalSetItem.apply(this, [key, value]);
    };
  } catch (e) {
    // Log security defense application failure
    console.error('Failed to apply security defenses:', e);
  }
}

/**
 * Creates secure fetch options with credentials included
 * 
 * @param options Additional fetch options
 */
export function createSecureFetchOptions(options: RequestInit = {}): RequestInit {
  return {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
    },
  };
}
