
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="relative">
            <Toaster />
            <Sonner />
            <Router>
              <Routes>
                {/* Redirect from root to login or dashboard based on authentication state */}
                <Route path="/" element={
                  localStorage.getItem("isLoggedIn") === "true" 
                    ? <Navigate to="/dashboard" replace /> 
                    : <Navigate to="/auth/login" replace />
                } />
                
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/dashboard" element={<Dashboard />} />

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
            </Router>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
