
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, BookOpen, Award, Clock, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/use-mobile";

interface EnhancedWelcomeCardProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onStartFirstLesson: () => void;
  onStartTodaysSession: () => void;
}

export const EnhancedWelcomeCard: React.FC<EnhancedWelcomeCardProps> = ({
  userName,
  isFirstTimeUser,
  isLoading,
  onStartFirstLesson,
  onStartTodaysSession
}) => {
  const { width } = useViewportSize();
  const isMobile = width < 768;
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-md w-40 mt-2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <CardContent className="relative p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4">
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getGreetingEmoji()}</span>
                  <Badge variant="secondary" className="text-xs">
                    {isFirstTimeUser ? "New Member" : "Welcome Back"}
                  </Badge>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {getGreeting()}, {userName}!
                </h1>
              </motion.div>

              {/* Motivational message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <p className="text-muted-foreground text-base">
                  {isFirstTimeUser 
                    ? "Welcome to your personalized learning journey! Let's start with your first lesson."
                    : "Ready to continue your learning adventure? Your next milestone awaits!"
                  }
                </p>
                
                {!isFirstTimeUser && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>5-day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>8 lessons completed</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row"
            >
              <EnhancedButton
                onClick={isFirstTimeUser ? onStartFirstLesson : onStartTodaysSession}
                variant="gradient"
                size={isMobile ? "default" : "lg"}
                animation="glow"
                leftIcon={isFirstTimeUser ? <Award className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="whitespace-nowrap"
              >
                {isFirstTimeUser ? "Start First Lesson" : "Continue Learning"}
              </EnhancedButton>

              <EnhancedButton
                variant="outline"
                size={isMobile ? "default" : "lg"}
                animation="bounce"
                leftIcon={<CalendarDays className="h-4 w-4" />}
                className="whitespace-nowrap"
              >
                {isMobile ? "Schedule" : "View Schedule"}
              </EnhancedButton>
            </motion.div>
          </div>

          {/* Next session info */}
          {!isFirstTimeUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 pt-4 border-t border-border/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Next: Introduction to CSS Flexbox</span>
                  <Badge variant="outline" className="text-xs">15 min</Badge>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <EnhancedButton
                    variant="ghost"
                    size="sm"
                    animation="none"
                    className="text-xs h-8"
                  >
                    Preview
                  </EnhancedButton>
                </motion.div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
