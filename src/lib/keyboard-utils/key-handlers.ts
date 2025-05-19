
/**
 * Returns a key handler for the Enter and Space keys
 */
export const handleEnterAndSpace = (callback: (event: React.KeyboardEvent) => void) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback(event);
    }
  };
};

/**
 * Returns a key handler for arrow key navigation in menus
 * Supports both horizontal and vertical navigation
 */
export const handleArrowKeys = (
  direction: 'horizontal' | 'vertical' | 'both',
  onNavigate: (nextIndex: number, currentIndex: number) => void,
  currentIndex: number,
  maxIndex: number
) => {
  return (event: React.KeyboardEvent) => {
    const isHorizontal = direction === 'horizontal' || direction === 'both';
    const isVertical = direction === 'vertical' || direction === 'both';
    
    let nextIndex = currentIndex;
    
    if (isHorizontal && event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % maxIndex;
    } else if (isHorizontal && event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + maxIndex) % maxIndex;
    } else if (isVertical && event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % maxIndex;
    } else if (isVertical && event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + maxIndex) % maxIndex;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = maxIndex - 1;
    } else {
      // Not a navigation key we're handling
      return;
    }
    
    if (nextIndex !== currentIndex) {
      onNavigate(nextIndex, currentIndex);
    }
  };
};
