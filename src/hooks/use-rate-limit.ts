import { useState, useEffect } from 'react';

interface RateLimitOptions {
  maxAttempts: number;      // Maximum number of attempts allowed
  timeWindow: number;       // Time window in milliseconds
  blockDuration?: number;   // How long to block after exceeding limit (ms)
  storagePrefix?: string;   // Prefix for localStorage keys (for security)
}

interface RateLimitState {
  attempts: number;         // Current number of attempts
  firstAttemptTime: number; // Timestamp of first attempt in current window
  lastAttemptTime: number;  // Timestamp of most recent attempt for delay calc
  isBlocked: boolean;       // Whether user is currently blocked
  blockedUntil: number;     // Timestamp when block expires
}

/**
 * Hook for implementing rate limiting in frontend applications
 * This adds an important security layer to prevent brute force attacks
 * 
 * @param key Unique identifier for this rate limit (e.g., 'login', 'register')
 * @param options Configuration options for rate limiting behavior
 * @returns Object with rate limit state and control functions
 */
export function useRateLimit(key: string, options: RateLimitOptions) {
  const { 
    maxAttempts, 
    timeWindow, 
    blockDuration = 60000,
    storagePrefix = 'rateLimit_'
  } = options;
  
  // Create a storage key with optional prefix for better security
  const storageKey = `${storagePrefix}${key}`;
  
  // Initialize rate limit state
  const [state, setState] = useState<RateLimitState>(() => {
    try {
      const storedState = window.localStorage.getItem(storageKey);
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        return parsedState;
      }
    } catch (error) {
      console.error("Error reading rate limit data:", error);
    }
    
    return {
      attempts: 0,
      firstAttemptTime: 0,
      lastAttemptTime: 0,
      isBlocked: false,
      blockedUntil: 0
    };
  });
  
  // Persist rate limit state to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving rate limit data:", error);
    }
  }, [state, storageKey]);
  
  // Check if the current time window has expired and reset if needed
  useEffect(() => {
    const checkTimeWindow = () => {
      const now = Date.now();
      
      // If blocked, check if block duration has expired
      if (state.isBlocked && now > state.blockedUntil) {
        setState({
          attempts: 0,
          firstAttemptTime: 0,
          lastAttemptTime: 0,
          isBlocked: false,
          blockedUntil: 0
        });
        return;
      }
      
      // Check if time window has expired
      if (!state.isBlocked && 
          state.attempts > 0 && 
          now - state.firstAttemptTime > timeWindow) {
        setState({
          attempts: 0,
          firstAttemptTime: 0,
          lastAttemptTime: 0,
          isBlocked: false,
          blockedUntil: 0
        });
      }
    };
    
    checkTimeWindow();
    const interval = setInterval(checkTimeWindow, 5000);
    
    return () => clearInterval(interval);
  }, [state, timeWindow]);
  
  /**
   * Register an attempt with improved security features
   * Now includes minimum delay enforcement between attempts
   * to further prevent automated attacks
   */
  const registerAttempt = (minDelayMs = 500): { 
    isAllowed: boolean; 
    remainingAttempts: number;
    isDelayEnforced: boolean; 
  } => {
    const now = Date.now();
    
    // If currently blocked, don't allow the attempt
    if (state.isBlocked) {
      return { 
        isAllowed: false, 
        remainingAttempts: 0,
        isDelayEnforced: false
      };
    }
    
    // Enforce minimum delay between attempts (anti-automation)
    const timeSinceLastAttempt = state.lastAttemptTime > 0 ? now - state.lastAttemptTime : Infinity;
    if (timeSinceLastAttempt < minDelayMs) {
      return {
        isAllowed: false,
        remainingAttempts: maxAttempts - state.attempts,
        isDelayEnforced: true
      };
    }
    
    // If this is the first attempt in a new window
    if (state.attempts === 0) {
      setState({
        attempts: 1,
        firstAttemptTime: now,
        lastAttemptTime: now,
        isBlocked: false,
        blockedUntil: 0
      });
      return { 
        isAllowed: true, 
        remainingAttempts: maxAttempts - 1,
        isDelayEnforced: false
      };
    }
    
    // If within the time window
    const newAttempts = state.attempts + 1;
    
    // If this attempt would exceed the limit
    if (newAttempts > maxAttempts) {
      setState({
        ...state,
        isBlocked: true,
        lastAttemptTime: now,
        blockedUntil: now + blockDuration
      });
      return { 
        isAllowed: false, 
        remainingAttempts: 0,
        isDelayEnforced: false 
      };
    }
    
    // Otherwise, increment attempts
    setState({
      ...state,
      attempts: newAttempts,
      lastAttemptTime: now
    });
    
    return { 
      isAllowed: true, 
      remainingAttempts: maxAttempts - newAttempts,
      isDelayEnforced: false 
    };
  };
  
  // Add a penalty to increase the block duration
  // Useful when detecting potential attacks
  const applyPenalty = (additionalBlockTime: number) => {
    const now = Date.now();
    setState({
      ...state,
      isBlocked: true,
      blockedUntil: Math.max(state.blockedUntil, now + additionalBlockTime)
    });
  };
  
  return {
    isBlocked: state.isBlocked,
    blockedUntil: state.blockedUntil, 
    timeRemaining: Math.max(0, state.blockedUntil - Date.now()),
    registerAttempt,
    attempts: state.attempts,
    applyPenalty,
    resetLimit: () => {
      setState({
        attempts: 0,
        firstAttemptTime: 0,
        lastAttemptTime: 0,
        isBlocked: false,
        blockedUntil: 0
      });
    }
  };
}
