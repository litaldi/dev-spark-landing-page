
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { WebFirstNavigation } from "@/components/navigation/WebFirstNavigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { useNavbarState } from "@/hooks/use-navbar-state";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";

export function WebFirstHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarState = useNavbarState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg border-border/50" 
          : "bg-background/80 backdrop-blur-sm border-border/30"
      )}
      role="banner"
    >
      <div className="container mx-auto h-16 flex items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 font-bold text-xl hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md group"
          aria-label="DevAI Home"
        >
          <div 
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-xl transition-transform duration-200 group-hover:scale-105" 
            aria-hidden="true"
          >
            D
          </div>
          <span className="hidden sm:inline text-foreground">DevAI</span>
        </Link>

        {/* Desktop Navigation */}
        <WebFirstNavigation 
          isLoggedIn={navbarState.isLoggedIn}
          userName={navbarState.userName}
          onLogout={navbarState.handleLogout}
        />

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Accessibility and Theme Controls */}
          <div className="hidden md:flex items-center gap-1">
            <AccessibilityMenu />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-accent/80 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <MobileNavigation 
                isLoggedIn={navbarState.isLoggedIn}
                userName={navbarState.userName}
                onLogout={navbarState.handleLogout}
                onClose={() => setMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
