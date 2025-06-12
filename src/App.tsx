
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { applySecurityDefenses } from '@/lib/security/http-security';
import { initializeCSRF } from '@/lib/security/csrf-protection';

// Pages
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import LoginPage from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';

// Error Pages
import NotFound from '@/pages/NotFound';

function App() {
  useEffect(() => {
    // Initialize security features
    try {
      applySecurityDefenses();
      initializeCSRF();
    } catch (error) {
      console.error('Failed to initialize security features:', error);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="devai-ui-theme">
      <Router>
        <ProductionLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProductionLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
