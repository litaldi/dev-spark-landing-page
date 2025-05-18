
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GetStartedModal from "./GetStartedModal";

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
  };

  return (
    <>
      <Button 
        size={isMobile ? "default" : "sm"}
        className={`bg-brand-500 hover:bg-brand-600 text-white transition-all duration-300 hover:scale-105 ${className} ${isMobile ? "justify-start w-full" : ""}`}
        onClick={handleClick}
      >
        Get Started for Free
      </Button>
      
      <GetStartedModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </>
  );
};

export default GetStartedButton;
