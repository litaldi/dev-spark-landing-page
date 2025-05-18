
import React from "react";
import { CardContent } from "@/components/ui/card";
import { ChatMessage, ThinkingIndicator } from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatBodyProps {
  messages: ChatMessageType[];
  isThinking: boolean;
}

export const ChatBody = ({ messages, isThinking }: ChatBodyProps) => {
  return (
    <CardContent className="p-0">
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isThinking && <ThinkingIndicator />}
      </div>
    </CardContent>
  );
};
