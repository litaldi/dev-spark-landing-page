
import { useEffect } from 'react';
import { logSecurityEvent } from '@/lib/security/http-security';

interface SecurityMonitorOptions {
  trackFailedLogins?: boolean;
  trackRateLimits?: boolean;
  trackCSRFViolations?: boolean;
}

export function useSecurityMonitor(options: SecurityMonitorOptions = {}) {
  const {
    trackFailedLogins = true,
    trackRateLimits = true,
    trackCSRFViolations = true
  } = options;

  useEffect(() => {
    // Track failed authentication attempts
    if (trackFailedLogins) {
      const handleAuthFailure = (event: Event) => {
        logSecurityEvent('AUTH_FAILURE', {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
      };

      // Listen for custom auth failure events
      window.addEventListener('auth-failure', handleAuthFailure);
      
      return () => {
        window.removeEventListener('auth-failure', handleAuthFailure);
      };
    }
  }, [trackFailedLogins, trackRateLimits, trackCSRFViolations]);

  // Utility functions for triggering security events
  const reportAuthFailure = (details: Record<string, any> = {}) => {
    window.dispatchEvent(new CustomEvent('auth-failure', { detail: details }));
  };

  const reportRateLimitViolation = (endpoint: string, details: Record<string, any> = {}) => {
    logSecurityEvent('RATE_LIMIT_VIOLATION', {
      endpoint,
      timestamp: Date.now(),
      ...details
    });
  };

  const reportCSRFViolation = (details: Record<string, any> = {}) => {
    logSecurityEvent('CSRF_VIOLATION', {
      timestamp: Date.now(),
      url: window.location.href,
      ...details
    });
  };

  return {
    reportAuthFailure,
    reportRateLimitViolation,
    reportCSRFViolation
  };
}
