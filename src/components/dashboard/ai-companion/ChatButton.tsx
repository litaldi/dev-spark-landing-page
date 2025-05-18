
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white"
      aria-label="Open AI Study Assistant"
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
};
