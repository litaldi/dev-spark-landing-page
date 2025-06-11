
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

interface DashboardGridProps {
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

export const DashboardGrid: React.FC<DashboardGridProps> = ({
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
  return (
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
            userTopics={userTopics}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <LearningPathSection 
            isLoading={isLoading}
            onStartLesson={onStartLesson}
          />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <RecommendedContent 
            isLoading={isLoading} 
            onStartLesson={onStartLesson}
          />
        </ErrorBoundary>
      </div>
      
      <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
        <ErrorBoundary>
          <RecentActivitySection isLoading={isLoading} />
        </ErrorBoundary>
        
        <ExportActions
          userName={userName}
          totalHours={totalHours}
          currentStreak={currentStreak}
          lessonsCompleted={lessonsCompleted}
          projectsStarted={projectsStarted}
          lastActivityDate={lastActivityDate}
        />
        
        <FloatingHelpButton onHelpClick={onHelpClick} />
      </div>
    </motion.div>
  );
};
