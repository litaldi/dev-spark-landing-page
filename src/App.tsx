
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
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
import { DemoModeBanner } from "./components/auth/DemoModeBanner";
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

const App = () => {
  // Set html lang attribute
  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="relative">
            <div className="fixed top-0 left-0 right-0 z-50">
              <DemoModeBanner className="rounded-none" />
            </div>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/accessibility" element={<Accessibility />} />
                
                {/* Authentication Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/onboarding" element={<OnboardingPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/auth/magic-link" element={<MagicLinkPage />} />
                <Route path="/auth/logout" element={<LogoutPage />} />
                <Route path="/auth/error" element={<AuthErrorPage />} />
                
                {/* User Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Site Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/newsletter" element={<Newsletter />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
