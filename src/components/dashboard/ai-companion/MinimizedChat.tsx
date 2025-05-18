
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface MinimizedChatProps {
  onExpand: () => void;
}

export const MinimizedChat = ({ onExpand }: MinimizedChatProps) => {
  return (
    <Button
      onClick={onExpand}
      className="h-12 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 px-4"
      aria-label="Expand AI Study Assistant"
    >
      <MessageSquare className="h-5 w-5" />
      <span className="font-medium">AI Assistant</span>
    </Button>
  );
};
