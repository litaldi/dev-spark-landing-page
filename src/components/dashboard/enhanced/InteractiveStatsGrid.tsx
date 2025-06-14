
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  BookOpen, 
  Award, 
  Target, 
  TrendingUp, 
  Zap,
  Calendar,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  color: "primary" | "secondary" | "success" | "warning";
  badge?: string;
}

interface InteractiveStatsGridProps {
  className?: string;
}

export const InteractiveStatsGrid: React.FC<InteractiveStatsGridProps> = ({
  className
}) => {
  const stats: StatItem[] = [
    {
      id: "streak",
      title: "Current Streak",
      value: "5",
      subtitle: "days in a row",
      icon: <Zap className="h-5 w-5" />,
      progress: 71,
      trend: "up",
      color: "primary",
      badge: "🔥 On Fire!"
    },
    {
      id: "hours",
      title: "Study Hours",
      value: "15.5",
      subtitle: "this week",
      icon: <Clock className="h-5 w-5" />,
      progress: 62,
      trend: "up",
      color: "success",
      badge: "Target: 25h"
    },
    {
      id: "lessons",
      title: "Lessons",
      value: "8",
      subtitle: "completed",
      icon: <BookOpen className="h-5 w-5" />,
      progress: 80,
      trend: "up",
      color: "secondary"
    },
    {
      id: "achievements",
      title: "Achievements",
      value: "3",
      subtitle: "unlocked",
      icon: <Award className="h-5 w-5" />,
      progress: 30,
      trend: "neutral",
      color: "warning"
    }
  ];

  const colorClasses = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      progress: "bg-primary"
    },
    secondary: {
      bg: "bg-secondary/10",
      text: "text-secondary-foreground",
      progress: "bg-secondary"
    },
    success: {
      bg: "bg-green-500/10",
      text: "text-green-600",
      progress: "bg-green-500"
    },
    warning: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-600",
      progress: "bg-yellow-500"
    }
  };

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ y: -2 }}
          className="group"
        >
          <Card className="relative overflow-hidden border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg">
            {/* Background gradient */}
            <div className={cn(
              "absolute inset-0 opacity-50 transition-opacity group-hover:opacity-70",
              colorClasses[stat.color].bg
            )} />
            
            <CardHeader className="relative pb-2">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "p-2 rounded-lg",
                  colorClasses[stat.color].bg,
                  colorClasses[stat.color].text
                )}>
                  {stat.icon}
                </div>
                
                {stat.trend && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (index * 0.1) + 0.3 }}
                  >
                    <TrendingUp 
                      className={cn(
                        "h-4 w-4",
                        stat.trend === "up" && "text-green-500",
                        stat.trend === "down" && "text-red-500 rotate-180",
                        stat.trend === "neutral" && "text-gray-500"
                      )}
                    />
                  </motion.div>
                )}
              </div>
              
              {stat.badge && (
                <Badge variant="secondary" className="text-xs self-start mt-2">
                  {stat.badge}
                </Badge>
              )}
            </CardHeader>
            
            <CardContent className="relative pt-0">
              <div className="space-y-2">
                <div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (index * 0.1) + 0.2 }}
                    className="text-2xl font-bold"
                  >
                    {stat.value}
                  </motion.div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                
                {stat.progress !== undefined && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: (index * 0.1) + 0.4, duration: 0.6 }}
                  >
                    <Progress 
                      value={stat.progress} 
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.progress}% complete
                    </p>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
