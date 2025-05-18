
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
        "font-medium",
        isActive
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={onClick}
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
  const location = useLocation()
  const isLoggedIn = false // Replace with actual auth check

  const handleClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav className={`${isMobile ? "" : "hidden md:flex"} items-center ${isMobile ? "flex-col" : "flex"} gap-1`}>
      <NavLink to="/" label="Home" onClick={handleClick} />
      <NavLink to="/about" label="About" onClick={handleClick} />
      <NavLink to="/dashboard" label="Dashboard" onClick={handleClick} />
      <NavLink to="/code-review" label="Code Review" onClick={handleClick} />
      {isLoggedIn ? (
        <>
          <NavLink to="/profile" label="Profile" onClick={handleClick} />
          <NavLink to="/settings" label="Settings" onClick={handleClick} />
        </>
      ) : (
        <>
          <NavLink to="/auth/login" label="Login" onClick={handleClick} />
          <NavLink to="/auth/register" label="Register" onClick={handleClick} />
        </>
      )}
    </nav>
  )
}
