
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainNavigationItems } from "./navigation-data";

interface NavDropdownProps {
  item: typeof mainNavigationItems[0];
}

export function NavDropdown({ item }: NavDropdownProps) {
  const location = useLocation();

  if (!item.children) {
    return (
      <Link
        to={item.path}
        className={cn(
          "px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-primary rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "relative group flex items-center gap-2.5",
          location.pathname === item.path 
            ? "text-primary bg-primary/10 shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
        )}
        aria-current={location.pathname === item.path ? "page" : undefined}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.label}</span>
        {location.pathname === item.path && (
          <span 
            className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" 
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "relative group h-auto flex items-center gap-2.5 rounded-lg",
            location.pathname.startsWith(item.path) && item.path !== "/" 
              ? "text-primary bg-primary/10 shadow-sm" 
              : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
          <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
          {location.pathname.startsWith(item.path) && item.path !== "/" && (
            <span 
              className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" 
              aria-hidden="true"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-80 bg-background/95 backdrop-blur-sm border shadow-xl z-50 p-3"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2.5 text-sm font-bold text-foreground flex items-center gap-2.5 border-b border-border/50 mb-2">
          <item.icon className="h-4 w-4 text-primary" />
          <span>{item.label}</span>
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {item.children.length} items
          </span>
        </DropdownMenuLabel>
        
        <div className="grid gap-1.5">
          {item.children.map((child) => (
            <DropdownMenuItem key={child.id} asChild className="p-0">
              <Link
                to={child.path}
                className={cn(
                  "flex items-start gap-3 px-3 py-3.5 text-sm cursor-pointer rounded-lg transition-all duration-200 group",
                  "hover:bg-accent/80 focus:bg-accent/80 hover:scale-[1.02] focus:scale-[1.02]",
                  "border border-transparent hover:border-border/50 focus:border-primary/30",
                  location.pathname === child.path && "bg-primary/10 border-primary/20"
                )}
              >
                <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <child.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className={cn(
                    "font-semibold group-hover:text-primary transition-colors",
                    location.pathname === child.path ? "text-primary" : "text-foreground"
                  )}>
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {child.description}
                    </span>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
