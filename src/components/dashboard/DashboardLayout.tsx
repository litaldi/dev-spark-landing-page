
import React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { StreakReminder } from "@/components/dashboard/StreakReminder";
import { EnhancedWelcomeSection } from "@/components/dashboard/EnhancedWelcomeSection";
import { EnhancedNavigation } from "@/components/navigation/EnhancedNavigation";
import { AIStudyCompanion } from "@/components/dashboard/AIStudyCompanion";
import { MotivationalPrompts } from "@/components/dashboard/MotivationalPrompts";
import { EnhancedDashboardGrid } from "./EnhancedDashboardGrid";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <ErrorBoundary>
      <motion.div 
        className="space-y-6 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Navigation */}
        <motion.div variants={itemVariants}>
          <EnhancedNavigation />
        </motion.div>
        
        {/* Streak Reminder */}
        <motion.div variants={itemVariants}>
          <StreakReminder 
            currentStreak={currentStreak}
            lastActivityDate={lastActivityDate}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <EnhancedWelcomeSection
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onStartFirstLesson={onStartFirstLesson}
            onStartTodaysSession={onStartSession}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <EnhancedDashboardGrid
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
        </motion.div>

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
