
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoginModal from "@/components/auth/LoginModal";

interface GetStartedButtonProps {
  className?: string;
  isMobile?: boolean;
  onMenuClose?: () => void;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ 
  className = "", 
  isMobile = false,
  onMenuClose = () => {}
}) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => {
    setLoginModalOpen(true);
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleSignUp = () => {
    navigate("/auth/register");
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  const handleTryDemo = () => {
    navigate("/auth/login?demo=true");
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  if (isMobile) {
    return (
      <>
        <Button 
          className="justify-start w-full bg-brand-500 hover:bg-brand-600"
          onClick={handleSignUp}
        >
          Get Started for Free
        </Button>
        <Button 
          variant="outline" 
          className="justify-start w-full"
          onClick={openLoginModal}
        >
          Log in
        </Button>
        <Button
          variant="secondary"
          className="justify-start w-full bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50"
          onClick={handleTryDemo}
        >
          <span>Try Demo</span>
        </Button>
        <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
      </>
    );
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            size="sm" 
            className={`bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105 ${className}`}
          >
            Get Started for Free
            <ChevronDown className="ml-1 h-3.5 w-3.5 opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-56 p-3">
          <div className="flex flex-col gap-2">
            <Button 
              variant="ghost" 
              className="justify-start"
              onClick={openLoginModal}
            >
              Log in
            </Button>
            <Button 
              className="justify-start"
              onClick={handleSignUp}
            >
              Sign up
            </Button>
            <Button
              variant="secondary"
              className="justify-start bg-brand-100 hover:bg-brand-200 dark:bg-brand-900/30 dark:hover:bg-brand-900/50"
              onClick={handleTryDemo}
            >
              <span>Try Demo</span>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default GetStartedButton;
