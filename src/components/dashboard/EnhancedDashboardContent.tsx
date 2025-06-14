
import React from "react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { RecommendedContent } from "@/components/dashboard/RecommendedContent";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { AIStudyCompanion } from "@/components/dashboard/AIStudyCompanion";
import { MotivationalPrompts } from "@/components/dashboard/MotivationalPrompts";
import { StreakReminder } from "@/components/dashboard/StreakReminder";
import { EnhancedProgressSection } from "@/components/dashboard/EnhancedProgressSection";
import { InteractiveLearningMetrics } from "@/components/dashboard/InteractiveLearningMetrics";
import { StudySessionTimer } from "@/components/dashboard/StudySessionTimer";
import { SmartRecommendationEngine } from "@/components/dashboard/SmartRecommendationEngine";
import { LearningPathCustomizer } from "@/components/dashboard/LearningPathCustomizer";
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";
import { Button } from "@/components/ui/button";
import { HelpCircle, Download } from "lucide-react";
import { useViewportSize, useBreakpoint } from "@/hooks/use-mobile";
import { exportProgressReport, exportProgressCSV } from "@/lib/export-utils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

interface EnhancedDashboardContentProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onError: (error: string | null) => void;
}

export const EnhancedDashboardContent: React.FC<EnhancedDashboardContentProps> = ({
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

  // Get data from localStorage for progress tracking
  const lastActivityDate = localStorage.getItem("lastSessionDate");
  const userTopics = localStorage.getItem("userTopics") || "web development, JavaScript, React";
  const currentStreak = parseInt(localStorage.getItem("currentStreak") || "5");
  const totalHours = parseInt(localStorage.getItem("totalStudyHours") || "15");
  const lessonsCompleted = parseInt(localStorage.getItem("lessonsCompleted") || "8");
  const projectsStarted = parseInt(localStorage.getItem("projectsStarted") || "3");

  const handleExportProgress = () => {
    exportProgressReport({
      userName,
      totalHours,
      streakDays: currentStreak,
      lessonsCompleted,
      projectsStarted,
      lastActivityDate: lastActivityDate || undefined
    });
  };

  const handleExportCSV = () => {
    exportProgressCSV({
      userName,
      totalHours,
      streakDays: currentStreak,
      lessonsCompleted,
      projectsStarted,
      lastActivityDate: lastActivityDate || undefined
    });
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6 relative">
        {/* Streak Reminder */}
        <ErrorBoundary>
          <StreakReminder 
            currentStreak={currentStreak}
            lastActivityDate={lastActivityDate || undefined}
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <WelcomeSection
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onStartFirstLesson={startFirstLesson}
            onStartTodaysSession={startSession}
          />
        </ErrorBoundary>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
            <ErrorBoundary>
              <InteractiveLearningMetrics />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <EnhancedProgressSection 
                weeklyGoalHours={10}
                currentHours={totalHours}
                streakDays={currentStreak}
                lessonsCompleted={lessonsCompleted}
                projectsStarted={projectsStarted}
                isLoading={isLoading}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <SmartRecommendationEngine 
                userLevel="intermediate"
                interests={userTopics.split(", ")}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <LearningPathCustomizer />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <AIRecommendations 
                userName={userName}
                isLoading={isLoading}
                userTopics={userTopics.split(", ")}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <LearningPathSection 
                isLoading={isLoading}
                onStartLesson={startLesson}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <RecommendedContent 
                isLoading={isLoading} 
                onStartLesson={startLesson}
              />
            </ErrorBoundary>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
            <ErrorBoundary>
              <StudySessionTimer />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <RecentActivitySection isLoading={isLoading} />
            </ErrorBoundary>
            
            {/* Export and Help Actions */}
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleExportProgress}
                  aria-label="Export progress report"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Progress Report
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={handleExportCSV}
                  aria-label="Export progress data as CSV"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV Data
                </Button>
              </div>
            </div>
            
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
        <ErrorBoundary>
          <AIStudyCompanion userName={userName} />
        </ErrorBoundary>
        
        {/* Motivational Prompts (floating notifications) */}
        <ErrorBoundary>
          <MotivationalPrompts userName={userName} lastActivity={lastActivityDate} />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};
