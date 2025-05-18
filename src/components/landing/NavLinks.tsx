
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinksProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  isMobile = false,
  onMobileMenuClose = () => {}
}) => {
  const location = useLocation();
  
  const links = [
    { to: "/", text: "Home" },
    { to: "/dashboard", text: "Dashboard" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const mobileLinkClasses = "flex items-center text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 dark:focus-visible:ring-brand-700";
  
  const desktopLinkClasses = "text-gray-700 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 dark:focus-visible:ring-brand-600 rounded-sm px-2 py-1";

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        {links.map((link) => (
          <Link 
            key={link.text}
            to={link.to} 
            className={`${mobileLinkClasses} ${isActive(link.to) ? 'bg-gray-100 dark:bg-gray-800 text-brand-500 dark:text-brand-400 font-medium' : ''}`}
            onClick={onMobileMenuClose}
          >
            {link.text}
            {isActive(link.to) && (
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-300 rounded-full">
                Current
              </span>
            )}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.text}
          to={link.to} 
          className={desktopLinkClasses}
          onClick={isMobile ? onMobileMenuClose : undefined}
          aria-current={isActive(link.to) ? 'page' : undefined}
        >
          {link.text}
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 transition-all duration-300 ${isActive(link.to) ? 'w-full' : 'group-hover:w-full'}`} aria-hidden="true"></span>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
