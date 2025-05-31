
import { useState, useCallback } from 'react';
import { secureApiCall, checkRateLimit } from '@/lib/api-security';
import { sanitizeInput } from '@/lib/security/input-validation';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useSecureApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const makeRequest = useCallback(async (
    endpoint: string,
    options: RequestInit = {},
    sanitizeResponse: boolean = true
  ) => {
    // Check rate limiting
    if (!checkRateLimit(endpoint)) {
      setState(prev => ({ ...prev, error: 'Too many requests. Please try again later.' }));
      return null;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await secureApiCall(endpoint, options);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      
      // Sanitize response data if it contains user-generated content
      if (sanitizeResponse && typeof data === 'object') {
        data = sanitizeApiResponse(data);
      }

      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      return null;
    }
  }, []);

  return { ...state, makeRequest };
}

// Recursively sanitize API response data
function sanitizeApiResponse(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeApiResponse);
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeApiResponse(value);
    }
    return sanitized;
  }
  
  return obj;
}
