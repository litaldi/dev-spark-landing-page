
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Calendar, ThumbsUp, ThumbsDown, X, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface MotivationalPromptsProps {
  userName: string;
  lastActivity?: Date | string | null;
}

interface Prompt {
  id: string;
  text: string;
  category: 'motivation' | 'reminder' | 'suggestion' | 'celebration' | 'check_in';
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
  const [promptFrequency, setPromptFrequency] = useLocalStorage<number>("promptFrequency", 20); // minutes between prompts
  const [lastPromptTime, setLastPromptTime] = useLocalStorage<string | null>("lastPromptTime", null);

  // Generate a new prompt based on user context
  useEffect(() => {
    // Only show prompts if we don't already have an active prompt
    if (showPrompt || activePrompt) return;
    
    // Check if enough time has passed since last prompt
    if (lastPromptTime) {
      const lastTime = new Date(lastPromptTime);
      const now = new Date();
      const minutesSinceLastPrompt = (now.getTime() - lastTime.getTime()) / (1000 * 60);
      
      // If not enough time has passed, don't show a prompt
      if (minutesSinceLastPrompt < promptFrequency) return;
    }

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
      // Active today - pick between different types of prompts
      const promptTypes = [
        // Check-in prompt
        {
          id: `check-in-${Date.now()}`,
          text: "How's your learning going today? Feeling confident with the material?",
          category: 'check_in' as const,
          dismissable: true,
          actionable: true,
          actionText: "I'm Doing Great"
        },
        // Streak motivation
        {
          id: `streak-${Date.now()}`,
          text: "You're on a roll today! One more lesson would make this your most productive day this week.",
          category: 'motivation' as const,
          dismissable: true,
          actionable: true,
          actionText: "One More Lesson"
        },
        // Celebration prompt
        {
          id: `celebrate-${Date.now()}`,
          text: "Great work today! You've already spent more time learning than 80% of users.",
          category: 'celebration' as const,
          dismissable: true,
          actionable: false
        }
      ];
      
      // Randomly select one of the prompt types
      newPrompt = promptTypes[Math.floor(Math.random() * promptTypes.length)];
    } else {
      // Default prompt - learning tips
      const promptOptions = [
        "Did you know regular short study sessions are more effective than cramming?",
        "Your brain absorbs information better when you practice consistently!",
        "Taking notes while learning can improve retention by up to 30%.",
        "Try explaining concepts to someone else - it's one of the best ways to solidify your understanding.",
        "Setting specific goals for each study session can increase your focus and productivity.",
        "Taking short breaks every 25 minutes can actually improve your learning efficiency.",
        "Connecting new concepts to things you already know helps with memory retention."
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
    setLastPromptTime(new Date().toISOString());
    
    // Add to prompt history
    setPrompts([...prompts, newPrompt]);
    
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [userName, lastActivity, prompts, setPrompts, feedback, setFeedback, activePrompt, showPrompt, promptFrequency, lastPromptTime, setLastPromptTime]);

  if (!showPrompt || !activePrompt) return null;

  // Handle user feedback on prompt
  const handleFeedback = (promptId: string, isHelpful: boolean) => {
    setFeedback({ ...feedback, [promptId]: isHelpful });
    
    // Adjust prompt frequency based on feedback
    if (!isHelpful && promptFrequency < 60) {
      // If not helpful, show prompts less often
      setPromptFrequency(prev => prev + 5);
    } else if (isHelpful && promptFrequency > 10) {
      // If helpful, show prompts more often
      setPromptFrequency(prev => prev - 5);
    }
    
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

  const getPromptIcon = () => {
    switch (activePrompt.category) {
      case 'motivation':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'reminder': 
        return <Bell className="h-5 w-5 text-brand-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      case 'celebration':
        return <ThumbsUp className="h-5 w-5 text-emerald-500" />;
      case 'check_in':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-30 max-w-sm animate-fade-in">
      <Card className={cn(
        "shadow-lg border-l-4",
        activePrompt?.category === 'motivation' && "border-l-amber-500",
        activePrompt?.category === 'reminder' && "border-l-brand-500",
        activePrompt?.category === 'suggestion' && "border-l-sky-500",
        activePrompt?.category === 'celebration' && "border-l-emerald-500",
        activePrompt?.category === 'check_in' && "border-l-purple-500"
      )}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <div className="flex items-center mb-2">
                {getPromptIcon()}
                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {activePrompt.category.replace('_', ' ')}
                </span>
              </div>
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
