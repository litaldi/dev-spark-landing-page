
import React from "react";
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";
import { DashboardLayout } from "./DashboardLayout";

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

  // Get data from localStorage for progress tracking
  const lastActivityDate = localStorage.getItem("lastSessionDate");
  const userTopics = localStorage.getItem("userTopics") || "web development, JavaScript, React";
  const currentStreak = parseInt(localStorage.getItem("currentStreak") || "5");
  const totalHours = parseInt(localStorage.getItem("totalStudyHours") || "15");
  const lessonsCompleted = parseInt(localStorage.getItem("lessonsCompleted") || "8");
  const projectsStarted = parseInt(localStorage.getItem("projectsStarted") || "3");

  const handleHelpClick = () => handleAction('help');

  return (
    <DashboardLayout
      userName={userName}
      isFirstTimeUser={isFirstTimeUser}
      isLoading={isLoading}
      currentStreak={currentStreak}
      totalHours={totalHours}
      lessonsCompleted={lessonsCompleted}
      projectsStarted={projectsStarted}
      lastActivityDate={lastActivityDate || undefined}
      userTopics={userTopics.split(", ")}
      onStartFirstLesson={startFirstLesson}
      onStartSession={startSession}
      onStartLesson={startLesson}
      onHelpClick={handleHelpClick}
    />
  );
};
