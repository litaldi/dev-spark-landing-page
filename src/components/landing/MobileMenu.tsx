
import React, { useRef, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import NavLinks from "./NavLinks";
import GetStartedButton from "./GetStartedButton";
import AuthButtons from "./AuthButtons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { sanitizeInput } from "@/lib/security";
import { announceToScreenReader } from "@/lib/keyboard-utils";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  userName,
  onMenuClose,
  onLogout,
  toggleLoginState
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Announce menu state changes to screen readers
  useEffect(() => {
    if (isOpen) {
      announceToScreenReader("Mobile menu opened", "polite");
    }
  }, [isOpen]);
  
  const handleMenuClose = () => {
    announceToScreenReader("Mobile menu closed", "polite");
    onMenuClose();
  };

  if (!isOpen) return null;

  // Sanitize user name for security
  const sanitizedUserName = userName ? sanitizeInput(userName) : null;

  return (
    <Sheet open={isOpen} onOpenChange={handleMenuClose}>
      <SheetContent
        side="left"
        className="w-full sm:w-[350px] pt-12 flex flex-col bg-background/95 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        ref={menuRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <nav className="space-y-2" aria-label="Mobile navigation menu">
            <NavLinks onItemClick={onMenuClose} />
          </nav>

          <Separator className="my-6" />

          <div className="space-y-4">
            {!isLoggedIn && (
              <>
                <GetStartedButton
                  isMobile={true}
                  onMenuClose={onMenuClose}
                  className="w-full justify-center bg-primary hover:bg-primary/90"
                />
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="py-2 px-4 text-center rounded-md border border-border bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      toggleLoginState();
                      onMenuClose();
                    }}
                    aria-label="Try demo account"
                  >
                    Try Demo
                  </button>
                  <button
                    className="py-2 px-4 text-center rounded-md border border-border bg-background hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => {
                      window.location.href = "/auth/login";
                      onMenuClose();
                    }}
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}

            {isLoggedIn && (
              <AuthButtons 
                isLoggedIn={isLoggedIn} 
                userName={sanitizedUserName}
                onLogout={onLogout}
                isMobile={true}
              />
            )}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} DevAcademy. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
