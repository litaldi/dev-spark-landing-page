
import React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface NavLinkProps {
  to: string
  label: string
}

function NavLink({ to, label }: NavLinkProps) {
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
    >
      {label}
    </Link>
  )
}

export function NavLinks() {
  const location = useLocation()
  const isLoggedIn = false // Replace with actual auth check

  return (
    <nav className="hidden md:flex items-center gap-1">
      <NavLink to="/" label="Home" />
      <NavLink to="/about" label="About" />
      <NavLink to="/dashboard" label="Dashboard" />
      <NavLink to="/code-review" label="Code Review" />
      {isLoggedIn ? (
        <>
          <NavLink to="/profile" label="Profile" />
          <NavLink to="/settings" label="Settings" />
        </>
      ) : (
        <>
          <NavLink to="/auth/login" label="Login" />
          <NavLink to="/auth/register" label="Register" />
        </>
      )}
    </nav>
  )
}
