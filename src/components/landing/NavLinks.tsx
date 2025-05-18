import React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface NavLinkProps {
  to: string
  label: string
}

function NavLink({ to, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === to

  return (
    <Link
      href={to}
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
  const pathname = usePathname()
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
