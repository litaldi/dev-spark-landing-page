
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
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";
import { Button } from "@/components/ui/button";
import { HelpCircle, Download } from "lucide-react";
import { useViewportSize, useBreakpoint } from "@/hooks/use-mobile";
import { exportProgressReport, exportProgressCSV } from "@/lib/export-utils";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { EnhancedProgressSection } from "@/components/dashboard/EnhancedProgressSection";
import { EnhancedNavigation } from "@/components/navigation/EnhancedNavigation";
import { EnhancedWelcomeSection } from "@/components/dashboard/EnhancedWelcomeSection";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { motion } from "framer-motion";

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
      <motion.div 
        className="space-y-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Enhanced Navigation */}
        <EnhancedNavigation />
        
        {/* Streak Reminder */}
        <StreakReminder 
          currentStreak={currentStreak}
          lastActivityDate={lastActivityDate || undefined}
        />

        <EnhancedWelcomeSection
          userName={userName}
          isFirstTimeUser={isFirstTimeUser}
          isLoading={isLoading}
          onStartFirstLesson={startFirstLesson}
          onStartTodaysSession={startSession}
        />

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
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
          
          <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
            <ErrorBoundary>
              <RecentActivitySection isLoading={isLoading} />
            </ErrorBoundary>
            
            {/* Export and Help Actions */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300"
                  onClick={handleExportProgress}
                  aria-label="Export progress report"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Progress Report
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="w-full justify-start hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300"
                  onClick={handleExportCSV}
                  aria-label="Export progress data as CSV"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV Data
                </Button>
              </div>
            </motion.div>
            
            {/* Enhanced Help Button */}
            {!isSmallScreen && !isTabletScreen && (
              <motion.div 
                className="mt-4 flex justify-end"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button 
                  variant="outline"
                  size="sm"
                  className="rounded-md hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300 group"
                  aria-label="Get help with dashboard features"
                  onClick={() => handleAction('help')}
                >
                  <HelpCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Get Help</span>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Floating Help Button for Mobile */}
        {(isSmallScreen || isTabletScreen) && (
          <div className="fixed bottom-6 right-6 z-10">
            <FloatingActionButton
              icon={HelpCircle}
              onClick={() => handleAction('help')}
              ariaLabel="Get help with dashboard features"
              color="primary"
            />
          </div>
        )}

        {/* AI Study Companion (floating chat widget) */}
        <ErrorBoundary>
          <AIStudyCompanion userName={userName} />
        </ErrorBoundary>
        
        {/* Motivational Prompts (floating notifications) */}
        <ErrorBoundary>
          <MotivationalPrompts userName={userName} lastActivity={lastActivityDate} />
        </ErrorBoundary>
      </motion.div>
    </ErrorBoundary>
  );
};
