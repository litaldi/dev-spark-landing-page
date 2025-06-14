
// Enhanced security utilities central export
export * from './input-validation';
export * from './enhanced-input-validation';
export * from './csrf-protection';
export * from './enhanced-csrf-protection';
export * from './rate-limiting';
export * from './http-security';
export * from './secure-auth';
export * from './enhanced-crypto';

// Initialize security on import
import { EnhancedCSRFProtection } from './enhanced-csrf-protection';

// Auto-initialize CSRF protection
if (typeof window !== 'undefined') {
  EnhancedCSRFProtection.initialize();
}
