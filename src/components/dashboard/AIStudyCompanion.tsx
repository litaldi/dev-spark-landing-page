
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

import { ChatMessage, AIStudyCompanionProps } from "./ai-companion/types";
import { ChatHeader } from "./ai-companion/ChatHeader";
import { ChatBody } from "./ai-companion/ChatBody";
import { ChatInput } from "./ai-companion/ChatInput";
import { ChatButton } from "./ai-companion/ChatButton";
import { MinimizedChat } from "./ai-companion/MinimizedChat";
import { getAIResponse } from "./ai-companion/utils";

export const AIStudyCompanion = ({ userName }: AIStudyCompanionProps) => {
  // State for chat visibility and minimized state
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Store chat messages in local storage
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>("aiChatHistory", [
    {
      id: "welcome-1",
      sender: "ai",
      text: `Hello ${userName}! I'm your AI learning assistant. How can I help you today?`,
      timestamp: new Date()
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = (inputValue: string) => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setIsThinking(true);
    
    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: getAIResponse(userMessage.text, userName),
        timestamp: new Date()
      };
      
      setChatMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsThinking(false);
    }, 1000);
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  if (!isOpen && !isMinimized) {
    return <ChatButton onClick={toggleChat} />;
  }

  return (
    <div 
      className={cn(
        "fixed z-40 transition-all duration-200",
        isMinimized 
          ? "bottom-6 right-6 w-auto h-auto" 
          : "bottom-6 right-6 w-80 md:w-96"
      )}
    >
      {isMinimized ? (
        <MinimizedChat onExpand={toggleChat} />
      ) : (
        <Card className="border shadow-lg overflow-hidden h-96">
          <ChatHeader 
            onMinimize={minimizeChat} 
            onClose={() => setIsOpen(false)} 
          />
          <ChatBody 
            messages={chatMessages}
            isThinking={isThinking}
          />
          <ChatInput 
            onSendMessage={handleSendMessage}
            isThinking={isThinking}
          />
        </Card>
      )}
    </div>
  );
};
