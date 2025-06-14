
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isThinking: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isThinking, disabled = false }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking || disabled) return;
    
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t bg-gray-50 dark:bg-gray-800/50">
      <div className="flex gap-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Voice mode active - speak your message" : "Ask me anything about your learning..."}
          disabled={isThinking || disabled}
          rows={1}
          className="flex-1 resize-none border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '36px', maxHeight: '100px' }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!inputValue.trim() || isThinking || disabled}
          className="h-9 w-9 bg-brand-500 hover:bg-brand-600 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
