
import React from "react";
import { cn } from "@/lib/utils";

export interface SkipNavLinkProps {
  children?: React.ReactNode;
  className?: string;
  contentId?: string;
}

// This component creates an accessible "skip navigation" link for keyboard users
export function SkipNavLink({
  children = "Skip to content",
  className,
  contentId = "skip-nav-content",
  ...props
}: SkipNavLinkProps & React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 z-50 focus:outline-none rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export interface SkipNavContentProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

// This component marks the target destination for the skip nav link
export function SkipNavContent({
  children,
  id = "skip-nav-content",
  className,
  ...props
}: SkipNavContentProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div id={id} className={className} tabIndex={-1} {...props}>
      {children}
    </div>
  );
}
