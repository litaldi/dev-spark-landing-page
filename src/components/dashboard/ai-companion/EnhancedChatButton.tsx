
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EnhancedChatButtonProps {
  onClick: () => void;
  hasUnreadHistory?: boolean;
  messageCount?: number;
}

export const EnhancedChatButton = ({ 
  onClick, 
  hasUnreadHistory = false,
  messageCount = 0 
}: EnhancedChatButtonProps) => {
  return (
    <div className="relative">
      <Button
        onClick={onClick}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white transition-all duration-200 hover:scale-105"
        aria-label={`Open AI Study Assistant${messageCount > 0 ? ` (${messageCount} messages)` : ''}`}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      
      {/* Message count badge */}
      {messageCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-500"
          aria-label={`${messageCount} chat messages`}
        >
          {messageCount > 99 ? '99+' : messageCount}
        </Badge>
      )}
      
      {/* History indicator */}
      {hasUnreadHistory && (
        <div className="absolute -top-0.5 -left-0.5 h-3 w-3 bg-green-500 rounded-full animate-pulse" 
             aria-label="New chat history available" />
      )}
    </div>
  );
};
