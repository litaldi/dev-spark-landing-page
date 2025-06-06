
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileMenuToggle } from './MobileMenuToggle';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { DesktopNavigation } from './DesktopNavigation';

export const EnhancedNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsExpanded(false);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <MobileMenuToggle 
        isExpanded={isExpanded} 
        onToggle={handleToggle} 
      />
      
      <MobileNavigationMenu
        isExpanded={isExpanded}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />

      <DesktopNavigation onNavigate={handleNavigate} />
    </>
  );
};
