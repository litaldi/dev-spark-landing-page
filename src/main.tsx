
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useKeyboardFocusDetection } from './lib/keyboard-utils/focus-management'
import { applySecurityDefenses } from './lib/security/http-security'
import { AccessibilityProvider } from './components/a11y/AccessibilityProvider'

// Apply security defenses on app initialization
applySecurityDefenses();

// Wrap App with accessibility features
const AppWithAccessibility = () => {
  // Initialize keyboard focus detection
  useKeyboardFocusDetection();
  
  return (
    <AccessibilityProvider>
      <App />
    </AccessibilityProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AppWithAccessibility />);
