
/**
 * Consolidated security utilities - Single source of truth for all security functions
 */

// Re-export all security functions from their respective modules
export * from './input-validation';
export * from './enhanced-input-validation';
export * from './csrf-protection';
export * from './enhanced-csrf-protection';
export * from './rate-limiting';
export * from './http-security';
export * from './secure-auth';
export * from './enhanced-crypto';

// Import modules for initialization
import { EnhancedCSRFProtection } from './enhanced-csrf-protection';
import { applySecurityDefenses, logSecurityEvent } from './http-security';

// Consolidated initialization function
export function initializeApplicationSecurity(): void {
  try {
    // Initialize CSRF protection
    EnhancedCSRFProtection.initialize();

    // Apply HTTP security measures
    applySecurityDefenses();
    
    // Log successful initialization
    logSecurityEvent('SECURITY_INIT_SUCCESS', {
      timestamp: Date.now(),
      features: [
        'CSRF Protection',
        'Input Validation',
        'Rate Limiting',
        'HTTP Security Headers',
        'Enhanced Authentication'
      ]
    });

    console.log('🔒 Security systems initialized successfully');
  } catch (error) {
    console.error('❌ Security initialization failed:', error);
    
    // Log the failure
    logSecurityEvent('SECURITY_INIT_FAILED', {
      timestamp: Date.now(),
      error: error?.toString()
    });
  }
}

// Export convenience functions for common security operations
export const SecurityUtils = {
  // Input validation
  sanitizeUserInput: async (input: string) => {
    const { sanitizeInput } = await import('./input-validation');
    return sanitizeInput(input);
  },

  // Authentication checks
  isUserAuthenticated: async () => {
    const { SecureAuth } = await import('./secure-auth');
    return SecureAuth.isAuthenticated();
  },

  // CSRF protection
  getCSRFToken: () => {
    return EnhancedCSRFProtection.getToken();
  },

  // Rate limiting
  checkRateLimit: async (key: string, maxRequests: number = 10, windowMs: number = 60000) => {
    const { checkRateLimit } = await import('../api-security');
    return checkRateLimit(key, maxRequests, windowMs);
  },

  // Security headers
  getSecureHeaders: async () => {
    const { applySecurityHeaders } = await import('./http-security');
    return applySecurityHeaders();
  }
};
