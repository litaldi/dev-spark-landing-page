
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Code, 
  Zap,
  Calendar,
  BookOpen
} from "lucide-react";

const statsData = [
  {
    id: "streak",
    title: "Learning Streak",
    value: "7",
    unit: "days",
    change: "+2",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Keep it up! You're on fire 🔥"
  },
  {
    id: "time",
    title: "Time Spent Today",
    value: "2.5",
    unit: "hours",
    change: "+30min",
    changeType: "positive" as const,
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "Great focus today!"
  },
  {
    id: "challenges",
    title: "Challenges Completed",
    value: "12",
    unit: "this week",
    change: "+3",
    changeType: "positive" as const,
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    description: "Crushing those goals 💪"
  },
  {
    id: "achievements",
    title: "New Achievements",
    value: "3",
    unit: "unlocked",
    change: "new",
    changeType: "neutral" as const,
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    description: "Awesome progress!"
  },
  {
    id: "skills",
    title: "Skills Mastered",
    value: "8",
    unit: "total",
    change: "+1",
    changeType: "positive" as const,
    icon: Code,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
    description: "Building expertise steadily"
  },
  {
    id: "performance",
    title: "Performance Score",
    value: "94",
    unit: "%",
    change: "+5%",
    changeType: "positive" as const,
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    description: "Excellent improvement!"
  }
];

export const InteractiveStatsGrid: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Your Progress Overview</h3>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          This Week
        </Badge>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {statsData.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-background via-background to-muted/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      className="text-2xl font-bold text-foreground"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.2,
                        type: "spring" 
                      }}
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-sm text-muted-foreground">
                      {stat.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={stat.changeType === "positive" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>View Details</span>
                    </motion.div>
                  </div>

                  <motion.p 
                    className="text-xs text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {stat.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
