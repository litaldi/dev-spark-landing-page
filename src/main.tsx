
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initializeCSRF } from '@/lib/security/csrf-protection'
import { applySecurityDefenses } from '@/lib/security/http-security'

// Initialize security features
initializeCSRF();
applySecurityDefenses();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
