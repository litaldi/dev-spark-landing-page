
import React from "react"
import { useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Home, LayoutDashboard, Users, MessageSquare, HelpCircle, FileQuestion } from "lucide-react"

interface NavLinkProps {
  to: string
  label: string
  onClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: React.ReactNode;
}

function NavLink({ to, label, onClick, icon: Icon, badge }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "font-medium transition-all duration-300 group relative hover:scale-105",
        isActive
          ? "bg-accent/80 text-accent-foreground hover:bg-accent hover:text-accent-foreground shadow-sm"
          : "hover:bg-accent/80 hover:text-accent-foreground hover:shadow-sm"
      )}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      data-testid={`nav-link-${label.toLowerCase()}`}
    >
      <span className="flex items-center gap-2">
        {Icon && (
          <Icon className={cn(
            "h-4 w-4 transition-all duration-200",
            isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
          )} />
        )}
        {label}
      </span>
      {badge && (
        <span className="absolute -top-1 -right-1">{badge}</span>
      )}
      {isActive && (
        <span 
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full animate-fade-in" 
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
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/about", label: "About", icon: Users },
    { to: "/contact", label: "Contact", icon: MessageSquare },
    { to: "/help", label: "Help", icon: HelpCircle },
    { to: "/faq", label: "FAQ", icon: FileQuestion }
  ];

  return (
    <nav 
      className={cn(
        isMobile ? "w-full flex-col" : "hidden md:flex items-center",
        "flex gap-2"
      )}
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
          icon={link.icon}
          onClick={handleClick}
        />
      ))}
    </nav>
  )
}
