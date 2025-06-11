
import React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { EnhancedProgressSection } from "@/components/dashboard/EnhancedProgressSection";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecommendedContent } from "@/components/dashboard/RecommendedContent";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { ExportActions } from "./ExportActions";
import { FloatingHelpButton } from "./FloatingHelpButton";

interface EnhancedDashboardGridProps {
  userName: string;
  isLoading: boolean;
  userTopics: string[];
  totalHours: number;
  currentStreak: number;
  lessonsCompleted: number;
  projectsStarted: number;
  lastActivityDate?: string;
  onStartLesson: (lessonId: string) => void;
  onHelpClick: () => void;
}

export const EnhancedDashboardGrid: React.FC<EnhancedDashboardGridProps> = ({
  userName,
  isLoading,
  userTopics,
  totalHours,
  currentStreak,
  lessonsCompleted,
  projectsStarted,
  lastActivityDate,
  onStartLesson,
  onHelpClick
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
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
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <motion.div variants={itemVariants}>
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
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <AIRecommendations 
              userName={userName}
              isLoading={isLoading}
              userTopics={userTopics}
            />
          </ErrorBoundary>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <LearningPathSection 
              isLoading={isLoading}
              onStartLesson={onStartLesson}
            />
          </ErrorBoundary>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <RecommendedContent 
              isLoading={isLoading} 
              onStartLesson={onStartLesson}
            />
          </ErrorBoundary>
        </motion.div>
      </div>
      
      <div className="lg:col-span-1 space-y-4 sm:space-y-6">
        <motion.div variants={itemVariants}>
          <ErrorBoundary>
            <RecentActivitySection isLoading={isLoading} />
          </ErrorBoundary>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ExportActions
            userName={userName}
            totalHours={totalHours}
            currentStreak={currentStreak}
            lessonsCompleted={lessonsCompleted}
            projectsStarted={projectsStarted}
            lastActivityDate={lastActivityDate}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FloatingHelpButton onHelpClick={onHelpClick} />
        </motion.div>
      </div>
    </motion.div>
  );
};
