
import React from "react";

interface DemoUserCredentialsProps {
  email?: string;
  password?: string;
}

/**
 * This component previously displayed demo user credentials.
 * It's now a placeholder that doesn't render anything.
 */
export function DemoUserCredentials({ email, password }: DemoUserCredentialsProps) {
  // Return null as we're removing demo functionality
  return null;
}
