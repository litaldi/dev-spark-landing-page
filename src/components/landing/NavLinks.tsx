
import React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface NavLinkProps {
  to: string
  label: string
  onClick?: () => void;
}

function NavLink({ to, label, onClick }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isActive
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-testid={`nav-link-${label.toLowerCase()}`}
    >
      {label}
    </Link>
  )
}

interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/help", label: "Help" },
    { to: "/faq", label: "FAQ" }
  ];

  return (
    <nav 
      className={`${isMobile ? "" : "hidden md:flex"} items-center ${isMobile ? "flex-col" : "flex"} gap-1`}
      aria-label={isMobile ? "Mobile navigation" : "Main navigation"}
      role="navigation"
    >
      {isMobile && (
        <div className="sr-only" aria-live="polite">
          Mobile navigation menu is now open
        </div>
      )}
      {navLinks.map((link, index) => (
        <NavLink 
          key={link.label} 
          to={link.to} 
          label={link.label} 
          onClick={handleClick}
        />
      ))}
    </nav>
  )
}
