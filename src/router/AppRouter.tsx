
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageLoading } from '@/components/ui/enhanced-loading';
import { EnhancedErrorBoundary } from '@/components/error/EnhancedErrorBoundary';

// Lazy load page components for better performance
const LandingPage = React.lazy(() => import('@/pages/LandingPage'));
const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@/pages/auth/RegisterPage'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));
const OnboardingPage = React.lazy(() => import('@/pages/auth/OnboardingPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

interface AppRouterProps {
  isAuthenticated: boolean;
}

export function AppRouter({ isAuthenticated }: AppRouterProps) {
  return (
    <EnhancedErrorBoundary>
      <Suspense fallback={<PageLoading text="Loading page..." />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/auth/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/auth/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/auth/login" replace />} 
          />
          <Route 
            path="/auth/onboarding" 
            element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/auth/login" replace />} 
          />

          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </EnhancedErrorBoundary>
  );
}
