
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { AccessibilityProvider } from '@/components/a11y/AccessibilityProvider'
import { EnhancedErrorBoundary } from '@/components/error/EnhancedErrorBoundary'
import { initializeCSRF } from '@/lib/security/csrf-protection'
import { applySecurityDefenses, logSecurityEvent } from '@/lib/security/http-security'

// Initialize security features with enhanced logging
try {
  initializeCSRF();
  applySecurityDefenses();
  logSecurityEvent('APP_STARTUP', { timestamp: Date.now() });
} catch (error) {
  console.error('Security initialization failed:', error);
  logSecurityEvent('SECURITY_STARTUP_ERROR', { error: error?.toString() });
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
