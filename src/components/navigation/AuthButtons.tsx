
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild className="hover:bg-accent/80 transition-colors font-medium">
        <Link to="/auth/login">Sign In</Link>
      </Button>
      <Button size="sm" asChild className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
        <Link to="/auth/register">Get Started Free</Link>
      </Button>
    </div>
  );
}
