
/**
 * API Security utilities for HTTPS-only requests and secure headers
 */

// Enforce HTTPS for all API calls
export function createSecureApiUrl(endpoint: string): string {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://api.devai-platform.com';
  
  // Ensure the base URL uses HTTPS
  const secureBaseUrl = baseUrl.startsWith('http://') 
    ? baseUrl.replace('http://', 'https://') 
    : baseUrl;
  
  return `${secureBaseUrl}${endpoint}`;
}

// Secure fetch wrapper with required security headers
export async function secureApiCall(
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> {
  const secureUrl = createSecureApiUrl(endpoint);
  
  const secureOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      ...options.headers,
    },
  };
  
  // Add CSRF token if available - using sessionStorage consistently
  const csrfToken = sessionStorage.getItem('csrf-token');
  if (csrfToken) {
    secureOptions.headers = {
      ...secureOptions.headers,
      'X-CSRF-Token': csrfToken,
    };
  }
  
  return fetch(secureUrl, secureOptions);
}

// Rate limiting for API calls
const apiCallTimestamps: Record<string, number[]> = {};

export function checkRateLimit(endpoint: string, maxCalls: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!apiCallTimestamps[endpoint]) {
    apiCallTimestamps[endpoint] = [];
  }
  
  // Remove old timestamps outside the window
  apiCallTimestamps[endpoint] = apiCallTimestamps[endpoint].filter(
    timestamp => timestamp > windowStart
  );
  
  // Check if we're within the rate limit
  if (apiCallTimestamps[endpoint].length >= maxCalls) {
    return false;
  }
  
  // Add current timestamp
  apiCallTimestamps[endpoint].push(now);
  return true;
}
