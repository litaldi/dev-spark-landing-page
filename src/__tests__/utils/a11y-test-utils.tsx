
import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

/**
 * Custom render function that includes accessibility testing helpers
 */
export function renderWithA11y(ui: React.ReactElement) {
  const result = render(ui);
  
  return {
    ...result,
    // Run accessibility tests on the component
    async testAccessibility() {
      const results = await axe(result.container);
      expect(results).toHaveNoViolations();
      return results;
    }
  };
}

/**
 * Custom accessibility testing helper functions
 */
export const a11yTests = {
  // Test that all interactive elements are keyboard accessible
  async testKeyboardAccessibility(container: HTMLElement) {
    const interactiveElements = [
      ...Array.from(container.querySelectorAll('button')),
      ...Array.from(container.querySelectorAll('a[href]')),
      ...Array.from(container.querySelectorAll('input:not([disabled])')),
      ...Array.from(container.querySelectorAll('select:not([disabled])')),
      ...Array.from(container.querySelectorAll('textarea:not([disabled])')),
      ...Array.from(container.querySelectorAll('[tabindex]:not([tabindex="-1"])')),
    ];
    
    interactiveElements.forEach(element => {
      // Check that the element is focusable
      expect(element).not.toHaveAttribute('tabindex', '-1');
      
      // Check for event handlers or href
      const hasClickHandler = 
        element.hasAttribute('onclick') || 
        element.hasAttribute('data-testid') ||
        element.tagName.toLowerCase() === 'button' || 
        element.tagName.toLowerCase() === 'a';
      
      expect(hasClickHandler).toBe(true);
    });
    
    return interactiveElements.length;
  },
  
  // Test that all images have alt text
  testImagesHaveAlt(container: HTMLElement) {
    const images = Array.from(container.querySelectorAll('img'));
    
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
    
    return images.length;
  },
  
  // Test that all form elements have associated labels
  testFormLabels(container: HTMLElement) {
    const formElements = Array.from(container.querySelectorAll('input, select, textarea'));
    
    formElements.forEach(element => {
      const id = element.getAttribute('id');
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`);
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
        
        expect(label || hasAriaLabel || hasAriaLabelledBy).toBeTruthy();
      } else {
        // If no ID, check if it's wrapped by a label
        const parentLabel = element.closest('label');
        expect(parentLabel).toBeTruthy();
      }
    });
    
    return formElements.length;
  },
  
  // Test color contrast (requires manual review, but checks for known a11y classes)
  testColorContrast(container: HTMLElement) {
    const darkElements = Array.from(container.querySelectorAll('.text-white, .text-gray-100, .text-gray-200'));
    const lightBackgrounds = Array.from(container.querySelectorAll('.bg-white, .bg-gray-100, .bg-gray-200'));
    
    // This is a simple heuristic - real contrast checking requires more complex analysis
    darkElements.forEach(element => {
      const hasContrastClass = element.classList.contains('dark:text-gray-800') || 
                              element.classList.contains('dark:text-black');
      
      if (!hasContrastClass) {
        console.warn('Potential contrast issue:', element);
      }
    });
    
    return { darkElements: darkElements.length, lightBackgrounds: lightBackgrounds.length };
  },
  
  // Test for ARIA landmarks
  testAriaLandmarks(container: HTMLElement) {
    const landmarks = {
      banner: container.querySelector('header, [role="banner"]'),
      navigation: container.querySelector('nav, [role="navigation"]'),
      main: container.querySelector('main, [role="main"]'),
      contentinfo: container.querySelector('footer, [role="contentinfo"]'),
    };
    
    // Count the number of landmarks found
    const landmarksFound = Object.values(landmarks).filter(Boolean).length;
    
    return landmarksFound;
  },
  
  // Test for skip links
  testSkipLinks(container: HTMLElement) {
    const skipLink = container.querySelector('.skip-link, [class*="skipnav"], [class*="skip-nav"]');
    return !!skipLink;
  }
};
