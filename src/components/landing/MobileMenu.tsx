
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import GetStartedButton from "./GetStartedButton";
import AuthButtons from "./AuthButtons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { sanitizeInput } from "@/lib/security";

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
  if (!isOpen) return null;

  // Sanitize user name for security
  const sanitizedUserName = userName ? sanitizeInput(userName) : null;

  return (
    <Sheet open={isOpen} onOpenChange={onMenuClose}>
      <SheetContent
        side="left"
        className="w-full sm:w-[350px] pt-12 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Menu</h2>
          <div className="flex items-center gap-2">
            <AccessibilityMenu />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <nav className="flex flex-col gap-y-4" aria-label="Mobile navigation menu">
            <NavLinks isMobile={true} onLinkClick={onMenuClose} />
          </nav>

          <hr className="my-6 border-t border-gray-200 dark:border-gray-800" aria-hidden="true" />

          <div className="space-y-4">
            {!isLoggedIn && (
              <>
                <GetStartedButton
                  isMobile={true}
                  onMenuClose={onMenuClose}
                  className="mb-2"
                />
                <div className="flex gap-3">
                  <button
                    className="flex-1 py-2 px-4 text-center rounded-md border border-gray-300 dark:border-gray-700 transition-colors hover:bg-accent"
                    onClick={() => {
                      toggleLoginState();
                      onMenuClose();
                    }}
                    aria-label="Try demo account"
                  >
                    Try Demo
                  </button>
                  <button
                    className="flex-1 py-2 px-4 text-center rounded-md border border-gray-300 dark:border-gray-700 transition-colors hover:bg-accent"
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

        <div className="mt-auto pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} DevAcademy. All rights reserved.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
