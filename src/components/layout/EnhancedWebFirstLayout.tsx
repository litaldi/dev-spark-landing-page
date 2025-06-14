
import React from "react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SkipNavLink } from "@/components/a11y/skip-nav";

interface EnhancedWebFirstLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  includeBreadcrumbs?: boolean;
  fullWidth?: boolean;
  variant?: "default" | "minimal";
  className?: string;
}

export function EnhancedWebFirstLayout({
  children,
  title,
  description,
  includeBreadcrumbs = true,
  fullWidth = false,
  variant = "default",
  className,
}: EnhancedWebFirstLayoutProps) {
  return (
    <>
      <SkipNavLink contentId="main-content" className="fixed top-0 left-0">
        Skip to main content
      </SkipNavLink>
      <div className="min-h-screen flex flex-col bg-background w-full">
        <Navbar />
        <main id="main-content" aria-label="Main content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
