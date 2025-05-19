
/**
 * Utility functions for handling keyboard interactions
 */

/**
 * Handle Enter and Space key presses for interactive elements
 * @param callback Function to execute when Enter or Space is pressed
 * @returns Cleanup function to remove event listeners
 */
export const handleEnterAndSpace = (callback: () => void): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      callback();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Handle arrow key navigation
 * @param callbacks Object containing functions for each arrow key direction
 * @returns Cleanup function to remove event listeners
 */
export const handleArrowKeys = (callbacks: {
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
}): (() => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (callbacks.up) {
          e.preventDefault();
          callbacks.up();
        }
        break;
      case 'ArrowDown':
        if (callbacks.down) {
          e.preventDefault();
          callbacks.down();
        }
        break;
      case 'ArrowLeft':
        if (callbacks.left) {
          e.preventDefault();
          callbacks.left();
        }
        break;
      case 'ArrowRight':
        if (callbacks.right) {
          e.preventDefault();
          callbacks.right();
        }
        break;
      default:
        break;
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};
