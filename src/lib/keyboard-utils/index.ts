
export * from './focus-management';

/**
 * Announce text to screen readers
 */
export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcer = document.getElementById('screen-reader-announcer') || 
    createScreenReaderAnnouncer();
  
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  
  // Clear after announcement
  setTimeout(() => {
    announcer.textContent = '';
  }, 1000);
}

/**
 * Create screen reader announcer element
 */
function createScreenReaderAnnouncer(): HTMLElement {
  const announcer = document.createElement('div');
  announcer.id = 'screen-reader-announcer';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  document.body.appendChild(announcer);
  return announcer;
}
