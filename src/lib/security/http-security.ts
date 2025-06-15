/**
 * HTTP security utilities and headers management
 */

interface SecurityEvent {
  type: string;
  timestamp: number;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class HttpSecurity {
  private static securityLog: SecurityEvent[] = [];
  private static readonly MAX_LOG_ENTRIES = 1000;

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

  /**
   * Validate URL to prevent SSRF attacks
   */
  static validateUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      
      // Only allow HTTP and HTTPS
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      
      // Block local/private IP ranges
      const hostname = parsed.hostname.toLowerCase();
      
      // Block localhost
      if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(hostname)) {
        return false;
      }
      
      // Block private IP ranges
      if (this.isPrivateIP(hostname)) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if IP is in private range
   */
  private static isPrivateIP(hostname: string): boolean {
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    
    if (!match) {
      return false;
    }
    
    const [, a, b, c, d] = match.map(Number);
    
    // Check private ranges
    return (
      // 10.0.0.0/8
      a === 10 ||
      // 172.16.0.0/12
      (a === 172 && b >= 16 && b <= 31) ||
      // 192.168.0.0/16
      (a === 192 && b === 168) ||
      // Link-local
      (a === 169 && b === 254)
    );
  }

  /**
   * Log security events
   */
  static logSecurityEvent(
    type: string, 
    details: Record<string, any> = {},
    severity: SecurityEvent['severity'] = 'medium'
  ): void {
    const event: SecurityEvent = {
      type,
      timestamp: Date.now(),
      details: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        ...details
      },
      severity
    };

    this.securityLog.push(event);

    // Keep log size manageable
    if (this.securityLog.length > this.MAX_LOG_ENTRIES) {
      this.securityLog.shift();
    }

    // Log to console for development
    if (import.meta.env.DEV) {
      console.warn(`Security Event [${severity.toUpperCase()}]:`, event);
    }

    // In production, you would send this to your security monitoring service
    this.sendToSecurityMonitoring(event);
  }

  /**
   * Get recent security events
   */
  static getSecurityEvents(limit: number = 50): SecurityEvent[] {
    return this.securityLog.slice(-limit);
  }

  /**
   * Clear security log
   */
  static clearSecurityLog(): void {
    this.securityLog = [];
  }

  /**
   * Apply security defenses to the application
   */
  static applySecurityDefenses(): void {
    // Disable right-click context menu in production
    if (!import.meta.env.DEV) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      // Disable common developer shortcuts
      document.addEventListener('keydown', (e) => {
        if (
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
          (e.key === 'F12')
        ) {
          e.preventDefault();
          this.logSecurityEvent('DEV_TOOLS_ATTEMPT', {
            key: e.key,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey
          }, 'low');
        }
      });
    }

    // Monitor for potential XSS attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-approved')) {
                this.logSecurityEvent('UNAUTHORIZED_SCRIPT', {
                  innerHTML: element.innerHTML,
                  src: element.getAttribute('src')
                }, 'high');
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Send security events to monitoring service (placeholder)
   */
  private static sendToSecurityMonitoring(event: SecurityEvent): void {
    // In a real application, you would send this to your security monitoring service
    // For now, we'll just store it locally
    try {
      const existingEvents = JSON.parse(localStorage.getItem('security-events') || '[]');
      existingEvents.push(event);
      
      // Keep only recent events
      const recentEvents = existingEvents.slice(-100);
      localStorage.setItem('security-events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Could not store security event:', error);
    }
  }
}

// Legacy exports for backward compatibility
export const applySecurityDefenses = HttpSecurity.applySecurityDefenses;
export const logSecurityEvent = HttpSecurity.logSecurityEvent;
export const applySecurityHeaders = HttpSecurity.getSecurityHeaders;
export const validateURL = HttpSecurity.validateUrl;
