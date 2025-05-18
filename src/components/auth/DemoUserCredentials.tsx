
import React from "react";
import { AlertCircle } from "lucide-react";

interface DemoUserCredentialsProps {
  email?: string;
  password?: string;
}

export function DemoUserCredentials({ email, password }: DemoUserCredentialsProps) {
  // Since we're removing demo functionality, this component will just be a placeholder
  // that doesn't display anything
  return null;
}
