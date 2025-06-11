
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  ripple?: boolean;
  glowing?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  loading = false,
  loadingText,
  ripple = true,
  glowing = false,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const buttonVariants = {
    idle: { scale: 1, boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.1)" },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.div
      variants={buttonVariants}
      initial="idle"
      whileHover={!loading && !disabled ? "hover" : "idle"}
      whileTap={!loading && !disabled ? "tap" : "idle"}
      className="inline-block"
    >
      <Button
        {...props}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          glowing && "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:animate-pulse",
          ripple && "before:transition-all before:duration-300",
          className
        )}
      >
        {loading && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText && <span>{loadingText}</span>}
          </motion.div>
        )}
        
        {!loading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: loading ? 0 : 1 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.div>
        )}

        {ripple && isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </Button>
    </motion.div>
  );
};
