
import React from "react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertErrorProps {
  message: string | null;
}

export function AlertError({ message }: AlertErrorProps) {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
        <AlertDescription className="font-medium text-destructive">{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
