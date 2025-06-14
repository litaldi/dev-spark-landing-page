
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  if (!password) return null;
  
  const hasLength = password.length >= 12; // Updated to 12 characters
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
  const getStrengthLabel = () => {
    if (strength <= 2) return { label: "Weak", variant: "destructive" as const };
    if (strength <= 4) return { label: "Medium", variant: "secondary" as const };
    return { label: "Strong", variant: "success" as const };
  };
  
  const { label, variant } = getStrengthLabel();
  
  return (
    <div className="mt-2 space-y-2" aria-live="polite">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-300",
              variant === "destructive" && "bg-destructive",
              variant === "secondary" && "bg-amber-500",
              variant === "success" && "bg-emerald-500"
            )}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <Badge variant={variant} className="ml-2">{label}</Badge>
      </div>
      <ul className="text-xs text-muted-foreground space-y-1">
        <li className="flex items-center gap-1">
          {hasLength ? <Check size={12} className="text-emerald-500" /> : <AlertTriangle size={12} className="text-amber-500" />}
          <span>At least 12 characters</span>
        </li>
        <li className="flex items-center gap-1">
          {hasUpperCase ? <Check size={12} className="text-emerald-500" /> : <AlertTriangle size={12} className="text-amber-500" />}
          <span>Contains uppercase letter</span>
        </li>
        <li className="flex items-center gap-1">
          {hasSpecialChar ? <Check size={12} className="text-emerald-500" /> : <AlertTriangle size={12} className="text-amber-500" />}
          <span>Contains special character</span>
        </li>
      </ul>
    </div>
  );
};
