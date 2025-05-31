
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const routeLabels: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/settings": "Settings",
  "/about": "About",
  "/contact": "Contact",
  "/help": "Help",
  "/faq": "FAQ",
  "/auth/login": "Sign In",
  "/auth/register": "Sign Up",
  "/auth/onboarding": "Get Started",
};

export function Breadcrumbs({ className }: { className?: string }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (location.pathname === "/") {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
  ];

  let currentPath = "";
  pathnames.forEach((name) => {
    currentPath += `/${name}`;
    const label = routeLabels[currentPath] || name.charAt(0).toUpperCase() + name.slice(1);
    breadcrumbs.push({ label, href: currentPath });
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
            )}
            {index === 0 ? (
              <Link
                to={breadcrumb.href}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Go to home page"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{breadcrumb.label}</span>
              </Link>
            ) : index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.href}
                className="hover:text-foreground transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
