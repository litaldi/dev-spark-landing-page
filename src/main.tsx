
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { AccessibilityProvider } from '@/components/a11y/AccessibilityProvider'
import { EnhancedErrorBoundary } from '@/components/error/EnhancedErrorBoundary'
import { initializeApplicationSecurity } from '@/lib/security/consolidated-security'

// Initialize comprehensive security system
try {
  initializeApplicationSecurity();
} catch (error) {
  console.error('Critical security initialization failure:', error);
  // Continue loading but with warning
  console.warn('⚠️  Application started with reduced security features');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EnhancedErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AccessibilityProvider>
            <App />
          </AccessibilityProvider>
        </ThemeProvider>
      </BrowserRouter>
    </EnhancedErrorBoundary>
  </React.StrictMode>,
)
