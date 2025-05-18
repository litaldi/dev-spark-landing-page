
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Calendar, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface MotivationalPromptsProps {
  userName: string;
  lastActivity?: Date | string | null;
}

interface Prompt {
  id: string;
  text: string;
  category: 'motivation' | 'reminder' | 'suggestion' | 'celebration';
  dismissable: boolean;
  actionable: boolean;
  actionText?: string;
}

export const MotivationalPrompts = ({ userName, lastActivity }: MotivationalPromptsProps) => {
  // Store prompts and user feedback in local storage
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>("motivationalPrompts", []);
  const [feedback, setFeedback] = useLocalStorage<Record<string, boolean>>("promptFeedback", {});
  const [activePrompt, setActivePrompt] = useState<Prompt | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Generate a new prompt based on user context
  useEffect(() => {
    // Only show prompts if we don't already have an active prompt
    if (showPrompt || activePrompt) return;

    const now = new Date();
    const lastActivityDate = lastActivity ? new Date(lastActivity) : null;
    const daysSinceLastActivity = lastActivityDate 
      ? Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)) 
      : null;
    
    let newPrompt: Prompt | null = null;
    
    // Determine which prompt to show based on user context
    if (daysSinceLastActivity === null) {
      // New user
      newPrompt = {
        id: `welcome-${Date.now()}`,
        text: `Welcome to your learning journey, ${userName}! Ready to build some amazing skills?`,
        category: 'motivation',
        dismissable: true,
        actionable: true,
        actionText: "Start Learning"
      };
    } else if (daysSinceLastActivity > 3) {
      // Returning after absence
      newPrompt = {
        id: `return-${Date.now()}`,
        text: `Welcome back, ${userName}! It's been ${daysSinceLastActivity} days. Ready to continue where you left off?`,
        category: 'reminder',
        dismissable: true,
        actionable: true,
        actionText: "Resume Course"
      };
    } else if (daysSinceLastActivity === 0) {
      // Active today
      newPrompt = {
        id: `streak-${Date.now()}`,
        text: "You're on a roll today! One more lesson would make this your most productive day this week.",
        category: 'motivation',
        dismissable: true,
        actionable: true,
        actionText: "One More Lesson"
      };
    } else {
      // Default prompt
      const promptOptions = [
        "Did you know regular short study sessions are more effective than cramming?",
        "Your brain absorbs information better when you practice consistently!",
        "Taking notes while learning can improve retention by up to 30%.",
        "Try explaining concepts to someone else - it's one of the best ways to solidify your understanding."
      ];
      
      newPrompt = {
        id: `tip-${Date.now()}`,
        text: promptOptions[Math.floor(Math.random() * promptOptions.length)],
        category: 'suggestion',
        dismissable: true,
        actionable: false
      };
    }
    
    setActivePrompt(newPrompt);
    setShowPrompt(true);
    
    // Add to prompt history
    setPrompts([...prompts, newPrompt]);
    
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [userName, lastActivity, prompts, setPrompts, feedback, setFeedback, activePrompt, showPrompt]);

  if (!showPrompt || !activePrompt) return null;

  // Handle user feedback on prompt
  const handleFeedback = (promptId: string, isHelpful: boolean) => {
    setFeedback({ ...feedback, [promptId]: isHelpful });
    setShowPrompt(false);
  };
  
  // Handle prompt action
  const handleAction = () => {
    console.log("Prompt action triggered:", activePrompt?.actionText);
    // Here we would implement the actual action logic
    setShowPrompt(false);
  };
  
  // Dismiss the prompt
  const handleDismiss = () => {
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-30 max-w-sm animate-fade-in">
      <Card className={cn(
        "shadow-lg border-l-4",
        activePrompt?.category === 'motivation' && "border-l-brand-500",
        activePrompt?.category === 'reminder' && "border-l-amber-500",
        activePrompt?.category === 'suggestion' && "border-l-sky-500",
        activePrompt?.category === 'celebration' && "border-l-emerald-500"
      )}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <p className="text-sm">{activePrompt.text}</p>
              
              {activePrompt.actionable && (
                <Button 
                  size="sm" 
                  onClick={handleAction}
                  className="mt-2 h-8"
                >
                  {activePrompt.actionText || "Let's Go"}
                </Button>
              )}
              
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeedback(activePrompt.id, true)}
                  className="h-6 w-6 p-0"
                  aria-label="This was helpful"
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeedback(activePrompt.id, false)}
                  className="h-6 w-6 p-0"
                  aria-label="This was not helpful"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {activePrompt.dismissable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
