
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  onItemClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ className, onItemClick }) => {
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className={cn("flex items-center space-x-6", className)} role="navigation">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={onItemClick}
          className={cn(
            "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
            location.pathname === link.href
              ? "text-brand-600 dark:text-brand-400"
              : "text-gray-700 dark:text-gray-300"
          )}
          aria-current={location.pathname === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
