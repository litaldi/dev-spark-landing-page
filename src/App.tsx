
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useKeyboardFocusDetection } from "@/lib/keyboard-utils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { HelmetProvider } from 'react-helmet-async';
import { PageTransition } from "@/components/ui/page-transition";
import { EnhancedToaster } from "@/components/ui/enhanced-toast";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import OnboardingPage from "./pages/auth/Onboarding";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import MagicLinkPage from "./pages/auth/MagicLink";
import LogoutPage from "./pages/auth/Logout";
import AuthErrorPage from "./pages/auth/AuthError";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Newsletter from "./pages/Newsletter";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import { useEffect } from "react";

// Create a new query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  }
});

function App() {
  // Enable keyboard navigation detection
  useKeyboardFocusDetection();
  
  // Set html lang attribute and meta tags
  useEffect(() => {
    document.documentElement.lang = "en";
    
    // Add meta description if it doesn't exist
    if (!document.querySelector('meta[name="description"]')) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'DevAI Learning Platform - AI-powered programming education with personalized learning paths, real-time code reviews, and interactive challenges';
      document.head.appendChild(meta);
    }
    
    // Add viewport meta if it doesn't exist
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(viewport);
    }
    
    // Announce application loaded for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('id', 'app-loaded-announcer');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      announcer.textContent = 'DevAI Learning Platform loaded successfully';
    }, 100);
    
    // Cleanup function
    return () => {
      if (announcer.parentNode) {
        document.body.removeChild(announcer);
      }
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <div className="relative">
                <ErrorBoundary>
                  <PageTransition>
                    <Routes>
                      {/* Home page route */}
                      <Route path="/" element={<Home />} />
                      
                      {/* Landing pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/newsletter" element={<Newsletter />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/accessibility" element={<Accessibility />} />
                      
                      {/* User related pages */}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/dashboard" element={<Dashboard />} />

                      {/* Auth pages */}
                      <Route path="/auth/login" element={<LoginPage />} />
                      <Route path="/auth/register" element={<RegisterPage />} />
                      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/auth/magic-link" element={<MagicLinkPage />} />
                      <Route path="/auth/onboarding" element={<OnboardingPage />} />
                      <Route path="/auth/logout" element={<LogoutPage />} />
                      <Route path="/auth/error" element={<AuthErrorPage />} />
                      
                      {/* Catch-all route for 404 pages */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageTransition>
                </ErrorBoundary>
                <EnhancedToaster />
                <Sonner />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
