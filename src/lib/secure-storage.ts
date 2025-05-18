
/**
 * Utility for secure token handling
 * 
 * Note: These functions are designed to work with a backend that sets
 * HTTP-only cookies. The frontend can't directly set HTTP-only cookies
 * for security reasons, so these functions would work in conjunction
 * with appropriate backend endpoints.
 */

/**
 * Options for token operations
 */
interface TokenOptions {
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
  domain?: string;
  maxAge?: number;
}

/**
 * Default secure token options
 */
const defaultOptions: TokenOptions = {
  secure: true,
  sameSite: 'strict',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Sends a request to set a secure HTTP-only cookie via backend
 * 
 * @param endpoint Backend endpoint that sets the secure cookie
 * @param token The token to store in HTTP-only cookie
 * @param options Cookie options
 */
export async function setSecureCookie(
  endpoint: string, 
  token: string, 
  options: TokenOptions = {}
): Promise<boolean> {
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        options: mergedOptions,
      }),
      credentials: 'include', // Important for cookies
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to set secure cookie:', error);
    return false;
  }
}

/**
 * Sends a request to remove an HTTP-only cookie via backend
 * 
 * @param endpoint Backend endpoint that clears the secure cookie
 */
export async function clearSecureCookie(endpoint: string): Promise<boolean> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include', // Important for cookies
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to clear secure cookie:', error);
    return false;
  }
}

/**
 * Helper function to check if a response contains a valid session
 * based on HTTP-only cookies (called after fetch operations)
 * 
 * @param response The fetch response
 */
export function hasValidSession(response: Response): boolean {
  // Check if the response indicates authentication issues
  if (response.status === 401 || response.status === 403) {
    return false;
  }
  
  // Additional checks could be implemented based on custom headers
  // that your backend might send to indicate session status
  const sessionStatus = response.headers.get('X-Session-Valid');
  if (sessionStatus === 'false') {
    return false;
  }
  
  return true;
}

/**
 * Creates secure fetch options with credentials included
 * 
 * @param options Additional fetch options
 */
export function createSecureFetchOptions(options: RequestInit = {}): RequestInit {
  return {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'X-CSRF-Token': getCsrfTokenFromMeta(), // Add CSRF token if available
    },
  };
}

/**
 * Gets CSRF token from meta tag in document head
 */
function getCsrfTokenFromMeta(): string {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  return metaTag ? metaTag.getAttribute('content') || '' : '';
}

/**
 * Adds a meta tag with CSRF token to document head
 */
export function addCsrfTokenMeta(token: string): void {
  let metaTag = document.querySelector('meta[name="csrf-token"]');
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'csrf-token');
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', token);
}
