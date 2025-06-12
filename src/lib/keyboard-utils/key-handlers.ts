
/**
 * Keyboard event handlers for common interactions
 */

/**
 * Handles Enter and Space key events for custom interactive elements
 * @param event Keyboard event
 * @param callback Function to execute on Enter or Space
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
 * Handles arrow key navigation for lists and menus
 * @param event Keyboard event
 * @param currentIndex Current focused item index
 * @param itemCount Total number of items
 * @param onIndexChange Callback when index changes
 */
export const handleArrowKeys = (
  event: React.KeyboardEvent,
  currentIndex: number,
  itemCount: number,
  onIndexChange: (newIndex: number) => void
): void => {
  let newIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = currentIndex < itemCount - 1 ? currentIndex + 1 : 0;
      break;
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : itemCount - 1;
      break;
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    case 'End':
      event.preventDefault();
      newIndex = itemCount - 1;
      break;
    default:
      return;
  }
  
  onIndexChange(newIndex);
};
