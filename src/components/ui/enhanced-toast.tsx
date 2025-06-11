
import React from "react";
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const toastVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.95,
    filter: "blur(4px)",
    transition: {
      duration: 0.2
    }
  }
};

const getToastIcon = (variant?: string) => {
  switch (variant) {
    case "destructive":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const getToastStyles = (variant?: string) => {
  switch (variant) {
    case "destructive":
      return "border-red-200 dark:border-red-800";
    case "success":
      return "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30";
    case "warning":
      return "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30";
    default:
      return "";
  }
};

export function EnhancedToaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      <AnimatePresence mode="popLayout">
        {toasts.map(function ({ id, title, description, action, variant, ...props }) {
          // Map custom variants to valid Toast component variants
          const toastVariant = variant === "destructive" ? "destructive" : "default";
          
          return (
            <motion.div
              key={id}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Toast
                variant={toastVariant}
                className={cn(
                  "group shadow-lg border border-border/50 backdrop-blur-sm",
                  getToastStyles(variant)
                )}
                {...props}
              >
                <div className="flex items-start gap-3">
                  {getToastIcon(variant)}
                  <div className="flex-1 space-y-1">
                    {title && <ToastTitle className="flex items-center gap-2">{title}</ToastTitle>}
                    {description && (
                      <ToastDescription className="text-sm opacity-90">
                        {description}
                      </ToastDescription>
                    )}
                  </div>
                </div>
                {action}
                <ToastClose className="opacity-60 hover:opacity-100 transition-opacity" />
              </Toast>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <ToastViewport className="fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </ToastProvider>
  );
}
