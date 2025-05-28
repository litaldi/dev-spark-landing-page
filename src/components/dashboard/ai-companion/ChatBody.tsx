
import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./types";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBodyProps {
  messages: ChatMessage[];
  isThinking: boolean;
}

export const ChatBody = ({ messages, isThinking }: ChatBodyProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-white dark:bg-gray-900">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-2",
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.sender === 'ai' && (
            <div className="flex-shrink-0 p-1.5 bg-brand-100 dark:bg-brand-800 rounded-full">
              <Bot className="h-3 w-3 text-brand-600 dark:text-brand-400" />
            </div>
          )}
          
          <div
            className={cn(
              "max-w-[80%] p-2.5 rounded-lg text-sm",
              message.sender === 'user'
                ? "bg-brand-500 text-white rounded-br-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
            )}
          >
            {message.text}
          </div>
          
          {message.sender === 'user' && (
            <div className="flex-shrink-0 p-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
              <User className="h-3 w-3 text-gray-600 dark:text-gray-400" />
            </div>
          )}
        </div>
      ))}
      
      {isThinking && (
        <div className="flex gap-2 justify-start">
          <div className="flex-shrink-0 p-1.5 bg-brand-100 dark:bg-brand-800 rounded-full">
            <Bot className="h-3 w-3 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-lg rounded-bl-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
