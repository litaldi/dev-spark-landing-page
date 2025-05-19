
/**
 * Announces a message to screen readers.
 * 
 * @param message - The message to announce
 * @param politeness - The politeness level (assertive or polite)
 */
export const announceToScreenReader = (message: string, politeness: 'assertive' | 'polite' = 'polite') => {
  // Create a visually hidden element for announcements
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
  announcement.setAttribute('aria-atomic', 'true');
  
  // Make it invisible but still available to screen readers
  announcement.style.position = 'absolute';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.padding = '0';
  announcement.style.margin = '-1px';
  announcement.style.overflow = 'hidden';
  announcement.style.clip = 'rect(0, 0, 0, 0)';
  announcement.style.whiteSpace = 'nowrap';
  announcement.style.border = '0';
  
  // We need to add it to the DOM first without content
  document.body.appendChild(announcement);
  
  // Small delay to ensure the screen reader picks up the content change
  setTimeout(() => {
    announcement.textContent = message;
    
    // Remove it after it has been announced
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 3000);
  }, 50);
};

/**
 * Returns a formatted string describing state changes
 * for screen readers
 */
export const formatStateChange = (state: string, entityName: string): string => {
  return `${entityName} is now ${state}`;
};

/**
 * Creates an object with ARIA attributes for error states
 */
export const getErrorAriaAttributes = (hasError: boolean, errorId?: string) => {
  if (!hasError) return {};
  
  return {
    'aria-invalid': true,
    'aria-errormessage': errorId,
    'aria-describedby': errorId,
  };
};

/**
 * Format a number to be properly announced by screen readers
 */
export const formatNumberForScreenReader = (value: number): string => {
  // For percentages
  if (value >= 0 && value <= 1) {
    return `${Math.round(value * 100)}%`;
  }
  
  // For larger numbers - use localized formatting
  return new Intl.NumberFormat().format(value);
};

/**
 * Generate an accessible description for a chart or visualization
 */
export const generateChartDescription = (data: any[], titleField: string, valueField: string): string => {
  if (!data || data.length === 0) return 'No data available';
  
  const intro = `Chart with ${data.length} data points.`;
  const details = data.map(item => 
    `${item[titleField]}: ${formatNumberForScreenReader(item[valueField])}`
  ).join('. ');
  
  return `${intro} ${details}`;
};

/**
 * Checks if high contrast mode is enabled
 */
export const isHighContrastMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return document.body.classList.contains('high-contrast');
};
