import { useState, useEffect } from 'react';

interface RateLimitOptions {
  maxAttempts: number;      // Maximum number of attempts allowed
  timeWindow: number;       // Time window in milliseconds
  blockDuration?: number;   // How long to block after exceeding limit (ms)
}

interface RateLimitState {
  attempts: number;         // Current number of attempts
  firstAttemptTime: number; // Timestamp of first attempt in current window
  isBlocked: boolean;       // Whether user is currently blocked
  blockedUntil: number;     // Timestamp when block expires
}

export function useRateLimit(key: string, options: RateLimitOptions) {
  const { maxAttempts, timeWindow, blockDuration = 60000 } = options;
  
  // Initialize rate limit state
  const [state, setState] = useState<RateLimitState>(() => {
    try {
      const storedState = window.localStorage.getItem(`rateLimit_${key}`);
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
      isBlocked: false,
      blockedUntil: 0
    };
  });
  
  // Persist rate limit state to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(`rateLimit_${key}`, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving rate limit data:", error);
    }
  }, [state, key]);
  
  // Check if the current time window has expired and reset if needed
  useEffect(() => {
    const checkTimeWindow = () => {
      const now = Date.now();
      
      // If blocked, check if block duration has expired
      if (state.isBlocked && now > state.blockedUntil) {
        setState({
          attempts: 0,
          firstAttemptTime: 0,
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
          isBlocked: false,
          blockedUntil: 0
        });
      }
    };
    
    checkTimeWindow();
    const interval = setInterval(checkTimeWindow, 5000);
    
    return () => clearInterval(interval);
  }, [state, timeWindow]);
  
  // Function to register an attempt
  const registerAttempt = (): { isAllowed: boolean; remainingAttempts: number } => {
    const now = Date.now();
    
    // If currently blocked, don't allow the attempt
    if (state.isBlocked) {
      return { 
        isAllowed: false, 
        remainingAttempts: 0
      };
    }
    
    // If this is the first attempt in a new window
    if (state.attempts === 0) {
      setState({
        attempts: 1,
        firstAttemptTime: now,
        isBlocked: false,
        blockedUntil: 0
      });
      return { 
        isAllowed: true, 
        remainingAttempts: maxAttempts - 1 
      };
    }
    
    // If within the time window
    const newAttempts = state.attempts + 1;
    
    // If this attempt would exceed the limit
    if (newAttempts > maxAttempts) {
      setState({
        ...state,
        isBlocked: true,
        blockedUntil: now + blockDuration
      });
      return { 
        isAllowed: false, 
        remainingAttempts: 0 
      };
    }
    
    // Otherwise, increment attempts
    setState({
      ...state,
      attempts: newAttempts
    });
    
    return { 
      isAllowed: true, 
      remainingAttempts: maxAttempts - newAttempts 
    };
  };
  
  return {
    isBlocked: state.isBlocked,
    blockedUntil: state.blockedUntil, 
    timeRemaining: Math.max(0, state.blockedUntil - Date.now()),
    registerAttempt,
    attempts: state.attempts,
    resetLimit: () => {
      setState({
        attempts: 0,
        firstAttemptTime: 0,
        isBlocked: false,
        blockedUntil: 0
      });
    }
  };
}
