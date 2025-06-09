
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface EnhancedWelcomeSectionProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onStartFirstLesson: () => void;
  onStartTodaysSession: () => void;
}

export const EnhancedWelcomeSection: React.FC<EnhancedWelcomeSectionProps> = ({
  userName,
  isFirstTimeUser,
  isLoading,
  onStartFirstLesson,
  onStartTodaysSession
}) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return (
      <Card className="mb-6 border-brand-100 dark:border-brand-800">
        <CardHeader>
          <div className="animate-pulse space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="mb-6 border-brand-100 dark:border-brand-800 bg-gradient-to-br from-brand-50/50 to-white dark:from-brand-900/20 dark:to-gray-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-100/10 to-transparent dark:from-brand-800/10" />
        
        <CardHeader className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardTitle className="text-xl sm:text-2xl font-bold text-brand-800 dark:text-brand-100 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="h-6 w-6 text-brand-500" />
              </motion.div>
              {getGreeting()}, {userName}!
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {isFirstTimeUser 
                ? "Welcome to your coding journey! Let's get you started with your first lesson."
                : "Ready to continue your learning journey? Let's build something amazing today!"
              }
            </p>
          </motion.div>
        </CardHeader>
        
        <CardContent className="relative">
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isFirstTimeUser ? (
              <Button 
                onClick={onStartFirstLesson}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white group transition-all duration-300 hover:scale-105"
                size="lg"
              >
                <BookOpen className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Your First Lesson
              </Button>
            ) : (
              <>
                <Button 
                  onClick={onStartTodaysSession}
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white group transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Continue Learning
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-brand-300 text-brand-700 hover:bg-brand-50 dark:border-brand-600 dark:text-brand-300 dark:hover:bg-brand-900/50 group transition-all duration-300"
                  size="lg"
                >
                  <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Schedule Session
                </Button>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
