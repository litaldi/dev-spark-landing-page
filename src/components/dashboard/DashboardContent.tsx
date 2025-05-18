
import React from "react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";

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
    startLesson 
  } = useDashboardActions(onError);

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
          
          <LearningPathSection 
            isLoading={isLoading}
            onStartLesson={startLesson}
          />
        </div>
        
        <div className="lg:col-span-1">
          <RecentActivitySection isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};
