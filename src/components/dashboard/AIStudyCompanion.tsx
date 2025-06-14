import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { Volume2, Mic, MicOff, VolumeX } from "lucide-react";

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

  // Voice assistant state
  const [voiceMode, setVoiceMode] = useState(false);
  const [autoReadMessages, setAutoReadMessages] = useState(true);
  const [voiceNoticeViewed, setVoiceNoticeViewed] = useState(false);
  const voiceAssistant = useVoiceAssistant({
    onTranscript: (text) => {
      handleSendMessage(text);
    }
  });

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

  // Speak last AI message if voiceMode and autoReadMessages enabled
  useEffect(() => {
    if (
      voiceMode &&
      autoReadMessages &&
      chatMessages.length > 1 &&
      chatMessages[chatMessages.length - 1].sender === "ai"
    ) {
      voiceAssistant.speak(chatMessages[chatMessages.length - 1].text);
    }
    // eslint-disable-next-line
  }, [chatMessages, voiceMode, autoReadMessages]);

  // Voice controls overlay (simple, non-intrusive, always accessible via keyboard)
  const renderVoiceControls = () => (
    <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border-b border-muted select-none text-xs rounded-t-lg">
      <button 
        className={`flex items-center gap-1 px-2 py-1 rounded-md border transition focus:outline-none focus-visible:ring-2 ${
          voiceMode ? "bg-brand-100 dark:bg-brand-900 border-brand-400" : "bg-muted border-muted"
        }`} 
        onClick={() => setVoiceMode((prev) => !prev)}
        aria-pressed={voiceMode}
        tabIndex={0}
      >
        <Mic className="h-4 w-4 mr-0.5" /> {voiceMode ? "Voice ON" : "Voice"}
      </button>
      <button
        className="px-2 py-1 rounded-md bg-muted border border-muted hover:bg-muted/70 disabled:opacity-40"
        disabled={!voiceMode || voiceAssistant.isListening}
        onClick={voiceAssistant.startListening}
        aria-label="Start voice input"
        tabIndex={0}
      >
        <Mic className={`h-4 w-4 ${voiceAssistant.isListening ? "animate-pulse text-primary" : ""}`} />
      </button>
      <button
        className="px-2 py-1 rounded-md bg-muted border border-muted hover:bg-muted/70"
        disabled={!voiceMode || !voiceAssistant.isListening}
        onClick={voiceAssistant.stopListening}
        aria-label="Stop voice input"
        tabIndex={0}
      >
        <MicOff className="h-4 w-4" />
      </button>
      <button
        className="px-2 py-1 rounded-md bg-muted border border-muted hover:bg-muted/70"
        onClick={() => setAutoReadMessages((v) => !v)}
        aria-pressed={autoReadMessages}
        tabIndex={0}
      >
        {autoReadMessages ? (
          <Volume2 className="h-4 w-4 text-green-600" />
        ) : (
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="ml-1">{autoReadMessages ? "Speak" : "Mute"}</span>
      </button>
    </div>
  );

  // Voice-Mode Setup Notice (shows once)
  const renderVoiceNotice = () =>
    !voiceNoticeViewed && voiceMode && (
      <div className="p-3 text-sm bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-200 border-b border-yellow-200 dark:border-yellow-800 flex items-center gap-2" tabIndex={0}>
        <Mic className="h-4 w-4 mr-2 text-yellow-600" />
        <span>
          Voice Assistant enabled! Grant microphone permissions and try saying your question out loud.
        </span>
        <button
          className="ml-auto px-2 py-1 bg-muted rounded text-xs border"
          onClick={() => setVoiceNoticeViewed(true)}
        >
          Got it
        </button>
      </div>
    );

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
        <Card className="border shadow-lg overflow-hidden h-96 flex flex-col">
          {/* Voice Controls at top */}
          {renderVoiceControls()}
          {/* One-time setup notice */}
          {renderVoiceNotice()}
          <ChatHeader 
            onMinimize={minimizeChat} 
            onClose={() => setIsOpen(false)} 
          />
          <ChatBody 
            messages={chatMessages}
            isThinking={isThinking || voiceAssistant.isListening}
          />
          {/* If voice mode is on, disable input while listening */}
          <ChatInput 
            onSendMessage={handleSendMessage}
            isThinking={isThinking || (voiceMode && voiceAssistant.isListening)}
            disabled={voiceMode && voiceAssistant.isListening}
          />
        </Card>
      )}
    </div>
  );
};
