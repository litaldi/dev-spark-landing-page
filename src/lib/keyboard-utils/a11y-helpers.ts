
/**
 * Announces a message to screen readers using aria-live
 * @param message Message to announce
 * @param priority Priority of the announcement (polite or assertive)
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  // Try to find existing announcer element
  let announcer = document.getElementById('screen-reader-announcer');
  
  // Create it if it doesn't exist
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.setAttribute('role', 'status');
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.padding = '0';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0, 0, 0, 0)';
    announcer.style.whiteSpace = 'nowrap';
    announcer.style.border = '0';
    document.body.appendChild(announcer);
  } else {
    // Update priority if needed
    announcer.setAttribute('aria-live', priority);
  }
  
  // Set the message (clear and then set to ensure announcement)
  announcer.textContent = '';
  
  // Use setTimeout to ensure the clearing has time to process
  setTimeout(() => {
    if (announcer) {
      announcer.textContent = message;
    }
  }, 50);
}

/**
 * Creates an accessible label for an element with multiple text parts
 * @param parts Array of text parts to combine
 * @returns Combined accessible label
 */
export function createAccessibleLabel(...parts: (string | undefined | null)[]): string {
  return parts.filter(Boolean).join(', ').trim();
}

/**
 * Sets a timer that's announced to screen readers
 * @param durationMs Duration in milliseconds
 * @param options Timer options
 * @returns Timer control object
 */
export function createAnnouncedTimer(
  durationMs: number,
  options: {
    onComplete?: () => void;
    announceInterval?: number;
    startMessage?: string;
    intervalMessage?: (timeLeft: number) => string;
    completeMessage?: string;
  } = {}
) {
  const {
    onComplete,
    announceInterval = 15000, // Default to 15 seconds
    startMessage = `Timer started for ${Math.ceil(durationMs / 1000)} seconds`,
    intervalMessage = (timeLeft) => `${Math.ceil(timeLeft / 1000)} seconds remaining`,
    completeMessage = 'Timer complete'
  } = options;
  
  let timeLeft = durationMs;
  let timerId: number | null = null;
  let intervalId: number | null = null;
  
  const stop = () => {
    if (timerId) window.clearTimeout(timerId);
    if (intervalId) window.clearInterval(intervalId);
    timerId = null;
    intervalId = null;
  };
  
  const start = () => {
    stop(); // Clear any existing timers
    
    // Announce start
    if (startMessage) {
      announceToScreenReader(startMessage, 'polite');
    }
    
    timeLeft = durationMs;
    
    // Set completion timer
    timerId = window.setTimeout(() => {
      if (completeMessage) {
        announceToScreenReader(completeMessage, 'polite');
      }
      
      if (onComplete) {
        onComplete();
      }
      
      stop();
    }, durationMs);
    
    // Set up interval announcements if needed
    if (announceInterval && announceInterval < durationMs) {
      intervalId = window.setInterval(() => {
        timeLeft -= announceInterval;
        
        if (timeLeft > 0) {
          announceToScreenReader(intervalMessage(timeLeft), 'polite');
        }
      }, announceInterval);
    }
  };
  
  return {
    start,
    stop,
    getTimeLeft: () => timeLeft
  };
}
