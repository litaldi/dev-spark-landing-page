
import React from "react";

interface DemoUserCredentialsProps {
  email?: string;
  password?: string;
}

/**
 * This component previously displayed demo user credentials.
 * It's now removed for production use.
 */
export function DemoUserCredentials({ email, password }: DemoUserCredentialsProps) {
  // Component removed for production - no demo credentials should be displayed
  return null;
}
