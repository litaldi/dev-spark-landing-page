
export const a11yTests = {
  testSkipLinks: (container: HTMLElement): boolean => {
    const skipLinks = container.querySelectorAll('a[href^="#"]');
    return skipLinks.length > 0;
  },
  
  testAriaLandmarks: (container: HTMLElement): number => {
    const landmarks = container.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"]');
    return landmarks.length;
  },
  
  testFormLabels: (container: HTMLElement): number => {
    const labels = container.querySelectorAll('label');
    return labels.length;
  },
  
  testKeyboardAccessibility: async (container: HTMLElement): Promise<number> => {
    const focusableElements = container.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    return focusableElements.length;
  }
};
