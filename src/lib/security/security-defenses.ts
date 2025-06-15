
/**
 * Client-side security defenses and protections
 */

import { SecurityEventLogger } from './security-events';

export class SecurityDefenses {
  /**
   * Apply security defenses to the application
   */
  static applySecurityDefenses(): void {
    // Disable right-click context menu in production
    if (!import.meta.env.DEV) {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      // Disable common developer shortcuts
      document.addEventListener('keydown', (e) => {
        if (
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) ||
          (e.key === 'F12')
        ) {
          e.preventDefault();
          SecurityEventLogger.logSecurityEvent('DEV_TOOLS_ATTEMPT', {
            key: e.key,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey
          }, 'low');
        }
      });
    }

    // Monitor for potential XSS attempts
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'SCRIPT' && !element.hasAttribute('data-approved')) {
                SecurityEventLogger.logSecurityEvent('UNAUTHORIZED_SCRIPT', {
                  innerHTML: element.innerHTML,
                  src: element.getAttribute('src')
                }, 'high');
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}
