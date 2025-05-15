
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Github, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();

  const handleLogin = (provider: string) => {
    // This would be replaced with actual authentication logic
    toast({
      title: "Login attempted",
      description: `Logging in with ${provider}...`,
      duration: 3000,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome back</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Sign in to continue your learning journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <Button 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleLogin("Google")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleLogin("GitHub")}
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </Button>
          
          <div className="relative flex items-center justify-center mt-2 mb-2">
            <div className="absolute border-t border-gray-200 w-full"></div>
            <span className="relative bg-white px-2 text-sm text-gray-500">or</span>
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleLogin("Email")}
          >
            <LogIn className="w-5 h-5" />
            Sign in with Email
          </Button>
        </div>
        
        <DialogFooter className="justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <button 
              onClick={onClose} 
              className="text-brand-500 hover:text-brand-600 underline focus:outline-none"
            >
              Sign up for free
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
