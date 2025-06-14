
import 'jest-axe/extend-expect';

// Global accessibility test setup
beforeEach(() => {
  // Reset DOM state
  document.body.innerHTML = '';
  
  // Add basic accessibility styles for testing
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
  `;
  document.head.appendChild(style);
});
