
import React from "react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { RecommendedContent } from "@/components/dashboard/RecommendedContent";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { AIStudyCompanion } from "@/components/dashboard/AIStudyCompanion";
import { MotivationalPrompts } from "@/components/dashboard/MotivationalPrompts";
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface DashboardContentProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onError: (error: string | null) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  userName,
  isFirstTimeUser,
  isLoading,
  onError
}) => {
  const { 
    startFirstLesson, 
    startSession, 
    startLesson,
    handleAction
  } = useDashboardActions(onError);

  // Get last activity timestamp from localStorage
  const lastActivityDate = localStorage.getItem("lastSessionDate");

  return (
    <>
      <WelcomeSection
        userName={userName}
        isFirstTimeUser={isFirstTimeUser}
        isLoading={isLoading}
        onStartFirstLesson={startFirstLesson}
        onStartTodaysSession={startSession}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProgressSection 
            weeklyGoalHours={10}
            currentHours={2}
            streakDays={5}
            lessonsCompleted={2}
            projectsStarted={1}
            isLoading={isLoading}
          />
          
          <AIRecommendations 
            userName={userName}
            isLoading={isLoading}
          />
          
          <LearningPathSection 
            isLoading={isLoading}
            onStartLesson={startLesson}
          />
          
          <RecommendedContent 
            isLoading={isLoading} 
            onStartLesson={startLesson}
          />
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <RecentActivitySection isLoading={isLoading} />
          
          <div className="fixed bottom-6 right-6 md:static md:mt-4 md:flex md:justify-end">
            <Button 
              variant="outline"
              size="sm"
              className="rounded-full h-12 w-12 md:h-auto md:w-auto md:rounded-md md:px-4 shadow-lg md:shadow-none bg-white dark:bg-gray-800"
              aria-label="Get help with dashboard features"
              onClick={() => handleAction('help')}
            >
              <HelpCircle className="h-6 w-6 md:h-4 md:w-4 md:mr-2" />
              <span className="hidden md:inline">Get Help</span>
            </Button>
          </div>
        </div>
      </div>

      {/* AI Study Companion (floating chat widget) */}
      <AIStudyCompanion userName={userName} />
      
      {/* Motivational Prompts (floating notifications) */}
      <MotivationalPrompts userName={userName} lastActivity={lastActivityDate} />
    </>
  );
};
