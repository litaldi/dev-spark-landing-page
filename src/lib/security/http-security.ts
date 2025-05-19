
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
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=(), autoplay=(self)',
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
    
    // Add additional security meta tags
    addSecurityMetaTags();
    
    // Add accessibility-related meta tags
    addAccessibilityMetaTags();
    
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
 * Add various security-related meta tags to the document head
 */
function addSecurityMetaTags(): void {
  const metaTags = [
    { httpEquiv: 'X-XSS-Protection', content: securityHeaders['X-XSS-Protection'] },
    { httpEquiv: 'X-Content-Type-Options', content: securityHeaders['X-Content-Type-Options'] },
    { httpEquiv: 'Referrer-Policy', content: securityHeaders['Referrer-Policy'] }
  ];
  
  metaTags.forEach(tag => {
    if (!document.querySelector(`meta[http-equiv="${tag.httpEquiv}"]`)) {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', tag.httpEquiv);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    }
  });
}

/**
 * Add accessibility-related meta tags to the document head
 */
function addAccessibilityMetaTags(): void {
  // Viewport meta tag with user-scalable=yes for accessibility
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
    document.head.appendChild(viewportMeta);
  } else {
    // Ensure existing viewport meta includes user-scalable=yes
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      const content = existingViewport.getAttribute('content') || '';
      if (!content.includes('user-scalable=yes') && !content.includes('user-scalable=1')) {
        existingViewport.setAttribute(
          'content',
          content.replace(/user-scalable=no/i, 'user-scalable=yes').replace(/maximum-scale=[0-9.]+/i, '')
        );
      }
    }
  }
  
  // Language meta tag for screen readers
  if (!document.documentElement.hasAttribute('lang')) {
    document.documentElement.setAttribute('lang', 'en');
  }
  
  // Theme color meta tag for browser UI
  if (!document.querySelector('meta[name="theme-color"]')) {
    const themeColorMeta = document.createElement('meta');
    themeColorMeta.setAttribute('name', 'theme-color');
    themeColorMeta.setAttribute('content', '#ffffff');
    document.head.appendChild(themeColorMeta);
    
    // Add dark mode theme color
    const darkThemeColorMeta = document.createElement('meta');
    darkThemeColorMeta.setAttribute('name', 'theme-color');
    darkThemeColorMeta.setAttribute('content', '#1f2937');
    darkThemeColorMeta.setAttribute('media', '(prefers-color-scheme: dark)');
    document.head.appendChild(darkThemeColorMeta);
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
