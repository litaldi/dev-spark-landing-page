
/**
 * URL validation and SSRF prevention
 */

export class URLValidator {
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
}
