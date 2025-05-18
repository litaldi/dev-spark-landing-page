
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
import { useViewportSize, useBreakpoint } from "@/hooks/use-mobile";

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
  
  const breakpoint = useBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "mobile";
  const isTabletScreen = breakpoint === "tablet";

  // Get last activity timestamp from localStorage
  const lastActivityDate = localStorage.getItem("lastSessionDate");
  const userTopics = localStorage.getItem("userTopics") || "web development, JavaScript, React";

  return (
    <>
      <WelcomeSection
        userName={userName}
        isFirstTimeUser={isFirstTimeUser}
        isLoading={isLoading}
        onStartFirstLesson={startFirstLesson}
        onStartTodaysSession={startSession}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
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
            userTopics={userTopics.split(", ")}
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
        
        <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
          <RecentActivitySection isLoading={isLoading} />
          
          <div className={`${isSmallScreen || isTabletScreen ? 'fixed bottom-6 right-6 z-10' : 'mt-4 flex justify-end'}`}>
            <Button 
              variant="outline"
              size={isSmallScreen ? "icon" : "sm"}
              className={`${isSmallScreen ? 'rounded-full h-12 w-12 shadow-lg bg-white dark:bg-gray-800' : 'rounded-md'}`}
              aria-label="Get help with dashboard features"
              onClick={() => handleAction('help')}
            >
              <HelpCircle className={`${isSmallScreen ? 'h-6 w-6' : 'h-4 w-4 mr-2'}`} />
              {!isSmallScreen && <span>Get Help</span>}
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
