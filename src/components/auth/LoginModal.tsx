
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (provider: string) => {
    // This would be replaced with actual authentication logic
    toast({
      title: "Login attempted",
      description: `Logging in with ${provider}...`,
      duration: 3000,
    });
    
    onClose();
  };

  const handleDemoLogin = () => {
    toast({
      title: "Demo Login",
      description: "Redirecting to the demo login...",
      duration: 2000,
    });
    
    navigate("/auth/login?demo=true");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-labelledby="login-title" aria-describedby="login-description">
        <DialogHeader>
          <DialogTitle id="login-title" className="text-2xl font-bold text-center">Welcome back</DialogTitle>
          <DialogDescription id="login-description" className="text-center pt-2">
            Sign in to continue your learning journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <Button 
            className="flex items-center justify-center gap-2 w-full transition-all hover:shadow-md"
            onClick={() => handleLogin("Google")}
            aria-label="Continue with Google"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full transition-all hover:border-gray-400 dark:hover:border-gray-600"
            onClick={() => handleLogin("GitHub")}
            aria-label="Continue with GitHub"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            <span>Continue with GitHub</span>
          </Button>
          
          <div className="relative flex items-center justify-center mt-2 mb-2">
            <Separator className="w-full" />
            <span className="relative bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">or</span>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full transition-all hover:border-gray-400 dark:hover:border-gray-600"
            onClick={() => handleLogin("Email")}
            aria-label="Sign in with email"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span>Sign in with Email</span>
          </Button>

          <Button 
            variant="secondary"
            className="flex items-center justify-center gap-2 w-full bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800 transition-all"
            onClick={handleDemoLogin}
            aria-label="Try demo account"
          >
            <span>Try Demo Account</span>
            <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/50 text-xs">Demo</Badge>
          </Button>

          <Button 
            variant="link" 
            className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
            asChild
          >
            <Link to="/auth/magic-link" onClick={onClose}>Sign in with Magic Link</Link>
          </Button>
        </div>
        
        <DialogFooter className="justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              asChild
              className="p-0 h-auto text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
              onClick={onClose}
            >
              <Link to="/auth/register">Sign up for free</Link>
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
