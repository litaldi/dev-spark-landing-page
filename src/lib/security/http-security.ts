
/**
 * HTTP Security utilities for CSP, HSTS, and other security headers
 */

// Content Security Policy configuration
const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "https://cdn.gpteng.co"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", "data:", "https:"],
  'connect-src': ["'self'", "https:"],
  'font-src': ["'self'", "https:", "data:"],
  'frame-ancestors': ["'none'"], // This was causing the iframe embedding error
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

/**
 * Apply security defenses to the application
 */
export function applySecurityDefenses(): void {
  try {
    // Check if we're in an iframe (for Lovable preview)
    const isInIframe = window !== window.parent;
    
    // Only apply frame-ancestors restriction if not in iframe
    if (!isInIframe) {
      // Apply Content Security Policy
      const cspString = Object.entries(CSP_DIRECTIVES)
        .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
        .join('; ');
      
      const metaCSP = document.createElement('meta');
      metaCSP.setAttribute('http-equiv', 'Content-Security-Policy');
      metaCSP.setAttribute('content', cspString);
      document.head.appendChild(metaCSP);
    }
    
    // Apply other security headers via meta tags
    const securityHeaders = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: isInIframe ? 'ALLOWALL' : 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
    ];
    
    securityHeaders.forEach(header => {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', header.name);
      meta.setAttribute('content', header.content);
      document.head.appendChild(meta);
    });
    
    console.log('Security defenses applied successfully');
  } catch (error) {
    console.error('Failed to apply security defenses:', error);
    // Don't throw error to prevent app from breaking
  }
}

/**
 * Validate that current page meets security requirements
 */
export function validatePageSecurity(): boolean {
  // Check for HTTPS in production
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('Page should be served over HTTPS in production');
    return false;
  }
  
  return true;
}
