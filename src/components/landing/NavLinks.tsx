
import React from "react";
import { Link } from "react-router-dom";

interface NavLinksProps {
  isMobile?: boolean;
  onMobileMenuClose?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  isMobile = false,
  onMobileMenuClose = () => {}
}) => {
  const links = [
    { to: "/", text: "Home" },
    { to: "/dashboard", text: "Dashboard" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  const linkClasses = isMobile 
    ? "text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-sm"
    : "text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 rounded-sm px-2";

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.text}
          to={link.to} 
          className={linkClasses}
          onClick={isMobile ? onMobileMenuClose : undefined}
        >
          {link.text}
          {!isMobile && (
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-400 group-hover:w-full group-focus:w-full transition-all duration-300" aria-hidden="true"></span>
          )}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
