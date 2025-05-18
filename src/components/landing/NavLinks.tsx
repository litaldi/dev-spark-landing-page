
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

  return (
    <nav 
      className={`${isMobile ? "" : "hidden md:flex"} items-center ${isMobile ? "flex-col" : "flex"} gap-1`}
      aria-label={isMobile ? "Mobile navigation" : "Main navigation"}
    >
      <NavLink to="/" label="Home" onClick={handleClick} />
      <NavLink to="/about" label="About" onClick={handleClick} />
      <NavLink to="/dashboard" label="Dashboard" onClick={handleClick} />
      <NavLink to="/code-review" label="Code Review" onClick={handleClick} />
      <NavLink to="/contact" label="Contact" onClick={handleClick} />
      <NavLink to="/faq" label="FAQ" onClick={handleClick} />
    </nav>
  )
}
