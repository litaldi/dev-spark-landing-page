
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface NavigationItemProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  active?: boolean;
}

export function NavigationItem({ 
  href, 
  children, 
  external = false, 
  className,
  active 
}: NavigationItemProps) {
  const location = useLocation();
  const isActive = active || location.pathname === href;

  const baseClasses = cn(
    "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
    "hover:text-primary hover:bg-primary/5",
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200",
    isActive && "text-primary after:w-3/4",
    "hover:after:w-3/4",
    className
  );

  if (external) {
    return (
      <a 
        href={href} 
        className={baseClasses}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={baseClasses}>
      {children}
    </Link>
  );
}

interface DropdownNavigationProps {
  trigger: React.ReactNode;
  items: Array<{
    href: string;
    label: string;
    description?: string;
    external?: boolean;
  }>;
  className?: string;
}

export function DropdownNavigation({ trigger, items, className }: DropdownNavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          "hover:text-primary hover:bg-primary/5",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "text-primary bg-primary/5"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-lg shadow-lg z-20 py-2">
            {items.map((item, index) => (
              <div key={index}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium text-sm">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    )}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-medium text-sm">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
