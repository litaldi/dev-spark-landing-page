
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2, Download } from 'lucide-react';
import { ChatMessage } from './types';
import { ChatMessage as ChatMessageComponent } from './ChatMessage';

interface ChatHistoryProps {
  messages: ChatMessage[];
  onClearHistory: () => void;
  onExportHistory: () => void;
}

export const ChatHistory = ({ messages, onClearHistory, onExportHistory }: ChatHistoryProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">Chat History</h3>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onExportHistory}
            className="h-7 w-7"
            aria-label="Export chat history"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearHistory}
            className="h-7 w-7"
            aria-label="Clear chat history"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
