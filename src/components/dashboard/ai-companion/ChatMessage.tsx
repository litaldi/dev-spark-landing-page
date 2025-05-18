
import React from "react";
import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div 
      className={cn(
        "flex",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
          message.sender === 'user' 
            ? "bg-brand-500 text-white rounded-br-none" 
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none"
        )}
      >
        {message.text}
      </div>
    </div>
  );
};

export const ThinkingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-bl-none px-3 py-2 text-sm max-w-[80%]">
        <div className="flex gap-1 items-center">
          <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse delay-100"></div>
          <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};
