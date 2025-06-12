
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mobileNavigationSections } from "./navigation-data";

interface MobileNavigationContentProps {
  onLinkClick: () => void;
}

export function MobileNavigationContent({ onLinkClick }: MobileNavigationContentProps) {
  const location = useLocation();

  return (
    <div className="flex-1 overflow-auto p-6">
      <nav className="space-y-8">
        {mobileNavigationSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 px-1 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary rounded-full"></span>
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={onLinkClick}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    "hover:bg-accent/80 active:bg-accent group border border-transparent",
                    "hover:border-border/50 hover:shadow-sm hover:scale-[1.02]",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground shadow-md border-primary/20 scale-[1.02]"
                      : "text-foreground hover:text-primary"
                  )}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors",
                    location.pathname === item.path 
                      ? "bg-primary-foreground/10" 
                      : "bg-primary/10 group-hover:bg-primary/20"
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      location.pathname === item.path 
                        ? "text-primary-foreground" 
                        : "text-primary"
                    )} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold">{item.label}</span>
                    <span className={cn(
                      "text-xs mt-0.5 leading-relaxed",
                      location.pathname === item.path 
                        ? "text-primary-foreground/80" 
                        : "text-muted-foreground group-hover:text-foreground/80"
                    )}>
                      {item.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
