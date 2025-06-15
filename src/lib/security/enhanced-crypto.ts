
/**
 * Enhanced cryptographic utilities for secure operations
 */

export class EnhancedCrypto {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  /**
   * Generate a cryptographically secure random string
   */
  static generateSecureRandom(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate a secure hash of input data
   */
  static async generateHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = new Uint8Array(hashBuffer);
    return Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate a salted hash for passwords (simplified version)
   */
  static async generateSaltedHash(password: string, salt?: string): Promise<{
    hash: string;
    salt: string;
  }> {
    const actualSalt = salt || this.generateSecureRandom(16);
    const saltedPassword = password + actualSalt;
    const hash = await this.generateHash(saltedPassword);
    
    return {
      hash,
      salt: actualSalt
    };
  }

  /**
   * Verify a salted hash
   */
  static async verifySaltedHash(
    password: string, 
    hash: string, 
    salt: string
  ): Promise<boolean> {
    const computed = await this.generateSaltedHash(password, salt);
    return this.constantTimeCompare(computed.hash, hash);
  }

  /**
   * Generate a secure session token
   */
  static generateSessionToken(): string {
    const timestamp = Date.now().toString(36);
    const random = this.generateSecureRandom(24);
    return `${timestamp}.${random}`;
  }

  /**
   * Validate session token format
   */
  static validateSessionToken(token: string): boolean {
    const parts = token.split('.');
    if (parts.length !== 2) {
      return false;
    }

    const [timestamp, random] = parts;
    
    // Check timestamp is valid
    const tokenTime = parseInt(timestamp, 36);
    if (isNaN(tokenTime) || tokenTime <= 0) {
      return false;
    }

    // Check random part has correct length
    if (random.length !== 48) { // 24 bytes * 2 hex chars
      return false;
    }

    return true;
  }

  /**
   * Constant-time string comparison to prevent timing attacks
   */
  private static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Generate a secure API key
   */
  static generateApiKey(): string {
    const prefix = 'sk';
    const random = this.generateSecureRandom(32);
    return `${prefix}_${random}`;
  }

  /**
   * Validate API key format
   */
  static validateApiKey(key: string): boolean {
    const pattern = /^sk_[a-f0-9]{64}$/;
    return pattern.test(key);
  }
}
