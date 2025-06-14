
import { useState, useCallback } from 'react';
import { rateLimiter, rateLimitConfigs, RateLimitConfig } from '@/lib/security/rate-limiting';

interface UseRateLimitOptions {
  maxAttempts: number;
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
    maxAttempts: options.maxAttempts,
    windowMs: options.timeWindow || 60000,
    blockDurationMs: options.blockDuration || options.timeWindow || 60000,
  };

  const isBlocked = rateLimiter.isBlocked(key, config);
  const blockedUntil = rateLimiter.getBlockedUntil(key);
  const timeRemaining = blockedUntil ? Math.max(0, blockedUntil - Date.now()) : 0;
  const remainingAttempts = rateLimiter.getRemainingAttempts(key, config);

  const registerAttempt = useCallback(() => {
    const isAllowed = rateLimiter.attempt(key, config);
    setLastUpdate(Date.now()); // Trigger re-render
    
    return {
      isAllowed,
      remainingAttempts: rateLimiter.getRemainingAttempts(key, config)
    };
  }, [key, config]);

  const resetLimit = useCallback(() => {
    // Clear attempts for this key
    (rateLimiter as any).attempts.delete(key);
    (rateLimiter as any).blocked.delete(key);
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
  return useRateLimit('login', rateLimitConfigs.login);
}

export function useRegistrationRateLimit() {
  return useRateLimit('registration', rateLimitConfigs.registration);
}

export function usePasswordResetRateLimit() {
  return useRateLimit('passwordReset', rateLimitConfigs.passwordReset);
}
