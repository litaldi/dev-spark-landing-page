
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add keyboard navigation detection for enhanced focus states
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

createRoot(document.getElementById("root")!).render(<App />);
