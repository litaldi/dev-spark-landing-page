
/**
 * Keyboard event handlers for accessibility
 */

/**
 * Handle Enter and Space key presses for button-like elements
 */
export function handleEnterAndSpace(
  event: React.KeyboardEvent,
  callback: () => void
): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
}

/**
 * Handle arrow key navigation
 */
export function handleArrowKeys(
  event: React.KeyboardEvent,
  options: {
    onUp?: () => void;
    onDown?: () => void;
    onLeft?: () => void;
    onRight?: () => void;
  }
): void {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault();
      options.onUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      options.onDown?.();
      break;
    case 'ArrowLeft':
      event.preventDefault();
      options.onLeft?.();
      break;
    case 'ArrowRight':
      event.preventDefault();
      options.onRight?.();
      break;
  }
}
