
import React, { useState } from "react";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ProgressSection } from "@/components/dashboard/ProgressSection";
import { LearningPathSection } from "@/components/dashboard/LearningPathSection";
import { RecentActivitySection } from "@/components/dashboard/RecentActivitySection";
import { RecommendedContent } from "@/components/dashboard/RecommendedContent";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { AIStudyCompanion } from "@/components/dashboard/AIStudyCompanion";
import { MotivationalPrompts } from "@/components/dashboard/MotivationalPrompts";
import { useDashboardActions } from "@/hooks/dashboard/use-dashboard-actions";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { HelpCircle } from "lucide-react";
import { useViewportSize, useBreakpoint } from "@/hooks/use-mobile";
import { AchievementsSection } from "@/components/gamification/AchievementsSection";
import { StreakCalendar } from "@/components/gamification/StreakCalendar";
import { CollaborativeSection } from "@/components/collaboration/CollaborativeSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeReviewPanel } from "@/components/code-review/CodeReviewPanel";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";
import { SmartRecommendations } from "@/components/dashboard/SmartRecommendations";
import { QuickAccessShortcuts } from "@/components/dashboard/QuickAccessShortcuts";
import { StudyTimeSummary } from "@/components/dashboard/StudyTimeSummary";
import { DailyGoals } from "@/components/dashboard/DailyGoals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Get last activity timestamp from localStorage
  const lastActivityDate = localStorage.getItem("lastSessionDate");
  const userTopics = localStorage.getItem("userTopics") || "web development, JavaScript, React";
  
  // State to track active tab for mobile aria announcements
  const [activeTab, setActiveTab] = useState<string>("learning");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Announce tab change for screen readers
    const tabName = value.charAt(0).toUpperCase() + value.slice(1);
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `${tabName} tab selected`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <>
      <WelcomeSection
        userName={userName}
        isFirstTimeUser={isFirstTimeUser}
        isLoading={isLoading}
        onStartFirstLesson={startFirstLesson}
        onStartTodaysSession={startSession}
      />

      <Tabs defaultValue="learning" className="mb-6" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
          <TabsTrigger value="learning" aria-label="Learning tab">Learning</TabsTrigger>
          <TabsTrigger value="codeReview" aria-label="Code Review tab">Code Review</TabsTrigger>
          <TabsTrigger value="achievements" aria-label="Achievements tab">Achievements</TabsTrigger>
          <TabsTrigger value="collaboration" aria-label="Collaboration tab">Collaboration</TabsTrigger>
        </TabsList>
        
        <div aria-live="polite" className="sr-only">
          {activeTab} tab content loaded
        </div>
        
        <TabsContent value="learning" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                <QuickAccessShortcuts />
                <DailyGoals />
              </div>
              
              <ProgressTracker 
                weeklyGoalHours={10}
                currentHours={4.5}
                lessonsCompleted={8}
                projectsStarted={3}
              />
              
              <ProgressSection 
                weeklyGoalHours={10}
                currentHours={4.5}
                streakDays={5}
                lessonsCompleted={8}
                projectsStarted={3}
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
              
              <SmartRecommendations 
                userName={userName}
                isLoading={isLoading}
                userTopics={userTopics.split(", ")}
              />
              
              <RecommendedContent 
                isLoading={isLoading} 
                onStartLesson={startLesson}
              />
            </div>
            
            <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
              <StudyTimeSummary />
              <StreakCalendar />
              <RecentActivitySection isLoading={isLoading} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="codeReview" className="mt-0">
          <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-6">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>AI-Assisted Code Review</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeReviewPanel />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
              <AchievementsSection />
              
              <Card className="border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Milestones & Learning Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    More achievements and milestones coming soon!
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
              <StreakCalendar />
              <RecentActivitySection isLoading={isLoading} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="collaboration" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-3 xs:space-y-4 sm:space-y-6">
              <CollaborativeSection />
            </div>
            
            <div className="lg:col-span-1 space-y-3 xs:space-y-4 sm:space-y-6">
              <RecentActivitySection isLoading={isLoading} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className={`${isSmallScreen || isTabletScreen ? 'fixed bottom-6 right-6 z-10' : 'mt-4 flex justify-end'}`}>
        <EnhancedButton 
          variant="outline"
          size={isSmallScreen ? "icon" : "sm"}
          rounded={isSmallScreen ? "full" : "default"}
          className={`${isSmallScreen ? 'h-14 w-14 shadow-lg bg-white dark:bg-gray-800' : 'rounded-md'}`}
          aria-label="Get help with dashboard features"
          onClick={() => handleAction('help')}
        >
          <HelpCircle className={`${isSmallScreen ? 'h-6 w-6' : 'h-4 w-4 mr-2'}`} />
          {!isSmallScreen && <span>Get Help</span>}
        </EnhancedButton>
      </div>

      <AIStudyCompanion userName={userName} />
      <MotivationalPrompts userName={userName} lastActivity={lastActivityDate} />
    </>
  );
};
