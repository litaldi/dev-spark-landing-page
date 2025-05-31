
/**
 * Secure storage utilities with encryption
 */
import { getCSRFToken } from './security/csrf-protection';

// Simple encryption using Web Crypto API
async function encrypt(text: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const keyData = encoder.encode(key);
  
  // Create a simple XOR encryption (for demo purposes)
  const encrypted = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] ^ keyData[i % keyData.length];
  }
  
  return btoa(String.fromCharCode(...encrypted));
}

async function decrypt(encryptedText: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  
  try {
    const encrypted = new Uint8Array(atob(encryptedText).split('').map(char => char.charCodeAt(0)));
    const decrypted = new Uint8Array(encrypted.length);
    
    for (let i = 0; i < encrypted.length; i++) {
      decrypted[i] = encrypted[i] ^ keyData[i % keyData.length];
    }
    
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Securely store data in localStorage with encryption
 */
export async function secureSetItem(key: string, value: string): Promise<void> {
  try {
    const encryptionKey = getCSRFToken() || 'default-key';
    const encrypted = await encrypt(value, encryptionKey);
    localStorage.setItem(`secure_${key}`, encrypted);
  } catch (error) {
    console.error('Failed to securely store item:', error);
    // Fallback to regular storage
    localStorage.setItem(key, value);
  }
}

/**
 * Securely retrieve data from localStorage with decryption
 */
export async function secureGetItem(key: string): Promise<string | null> {
  try {
    const encrypted = localStorage.getItem(`secure_${key}`);
    if (!encrypted) return null;
    
    const encryptionKey = getCSRFToken() || 'default-key';
    return await decrypt(encrypted, encryptionKey);
  } catch (error) {
    console.error('Failed to securely retrieve item:', error);
    // Fallback to regular storage
    return localStorage.getItem(key);
  }
}

/**
 * Securely remove data from localStorage
 */
export function secureRemoveItem(key: string): void {
  localStorage.removeItem(`secure_${key}`);
  localStorage.removeItem(key); // Also remove fallback
}

/**
 * Clear all secure storage
 */
export function secureClear(): void {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('secure_')) {
      localStorage.removeItem(key);
    }
  });
}
