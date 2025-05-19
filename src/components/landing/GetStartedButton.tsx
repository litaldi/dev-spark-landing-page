
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GetStartedButtonProps {
  className?: string;
  isMobile?: boolean;
  onMenuClose?: () => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary";
  children?: React.ReactNode;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ 
  className = "", 
  isMobile = false,
  onMenuClose = () => {},
  size = "default",
  variant = "default",
  children = "Get Started for Free"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/register");
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  // Handle keyboard events for better accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Button 
      size={isMobile ? "default" : size}
      variant={variant}
      className={`bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:outline-none ${className} ${isMobile ? "justify-start w-full" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Get started with a free account"
      data-testid="get-started-button"
    >
      {children}
    </Button>
  );
};

export default GetStartedButton;
