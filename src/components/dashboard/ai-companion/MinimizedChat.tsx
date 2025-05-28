
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Maximize2 } from "lucide-react";

interface MinimizedChatProps {
  onExpand: () => void;
}

export const MinimizedChat = ({ onExpand }: MinimizedChatProps) => {
  return (
    <Button
      onClick={onExpand}
      className="h-12 px-4 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2"
      aria-label="Expand AI Study Assistant"
    >
      <MessageSquare className="h-4 w-4" />
      <span className="hidden sm:inline text-sm font-medium">AI Assistant</span>
      <Maximize2 className="h-3 w-3" />
    </Button>
  );
};
