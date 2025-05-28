
import React from "react";
import { Button } from "@/components/ui/button";
import { Minimize2, X, Bot } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader = ({ onMinimize, onClose }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-brand-50 dark:bg-brand-900/20">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-brand-100 dark:bg-brand-800 rounded-full">
          <Bot className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        </div>
        <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
          AI Study Assistant
        </h3>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="h-7 w-7"
          aria-label="Minimize chat"
        >
          <Minimize2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7"
          aria-label="Close chat"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
