
/**
 * Keyboard event handlers and utilities
 */

/**
 * Handles Enter and Space key events for custom interactive elements
 * @param callback Function to execute when Enter or Space is pressed
 * @returns Keyboard event handler
 */
export const handleEnterAndSpace = (callback: () => void) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };
};

/**
 * Handles arrow key navigation for lists and menus
 * @param items Array of focusable elements
 * @param currentIndex Current focused item index
 * @param onIndexChange Callback when index changes
 * @param options Configuration options
 */
export const handleArrowKeys = (
  items: HTMLElement[],
  currentIndex: number,
  onIndexChange: (index: number) => void,
  options: {
    loop?: boolean;
    horizontal?: boolean;
    preventDefault?: boolean;
  } = {}
) => {
  const { loop = true, horizontal = false, preventDefault = true } = options;
  
  return (event: React.KeyboardEvent) => {
    const { key } = event;
    let newIndex = currentIndex;
    
    const upKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const downKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    
    if (key === upKey) {
      if (preventDefault) event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : (loop ? items.length - 1 : currentIndex);
    } else if (key === downKey) {
      if (preventDefault) event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (loop ? 0 : currentIndex);
    } else if (key === 'Home') {
      if (preventDefault) event.preventDefault();
      newIndex = 0;
    } else if (key === 'End') {
      if (preventDefault) event.preventDefault();
      newIndex = items.length - 1;
    }
    
    if (newIndex !== currentIndex) {
      onIndexChange(newIndex);
      items[newIndex]?.focus();
    }
  };
};
