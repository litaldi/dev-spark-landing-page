
import { useState, useCallback } from 'react';
import { EnhancedRateLimit, RateLimitConfig } from '@/lib/security/rate-limiting';

interface UseRateLimitOptions {
  maxRequests: number;
  timeWindow?: number;
  blockDuration?: number;
}

interface UseRateLimitResult {
  isBlocked: boolean;
  timeRemaining: number;
  remainingAttempts: number;
  registerAttempt: () => { isAllowed: boolean; remainingAttempts: number };
  resetLimit: () => void;
}

export function useRateLimit(
  key: string, 
  options: UseRateLimitOptions
): UseRateLimitResult {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const config: RateLimitConfig = {
    maxRequests: options.maxRequests,
    timeWindow: options.timeWindow || 60000,
    blockDuration: options.blockDuration || options.timeWindow || 60000,
  };

  // Get current status
  const status = EnhancedRateLimit.checkLimit(key, config);
  const isBlocked = !status.isAllowed;
  const timeRemaining = status.retryAfter || 0;
  const remainingAttempts = status.remainingRequests;

  const registerAttempt = useCallback(() => {
    const result = EnhancedRateLimit.registerRequest(key, config);
    setLastUpdate(Date.now()); // Trigger re-render
    
    return {
      isAllowed: result.isAllowed,
      remainingAttempts: result.remainingRequests
    };
  }, [key, config]);

  const resetLimit = useCallback(() => {
    EnhancedRateLimit.resetLimit(key);
    setLastUpdate(Date.now());
  }, [key]);

  return {
    isBlocked,
    timeRemaining,
    remainingAttempts,
    registerAttempt,
    resetLimit,
  };
}

// Convenience hooks for common rate limiting scenarios
export function useLoginRateLimit() {
  return useRateLimit('login', {
    maxRequests: 5,
    timeWindow: 60000 * 10, // 10 minutes
    blockDuration: 60000 * 15 // 15 minutes
  });
}

export function useRegistrationRateLimit() {
  return useRateLimit('registration', {
    maxRequests: 3,
    timeWindow: 60000 * 5, // 5 minutes
    blockDuration: 60000 * 10 // 10 minutes
  });
}

export function usePasswordResetRateLimit() {
  return useRateLimit('passwordReset', {
    maxRequests: 3,
    timeWindow: 60000 * 15, // 15 minutes
    blockDuration: 60000 * 30 // 30 minutes
  });
}
