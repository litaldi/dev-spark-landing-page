
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageLoading } from '@/components/ui/enhanced-loading';
import { EnhancedErrorBoundary } from '@/components/error/EnhancedErrorBoundary';
import { routes } from './routes';

interface AppRouterProps {
  isAuthenticated: boolean;
}

export function AppRouter({ isAuthenticated }: AppRouterProps) {
  const HomePage = routes.home;
  const PracticePage = routes.practice;
  const LoginPage = routes.login;
  const RegisterPage = routes.register;
  const DashboardPage = routes.dashboard;
  const OnboardingPage = routes.onboarding;
  const NotFoundPage = routes.notFound;

  return (
    <EnhancedErrorBoundary>
      <Suspense fallback={<PageLoading text="Loading page..." />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
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
