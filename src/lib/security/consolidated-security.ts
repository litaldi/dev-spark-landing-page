
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

// Consolidated initialization function
export function initializeApplicationSecurity(): void {
  try {
    // Initialize CSRF protection
    const { EnhancedCSRFProtection } = require('./enhanced-csrf-protection');
    EnhancedCSRFProtection.initialize();

    // Apply HTTP security measures
    const { applySecurityDefenses, logSecurityEvent } = require('./http-security');
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
    const { logSecurityEvent } = require('./http-security');
    logSecurityEvent('SECURITY_INIT_FAILED', {
      timestamp: Date.now(),
      error: error?.toString()
    });
  }
}

// Export convenience functions for common security operations
export const SecurityUtils = {
  // Input validation
  sanitizeUserInput: (input: string) => {
    const { sanitizeInput } = require('./input-validation');
    return sanitizeInput(input);
  },

  // Authentication checks
  isUserAuthenticated: () => {
    const { SecureAuth } = require('./secure-auth');
    return SecureAuth.isAuthenticated();
  },

  // CSRF protection
  getCSRFToken: () => {
    const { EnhancedCSRFProtection } = require('./enhanced-csrf-protection');
    return EnhancedCSRFProtection.getToken();
  },

  // Rate limiting
  checkRateLimit: (key: string, maxRequests: number = 10, windowMs: number = 60000) => {
    const { checkRateLimit } = require('../api-security');
    return checkRateLimit(key, maxRequests, windowMs);
  },

  // Security headers
  getSecureHeaders: () => {
    const { applySecurityHeaders } = require('./http-security');
    return applySecurityHeaders();
  }
};
