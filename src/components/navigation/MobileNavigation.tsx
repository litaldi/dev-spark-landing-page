
import React from "react";
import { MobileNavigationHeader } from "./MobileNavigationHeader";
import { MobileNavigationContent } from "./MobileNavigationContent";
import { MobileNavigationFooter } from "./MobileNavigationFooter";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
  onClose: () => void;
}

export function MobileNavigation({ isLoggedIn, userName, onLogout, onClose }: MobileNavigationProps) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <MobileNavigationHeader onClose={onClose} />
      <MobileNavigationContent onLinkClick={handleLinkClick} />
      <MobileNavigationFooter 
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={onLogout}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
}
