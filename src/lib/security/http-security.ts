
/**
 * HTTP security utilities for web application protection
 */

/**
 * Validate URL to prevent SSRF attacks
 */
export function validateURL(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Block private/internal network addresses
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // Block localhost and private IPs
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname.startsWith('172.19.') ||
      hostname.startsWith('172.2') ||
      hostname.startsWith('172.30.') ||
      hostname.startsWith('172.31.')
    ) {
      return false;
    }
    
    // Only allow HTTP and HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Apply security headers to fetch requests
 */
export function applySecurityHeaders(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...headers,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

/**
 * Secure fetch wrapper with built-in protections
 */
export async function secureFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  // Validate URL
  if (!validateURL(url)) {
    throw new Error('Invalid or potentially unsafe URL');
  }
  
  // Apply security headers
  const secureHeaders = applySecurityHeaders(
    options.headers as Record<string, string>
  );
  
  // Add timeout to prevent hanging requests
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: secureHeaders,
      signal: controller.signal,
    });
    
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

/**
 * Content Security Policy configuration
 */
export const CSPDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", "data:", "https:"],
  fontSrc: ["'self'", "https:", "data:"],
  connectSrc: ["'self'", "https:"],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  baseUri: ["'self'"],
  formAction: ["'self'"],
};

/**
 * Generate CSP header value
 */
export function generateCSPHeader(): string {
  return Object.entries(CSPDirectives)
    .map(([directive, sources]) => {
      const kebabDirective = directive.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabDirective} ${sources.join(' ')}`;
    })
    .join('; ');
}

/**
 * Apply comprehensive security defenses
 */
export function applySecurityDefenses(): void {
  try {
    // Set CSP via meta tag if not already set
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = generateCSPHeader();
      document.head.appendChild(meta);
    }
    
    // Disable right-click context menu in production (optional)
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
    }
    
    // Prevent frame embedding
    if (window !== window.top) {
      window.top!.location = window.location;
    }
  } catch (error) {
    console.warn('Could not apply all security defenses:', error);
  }
}
