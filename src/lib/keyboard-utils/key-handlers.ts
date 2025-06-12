
/**
 * Handle Enter and Space key press events for accessibility
 * @param event Keyboard event
 * @param callback Function to execute on Enter or Space key press
 */
export const handleEnterAndSpace = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

/**
 * Handle arrow key navigation
 * @param event Keyboard event
 * @param options Configuration for arrow key handling
 */
export const handleArrowKeys = (
  event: React.KeyboardEvent,
  options: {
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    preventDefault?: boolean;
  }
): void => {
  const { onArrowUp, onArrowDown, onArrowLeft, onArrowRight, preventDefault = true } = options;
  
  switch (event.key) {
    case 'ArrowUp':
      if (preventDefault) event.preventDefault();
      onArrowUp?.();
      break;
    case 'ArrowDown':
      if (preventDefault) event.preventDefault();
      onArrowDown?.();
      break;
    case 'ArrowLeft':
      if (preventDefault) event.preventDefault();
      onArrowLeft?.();
      break;
    case 'ArrowRight':
      if (preventDefault) event.preventDefault();
      onArrowRight?.();
      break;
  }
};

/**
 * Handle Tab key navigation with custom logic
 * @param event Keyboard event
 * @param callback Function to execute on Tab key press
 */
export const handleTabKey = (
  event: React.KeyboardEvent,
  callback: (shiftKey: boolean) => void
): void => {
  if (event.key === 'Tab') {
    callback(event.shiftKey);
  }
};

/**
 * Handle Escape key press
 * @param event Keyboard event
 * @param callback Function to execute on Escape key press
 */
export const handleEscapeKey = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};
