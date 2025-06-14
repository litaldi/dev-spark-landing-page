
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConsolidatedLayout } from "@/components/layout/ConsolidatedLayout";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft } from "lucide-react";
import { announceToScreenReader } from "@/lib/keyboard-utils";

const NotFound = () => {
  const navigate = useNavigate();
  
  // Announce to screen readers
  useEffect(() => {
    announceToScreenReader("Page not found. The page you were looking for doesn't exist.", "assertive");
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
  
  return (
    <ConsolidatedLayout 
      title="Page Not Found"
      description="The page you were looking for doesn't exist"
      variant="centered"
    >
      <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
      <SkipNavContent id="main-content">
        <div className="container max-w-md text-center py-16 px-4">
          <div aria-hidden="true" className="mb-6 text-8xl font-bold text-primary/20">404</div>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you were looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button className="flex items-center gap-2" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </SkipNavContent>
    </ConsolidatedLayout>
  );
};

export default NotFound;
