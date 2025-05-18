
import React from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Minimize, X } from "lucide-react";

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader = ({ onMinimize, onClose }: ChatHeaderProps) => {
  return (
    <CardHeader className="py-3 px-4 bg-brand-500 text-white">
      <div className="flex justify-between items-center">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Study Companion
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMinimize}
            className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-brand-600"
            aria-label="Minimize chat"
          >
            <Minimize className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-brand-600"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};
