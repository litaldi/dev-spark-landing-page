
import React, { useState } from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isThinking: boolean;
}

export const ChatInput = ({ onSendMessage, isThinking }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <CardFooter className="p-3 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1"
          disabled={isThinking}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isThinking || !inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </CardFooter>
  );
};
