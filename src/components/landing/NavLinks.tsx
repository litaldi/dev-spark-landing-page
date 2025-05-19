
import React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface NavLinkProps {
  to: string
  label: string
  onClick?: () => void;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

function NavLink({ to, label, onClick, icon, badge }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "font-medium transition-all duration-300 group relative",
        isActive
          ? "bg-accent/80 text-accent-foreground hover:bg-accent hover:text-accent-foreground"
          : "hover:bg-accent/80 hover:text-accent-foreground"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-testid={`nav-link-${label.toLowerCase()}`}
    >
      <span className="flex items-center gap-2">
        {icon && <span className="opacity-70 group-hover:opacity-100 transition-opacity">{icon}</span>}
        {label}
      </span>
      {badge && (
        <span className="absolute -top-1 -right-1">{badge}</span>
      )}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform-gpu animate-fade-in" 
          aria-hidden="true"
        />
      )}
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
      className={`${isMobile ? "w-full" : "hidden md:flex"} items-center ${isMobile ? "flex-col" : "flex"} gap-2`}
      aria-label={isMobile ? "Mobile navigation" : "Main navigation"}
      role="navigation"
    >
      {isMobile && (
        <div className="sr-only" aria-live="polite">
          Mobile navigation menu is now open
        </div>
      )}
      {navLinks.map((link) => (
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
