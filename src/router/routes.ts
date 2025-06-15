
import { lazy } from 'react';

// Lazy load all pages for better performance
export const routes = {
  // Public routes
  home: lazy(() => import('@/pages/LandingPage')),
  login: lazy(() => import('@/pages/auth/Login')),
  register: lazy(() => import('@/pages/auth/Register')),
  
  // VoiceSeller routes
  practice: lazy(() => import('@/pages/PracticePage')),
  
  // Protected routes
  dashboard: lazy(() => import('@/pages/dashboard/DashboardPage')),
  onboarding: lazy(() => import('@/pages/auth/OnboardingPage')),
  
  // Static pages
  about: lazy(() => import('@/pages/About')),
  contact: lazy(() => import('@/pages/Contact')),
  privacy: lazy(() => import('@/pages/Privacy')),
  terms: lazy(() => import('@/pages/Terms')),
  faq: lazy(() => import('@/pages/FAQ')),
  help: lazy(() => import('@/pages/Help')),
  accessibility: lazy(() => import('@/pages/AccessibilityStatement')),
  
  // Error pages
  notFound: lazy(() => import('@/pages/NotFound')),
} as const;

export type RouteKey = keyof typeof routes;
