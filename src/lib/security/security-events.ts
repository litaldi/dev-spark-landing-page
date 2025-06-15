/**
 * Security event logging and monitoring
 */

export interface SecurityEvent {
  type: string;
  timestamp: number;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export class SecurityEventLogger {
  private static securityLog: SecurityEvent[] = [];
  private static readonly MAX_LOG_ENTRIES = 1000;

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
