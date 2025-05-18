
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Apple } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleThirdPartyLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Redirecting to ${provider} authentication...`,
      duration: 2000,
    });
    
    if (provider === "Demo") {
      // Simulate demo login
      localStorage.setItem("isDemoUser", "true");
      localStorage.setItem("userName", "Demo User");
      localStorage.setItem("userEmail", "demo@example.com");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      onClose();
    }
  };

  const handleLoginWithEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAction = (action: 'login' | 'signup' | 'dashboard') => {
    if (action === 'signup') {
      navigate("/auth/register");
      onClose();
    } else if (action === 'dashboard') {
      navigate("/dashboard");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-labelledby="login-signup-title">
        <DialogHeader>
          <DialogTitle id="login-signup-title" className="text-2xl font-bold text-center">
            Log In or Sign Up
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          {/* Third-party login buttons */}
          <Button 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleThirdPartyLogin("Google")}
            aria-label="Continue with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Log in with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleThirdPartyLogin("GitHub")}
            aria-label="Continue with GitHub"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            <span>Log in with GitHub</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleThirdPartyLogin("Apple")}
            aria-label="Continue with Apple"
          >
            <Apple className="w-5 h-5" aria-hidden="true" />
            <span>Log in with Apple</span>
          </Button>

          <Button 
            variant="secondary"
            className="flex items-center justify-center gap-2 w-full bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800"
            onClick={() => handleThirdPartyLogin("Demo")}
            aria-label="Try demo account"
          >
            <span>Log in as Demo User</span>
            <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/50 text-xs">Demo</Badge>
          </Button>
          
          <div className="relative flex items-center justify-center mt-2">
            <Separator className="w-full" />
            <span className="relative bg-background px-2 text-sm text-muted-foreground">OR</span>
          </div>
          
          {/* Email login form */}
          <form onSubmit={handleLoginWithEmail} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isProcessing}
                autoComplete="email"
                aria-label="Email address"
                className="w-full"
              />
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isProcessing}
                  autoComplete="current-password"
                  aria-label="Password"
                  className="w-full"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isProcessing}
            >
              {isProcessing ? "Logging in..." : "Log In"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By logging in, you agree to our <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> and <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>
            </p>
          </form>
          
          <div className="flex flex-col space-y-2 text-center text-sm">
            <Button variant="link" className="px-0" asChild>
              <Link to="/auth/login">Log in with your organization</Link>
            </Button>
            
            <Button 
              variant="link" 
              className="px-0" 
              asChild
              onClick={() => handleAction('signup')}
            >
              <Link to="/auth/register">Need an account? Sign up</Link>
            </Button>
            
            <Button variant="link" className="px-0" asChild>
              <Link to="/auth/forgot-password">Forgot your password?</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetStartedModal;
