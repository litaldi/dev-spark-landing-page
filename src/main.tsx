
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useKeyboardFocusDetection } from './lib/keyboard-utils/focus-management'

// Wrap App with keyboard focus detection
const AppWithAccessibility = () => {
  // Initialize keyboard focus detection
  useKeyboardFocusDetection();
  
  return <App />;
};

createRoot(document.getElementById("root")!).render(<AppWithAccessibility />);
