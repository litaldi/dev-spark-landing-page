
import React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { StreakReminder } from "@/components/dashboard/StreakReminder";
import { EnhancedWelcomeSection } from "@/components/dashboard/EnhancedWelcomeSection";
import { EnhancedNavigation } from "@/components/navigation/EnhancedNavigation";
import { AIStudyCompanion } from "@/components/dashboard/AIStudyCompanion";
import { MotivationalPrompts } from "@/components/dashboard/MotivationalPrompts";
import { DashboardGrid } from "./DashboardGrid";

interface DashboardLayoutProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  currentStreak: number;
  totalHours: number;
  lessonsCompleted: number;
  projectsStarted: number;
  lastActivityDate?: string;
  userTopics: string[];
  onStartFirstLesson: () => void;
  onStartSession: () => void;
  onStartLesson: (lessonId: string) => void;
  onHelpClick: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userName,
  isFirstTimeUser,
  isLoading,
  currentStreak,
  totalHours,
  lessonsCompleted,
  projectsStarted,
  lastActivityDate,
  userTopics,
  onStartFirstLesson,
  onStartSession,
  onStartLesson,
  onHelpClick
}) => {
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
          lastActivityDate={lastActivityDate}
        />

        <EnhancedWelcomeSection
          userName={userName}
          isFirstTimeUser={isFirstTimeUser}
          isLoading={isLoading}
          onStartFirstLesson={onStartFirstLesson}
          onStartTodaysSession={onStartSession}
        />

        <DashboardGrid
          userName={userName}
          isLoading={isLoading}
          userTopics={userTopics}
          totalHours={totalHours}
          currentStreak={currentStreak}
          lessonsCompleted={lessonsCompleted}
          projectsStarted={projectsStarted}
          lastActivityDate={lastActivityDate}
          onStartLesson={onStartLesson}
          onHelpClick={onHelpClick}
        />

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
