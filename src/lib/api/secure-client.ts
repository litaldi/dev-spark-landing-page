
import { sanitizeInput } from '@/lib/security';
import { addCSRFTokenToHeaders } from '@/lib/security/csrf-protection';

interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
  isApiError: true;
}

class SecureApiClient {
  private baseURL: string;
  private timeout: number;
  private retries: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiClientConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 10000;
    this.retries = config.retries || 3;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...config.headers,
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    const url = this.baseURL + endpoint;
    
    // Validate URL
    if (!this.isValidURL(url)) {
      throw this.createApiError('Invalid URL', 400);
    }

    // Apply security headers
    const secureHeaders = addCSRFTokenToHeaders({
      ...this.defaultHeaders,
      ...options.headers as Record<string, string>,
    });

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: secureHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle response
      if (!response.ok) {
        if (response.status >= 500 && retryCount < this.retries) {
          // Retry on server errors
          await this.delay(Math.pow(2, retryCount) * 1000); // Exponential backoff
          return this.makeRequest(endpoint, options, retryCount + 1);
        }
        
        throw await this.handleErrorResponse(response);
      }

      const data = await this.parseResponse<T>(response);
      
      return {
        data,
        status: response.status,
        headers: response.headers,
        ok: response.ok,
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createApiError('Request timeout', 408);
      }
      
      if (retryCount < this.retries && this.isRetryableError(error)) {
        await this.delay(Math.pow(2, retryCount) * 1000);
        return this.makeRequest(endpoint, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return this.sanitizeResponseData(data);
    }
    
    if (contentType?.includes('text/')) {
      const text = await response.text();
      return sanitizeInput(text) as T;
    }
    
    return response.body as T;
  }

  private sanitizeResponseData(data: any): any {
    if (typeof data === 'string') {
      return sanitizeInput(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeResponseData(item));
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeResponseData(value);
      }
      return sanitized;
    }
    
    return data;
  }

  private async handleErrorResponse(response: Response): Promise<ApiError> {
    let errorData: any = null;
    
    try {
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        errorData = await response.json();
        errorData = this.sanitizeResponseData(errorData);
      } else {
        errorData = { message: await response.text() };
        errorData.message = sanitizeInput(errorData.message);
      }
    } catch (parseError) {
      errorData = { message: 'Failed to parse error response' };
    }

    const message = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
    return this.createApiError(message, response.status, errorData);
  }

  private createApiError(message: string, status?: number, data?: any): ApiError {
    const error = new Error(sanitizeInput(message)) as ApiError;
    error.isApiError = true;
    error.status = status;
    error.data = data;
    return error;
  }

  private isValidURL(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }

  private isRetryableError(error: any): boolean {
    return (
      error?.status >= 500 ||
      error?.code === 'NETWORK_ERROR' ||
      error?.name === 'TypeError' // Network errors often throw TypeError
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // HTTP Methods
  async get<T = any>(endpoint: string, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T = any>(endpoint: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T = any>(endpoint: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T = any>(endpoint: string, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Create singleton instance
export const apiClient = new SecureApiClient({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  retries: 3,
});

// Helper function to check if error is from API
export function isApiError(error: any): error is ApiError {
  return error && error.isApiError === true;
}

// Helper to extract user-friendly error message
export function getErrorMessage(error: any): string {
  if (isApiError(error)) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}
