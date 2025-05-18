
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { Link } from "react-router-dom";
import { DemoUserButton } from "@/components/auth/DemoUserButton";

interface MobileMenuProps {
  isOpen: boolean;
  isLoggedIn: boolean;
  userName: string | null;
  isDemoUser: boolean;
  onMenuClose: () => void;
  onLogout: () => void;
  toggleLoginState?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isLoggedIn,
  userName,
  isDemoUser,
  onMenuClose,
  onLogout,
  toggleLoginState,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onMenuClose()}>
      <SheetContent side="left" className="w-[85vw] max-w-[400px] sm:w-[385px] pt-12">
        <NavigationMenu className="w-full max-w-full" orientation="vertical">
          <NavigationMenuList className="flex-col w-full items-start gap-2">
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink
                asChild
                className={cn(
                  "w-full flex py-3 px-4 hover:bg-accent rounded-md",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                )}
              >
                <Link to="/" onClick={onMenuClose}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink
                asChild
                className={cn(
                  "w-full flex py-3 px-4 hover:bg-accent rounded-md",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                )}
              >
                <Link to="/about" onClick={onMenuClose}>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink
                asChild
                className={cn(
                  "w-full flex py-3 px-4 hover:bg-accent rounded-md",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                )}
              >
                <Link to="/contact" onClick={onMenuClose}>Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <NavigationMenuLink
                asChild
                className={cn(
                  "w-full flex py-3 px-4 hover:bg-accent rounded-md",
                  "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                )}
              >
                <Link to="/faq" onClick={onMenuClose}>FAQ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {!isLoggedIn && (
            <div className="space-y-2 px-2">
              <DemoUserButton variant="default" showText={true} onSuccess={onMenuClose} className="w-full justify-center"/>
              <div className="flex space-x-2 mt-4">
                <Button asChild className="flex-1" onClick={onMenuClose}>
                  <Link to="/auth/login">Log In</Link>
                </Button>
                <Button asChild className="flex-1" variant="secondary" onClick={onMenuClose}>
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
          
          {isLoggedIn && (
            <div className="space-y-4 px-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Signed in as <span className="font-medium text-gray-900 dark:text-gray-200">{userName}</span>
                {isDemoUser && <span className="ml-1 text-brand-600 dark:text-brand-400">(Demo)</span>}
              </p>
              <div className="flex space-x-2">
                <Button asChild className="flex-1">
                  <Link to="/dashboard" onClick={onMenuClose}>Dashboard</Link>
                </Button>
                <Button 
                  className="flex-1" 
                  variant="outline" 
                  onClick={() => {
                    onLogout();
                    onMenuClose();
                  }}
                >
                  Log Out
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between px-2 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Preferences</p>
            <div className="flex items-center gap-2">
              <AccessibilityMenu />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
