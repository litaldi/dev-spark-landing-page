
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "@/components/auth/LoginModal";
import { Badge } from "@/components/ui/badge";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser?: boolean;
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
  onLogout: () => void;
  toggleLoginState: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  isLoggedIn,
  userName,
  isDemoUser = false,
  isMobile = false,
  onMobileMenuClose = () => {},
  onLogout,
  toggleLoginState
}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    if (isMobile) {
      onMobileMenuClose();
    }
  };

  const handleSignUp = () => {
    navigate("/auth/register");
    if (isMobile) {
      onMobileMenuClose();
    }
  };

  const handleLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // This would be replaced with actual auth logic
    if (provider === "Demo") {
      navigate("/auth/login?demo=true");
    }
  };

  if (isLoggedIn) {
    return (
      <>
        {!isMobile && (
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-brand-500" aria-hidden="true" />
              <p className="text-brand-700 dark:text-brand-300 font-medium">
                {userName}
              </p>
              {isDemoUser && (
                <Badge 
                  variant="outline" 
                  className="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800"
                >
                  Demo
                </Badge>
              )}
            </div>
          </div>
        )}
        {isMobile && (
          <div className="px-2 py-1">
            <p className="text-brand-700 dark:text-brand-300 font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-brand-500" aria-hidden="true" />
              {userName} 
              {isDemoUser && (
                <span className="ml-1 text-xs text-brand-500">(Demo)</span>
              )}
            </p>
          </div>
        )}
        <Button 
          className={`${isMobile ? 'justify-start text-white bg-brand-500 hover:bg-brand-600 w-full' : 'hidden md:inline-flex bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300'}`}
          asChild
          onClick={isMobile ? onMobileMenuClose : undefined}
        >
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button 
          variant="ghost" 
          className={`${isMobile ? 'justify-start text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 w-full' : 'hidden md:inline-flex text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all'}`}
          onClick={handleLogoutClick}
        >
          Log out
        </Button>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          className="justify-start text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 w-full"
          onClick={() => {
            onMobileMenuClose();
            openLoginModal();
          }}
        >
          <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
          Log in
        </Button>
        <Button 
          className="justify-start w-full"
          onClick={handleSignUp}
        >
          Sign up
        </Button>
        <Button
          variant="secondary"
          className="justify-start w-full bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 border border-brand-200 dark:border-brand-800"
          onClick={() => {
            onMobileMenuClose();
            // Navigate to login with demo query param
            handleLogin("Demo");
          }}
        >
          <span>Try Demo</span>
          <Badge variant="outline" className="ml-2 bg-brand-50 dark:bg-brand-900/50 text-xs">Demo</Badge>
        </Button>
        <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="hidden md:inline-flex text-brand-600 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 transition-all"
            aria-label="Login options"
          >
            <LogIn className="h-4 w-4 mr-2" aria-hidden="true" />
            Log in
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={openLoginModal}>
            <LogIn className="h-4 w-4 mr-2" />
            <span>Email login</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleLogin("Google")}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleLogin("GitHub")}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor"/>
            </svg>
            <span>Sign in with GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleLogin("Demo")}>
            <span className="mr-2">👨‍💻</span>
            <span>Try Demo Account</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        className="bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105"
        onClick={handleSignUp}
      >
        Sign up
      </Button>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default AuthButtons;
