
import React from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { useNavigate } from "react-router-dom";

interface GetStartedButtonProps {
  className?: string;
  isMobile?: boolean;
  onMenuClose?: () => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
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

  return (
    <EnhancedButton 
      size={isMobile ? "default" : size}
      variant={variant}
      className={`bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:outline-none ${className} ${isMobile ? "justify-start w-full" : ""}`}
      onClick={handleClick}
      aria-label="Get started with a free account"
      data-testid="get-started-button"
    >
      {children}
    </EnhancedButton>
  );
};

export default GetStartedButton;
