
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Award, MessageSquare, History } from "lucide-react";

export const QuickAccessShortcuts: React.FC = () => {
  // Handle button clicks
  const handleResumeLastSession = () => {
    console.log("Resume last session");
    // Implementation would continue last lesson or activity
  };
  
  const handleCodeChallenge = () => {
    console.log("Start code challenge");
    // Navigate to code challenge section
  };
  
  const handleViewProgress = () => {
    console.log("View progress");
    // Navigate to detailed progress section
  };
  
  const handleChatAI = () => {
    console.log("Chat with AI");
    // Open AI chat interface
  };
  
  const handleViewHistory = () => {
    console.log("View history");
    // Navigate to learning history
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={handleResumeLastSession}
          >
            <BookOpen className="h-4 w-4" />
            <span>Resume Learning</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={handleCodeChallenge}
          >
            <Code className="h-4 w-4" />
            <span>Code Challenge</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={handleViewProgress}
          >
            <Award className="h-4 w-4" />
            <span>View Progress</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={handleChatAI}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat AI</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 h-9"
            onClick={handleViewHistory}
          >
            <History className="h-4 w-4" />
            <span>History</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
