
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AchievementBadge, Achievement } from "./AchievementBadge";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Award, Medal, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AchievementsSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for achievements - would come from API in a real app
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>("userAchievements", [
    {
      id: "daily-streak-3",
      title: "3-Day Streak",
      description: "Completed lessons for 3 consecutive days",
      icon: "trophy",
      isUnlocked: true,
      dateAchieved: "2025-05-15",
      category: "streak"
    },
    {
      id: "daily-streak-7",
      title: "Weekly Warrior",
      description: "Completed lessons for 7 consecutive days",
      icon: "trophy",
      isUnlocked: true,
      dateAchieved: "2025-05-17",
      category: "streak"
    },
    {
      id: "daily-streak-30",
      title: "Monthly Master",
      description: "Completed lessons for 30 consecutive days",
      icon: "trophy",
      isUnlocked: false,
      progress: 9,
      maxProgress: 30,
      category: "streak"
    },
    {
      id: "lessons-5",
      title: "Getting Started",
      description: "Completed 5 lessons",
      icon: "check",
      isUnlocked: true,
      dateAchieved: "2025-05-12",
      category: "lessons"
    },
    {
      id: "lessons-20",
      title: "Knowledge Seeker",
      description: "Completed 20 lessons",
      icon: "check",
      isUnlocked: false,
      progress: 8,
      maxProgress: 20,
      category: "lessons"
    },
    {
      id: "first-project",
      title: "Project Pioneer",
      description: "Completed your first project",
      icon: "star",
      isUnlocked: true,
      dateAchieved: "2025-05-16",
      category: "projects"
    }
  ]);

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDialogOpen(true);
  };

  const recentAchievements = achievements
    .filter(a => a.isUnlocked)
    .sort((a, b) => {
      if (!a.dateAchieved || !b.dateAchieved) return 0;
      return new Date(b.dateAchieved).getTime() - new Date(a.dateAchieved).getTime();
    })
    .slice(0, 3);

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Your Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {recentAchievements.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              onClick={() => handleAchievementClick(achievement)}
            />
          ))}
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            {selectedAchievement && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedAchievement.title}</DialogTitle>
                  <DialogDescription>
                    {selectedAchievement.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                  <AchievementBadge
                    achievement={selectedAchievement}
                    size="lg"
                    showProgress={false}
                  />
                </div>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {selectedAchievement.dateAchieved && (
                    <p>Achieved on {selectedAchievement.dateAchieved}</p>
                  )}
                  {!selectedAchievement.isUnlocked && selectedAchievement.progress !== undefined && (
                    <p>Progress: {selectedAchievement.progress}/{selectedAchievement.maxProgress}</p>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <Button variant="ghost" size="sm">
            View All Achievements
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
