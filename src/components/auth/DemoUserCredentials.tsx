
import React from "react";
import { Key } from "lucide-react";

export function DemoUserCredentials() {
  return (
    <div className="mt-4 pt-2 border-t border-border">
      <div className="flex items-center justify-center gap-2 mb-1">
        <Key className="h-3.5 w-3.5 text-muted-foreground/70" />
        <p className="text-xs font-medium text-muted-foreground/80">Demo Credentials</p>
      </div>
      <p className="text-xs text-muted-foreground/80 text-center">
        Email: demo@example.com<br />
        Password: demo1234
      </p>
    </div>
  );
}
