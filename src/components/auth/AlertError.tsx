
import React from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X } from "lucide-react";

interface AlertErrorProps {
  message: string | null;
}

export function AlertError({ message }: AlertErrorProps) {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mb-5"
    >
      <Alert 
        variant="destructive" 
        className="border-destructive/30 bg-destructive/10 text-destructive flex items-start justify-between gap-2"
      >
        <AlertDescription className="font-medium text-destructive text-sm py-1">
          {message}
        </AlertDescription>
        <X className="h-4 w-4 shrink-0 mt-0.5 opacity-70" aria-hidden="true" />
      </Alert>
    </motion.div>
  );
}
