
/**
 * HTTP security utilities - Main export module
 * Consolidated security functionality with backward compatibility
 */

// Import all security modules
import { SecurityEventLogger, SecurityEvent } from './security-events';
import { SecurityHeaders } from './security-headers';
import { URLValidator } from './url-validation';
import { SecurityDefenses } from './security-defenses';

// Re-export types
export type { SecurityEvent };

// Main HttpSecurity class for backward compatibility
export class HttpSecurity {
  // Delegate to SecurityHeaders
  static getSecurityHeaders = SecurityHeaders.getSecurityHeaders;
  
  // Delegate to URLValidator
  static validateUrl = URLValidator.validateUrl;
  
  // Delegate to SecurityEventLogger
  static logSecurityEvent = SecurityEventLogger.logSecurityEvent;
  static getSecurityEvents = SecurityEventLogger.getSecurityEvents;
  static clearSecurityLog = SecurityEventLogger.clearSecurityLog;
  
  // Delegate to SecurityDefenses
  static applySecurityDefenses = SecurityDefenses.applySecurityDefenses;
}

// Legacy exports for backward compatibility
export const applySecurityDefenses = () => HttpSecurity.applySecurityDefenses();
export const logSecurityEvent = (type: string, details: Record<string, any> = {}, severity: SecurityEvent['severity'] = 'medium') => 
  HttpSecurity.logSecurityEvent(type, details, severity);
export const applySecurityHeaders = (existingHeaders?: Record<string, string>) => 
  HttpSecurity.getSecurityHeaders(existingHeaders);
export const validateURL = (url: string) => HttpSecurity.validateUrl(url);

// Re-export all classes for direct access if needed
export { SecurityEventLogger, SecurityHeaders, URLValidator, SecurityDefenses };
