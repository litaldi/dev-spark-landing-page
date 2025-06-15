
/**
 * HTTP security headers management
 */

export class SecurityHeaders {
  /**
   * Apply comprehensive security headers
   */
  static getSecurityHeaders(existingHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      ...existingHeaders,
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      
      // XSS protection
      'X-XSS-Protection': '1; mode=block',
      
      // Referrer policy
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // Content Security Policy (basic)
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https:",
        "media-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'"
      ].join('; '),
      
      // Strict Transport Security (for HTTPS)
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      
      // Permissions Policy
      'Permissions-Policy': [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'payment=()',
        'usb=()',
        'screen-wake-lock=()'
      ].join(', ')
    };
  }
}
