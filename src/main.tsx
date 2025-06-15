
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeApplicationSecurity } from './lib/security/consolidated-security'

// Initialize security systems before rendering the app
initializeApplicationSecurity();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
