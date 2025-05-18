
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageSquare, X, Minimize, Maximize, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface AIStudyCompanionProps {
  userName: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

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

  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Mock AI responses based on keywords
  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("html") || lowerQuery.includes("structure")) {
      return "HTML (HyperText Markup Language) defines the structure of web content. Start with basic tags like <!DOCTYPE html>, <html>, <head>, and <body> to create your first webpage.";
    }
    
    if (lowerQuery.includes("css") || lowerQuery.includes("style")) {
      return "CSS (Cascading Style Sheets) controls the presentation of HTML elements. You can use selectors to target elements and apply properties like color, font-size, and margin.";
    }
    
    if (lowerQuery.includes("javascript") || lowerQuery.includes("js") || lowerQuery.includes("function")) {
      return "JavaScript is a programming language that enables interactive web pages. You can use functions, variables, and events to create dynamic content.";
    }
    
    if (lowerQuery.includes("react")) {
      return "React is a JavaScript library for building user interfaces, particularly single-page applications. It uses components to create reusable UI elements and a virtual DOM for efficient rendering.";
    }
    
    if (lowerQuery.includes("help") || lowerQuery.includes("stuck")) {
      return "I'd be happy to help! Could you provide more details about what you're working on or what concept you're struggling with?";
    }
    
    return "That's an interesting question! Let me guide you through this topic. What specific aspect would you like to know more about?";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, userMessage]);
    setInputValue("");
    setIsThinking(true);
    
    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: getAIResponse(userMessage.text),
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
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white"
        aria-label="Open AI Study Assistant"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
    );
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
        <Button
          onClick={toggleChat}
          className="h-12 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 px-4"
          aria-label="Expand AI Study Assistant"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium">AI Assistant</span>
        </Button>
      ) : (
        <Card className="border shadow-lg overflow-hidden h-96">
          <CardHeader className="py-3 px-4 bg-brand-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Study Companion
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={minimizeChat}
                  className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-brand-600"
                  aria-label="Minimize chat"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-white/80 hover:text-white hover:bg-brand-600"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      msg.sender === 'user' 
                        ? "bg-brand-500 text-white rounded-br-none" 
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg rounded-bl-none px-3 py-2 text-sm max-w-[80%]">
                    <div className="flex gap-1 items-center">
                      <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse delay-100"></div>
                      <div className="h-2 w-2 bg-brand-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
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
        </Card>
      )}
    </div>
  );
};
