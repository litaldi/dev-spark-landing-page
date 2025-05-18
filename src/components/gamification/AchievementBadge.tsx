
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCheck, Lock, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: "star" | "trophy" | "check" | "custom";
  customIcon?: React.ReactNode;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
  dateAchieved?: string;
  category: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  showProgress?: boolean;
  className?: string;
}

export function AchievementBadge({
  achievement,
  size = "md",
  onClick,
  showProgress = true,
  className
}: AchievementBadgeProps) {
  const getIconComponent = () => {
    switch (achievement.icon) {
      case "star":
        return <Star />;
      case "trophy":
        return <Trophy />;
      case "check":
        return <CheckCheck />;
      case "custom":
        return achievement.customIcon;
      default:
        return <Star />;
    }
  };

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };

  const iconSizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center text-center", 
        className,
        onClick ? "cursor-pointer" : ""
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          "relative rounded-full flex items-center justify-center mb-2",
          sizeClasses[size],
          achievement.isUnlocked 
            ? "bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-700 dark:to-amber-900" 
            : "bg-gray-200 dark:bg-gray-700"
        )}
      >
        <div className={cn(
          "text-amber-700 dark:text-amber-300", 
          iconSizeClasses[size],
          !achievement.isUnlocked && "text-gray-400 dark:text-gray-500"
        )}>
          {getIconComponent()}
        </div>
        
        {!achievement.isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200/60 dark:bg-gray-700/60 rounded-full">
            <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        )}
        
        {achievement.isUnlocked && achievement.dateAchieved && (
          <div className="absolute -bottom-1 -right-1 bg-brand-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            ✓
          </div>
        )}
      </div>
      
      <div>
        <p className={cn(
          "font-medium",
          size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base",
          !achievement.isUnlocked && "text-gray-500 dark:text-gray-400"
        )}>
          {achievement.title}
        </p>
        
        {showProgress && achievement.progress !== undefined && achievement.maxProgress && (
          <div className="w-full mt-1">
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 rounded-full" 
                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {achievement.progress}/{achievement.maxProgress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
