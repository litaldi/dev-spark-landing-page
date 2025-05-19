
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GetStartedButtonProps {
  className?: string;
  isMobile?: boolean;
  onMenuClose?: () => void;
  size?: "default" | "sm" | "lg";
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ 
  className = "", 
  isMobile = false,
  onMenuClose = () => {},
  size = "default"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/register");
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  return (
    <Button 
      size={isMobile ? "default" : size}
      className={`bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105 ${className} ${isMobile ? "justify-start w-full" : ""}`}
      onClick={handleClick}
      aria-label="Get started for free"
    >
      Get Started for Free
    </Button>
  );
};

export default GetStartedButton;
