
import React from "react";
import { NavDropdown } from "./NavDropdown";
import { UserMenu } from "./UserMenu";
import { AuthButtons } from "./AuthButtons";
import { mainNavigationItems } from "./navigation-data";

interface WebFirstNavigationProps {
  isLoggedIn: boolean;
  userName: string | null;
  onLogout: () => void;
}

export function WebFirstNavigation({ isLoggedIn, userName, onLogout }: WebFirstNavigationProps) {
  return (
    <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
      {mainNavigationItems.map((item) => (
        <NavDropdown key={item.id} item={item} />
      ))}
      
      <div className="ml-6 flex items-center gap-3 pl-6 border-l border-border/50">
        {isLoggedIn && userName ? (
          <UserMenu userName={userName} onLogout={onLogout} />
        ) : (
          <AuthButtons />
        )}
      </div>
    </nav>
  );
}
