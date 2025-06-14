
import React from "react";
import { motion } from "framer-motion";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Sparkles, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-4 right-4 w-20 h-20 rounded-full bg-primary/20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-secondary/20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <CardHeader className="relative z-10 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {isFirstTimeUser ? "Welcome to DevAI!" : "Welcome back!"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {isFirstTimeUser ? (
              <>Ready to start your coding journey, {userName}?</>
            ) : (
              <>Great to see you again, {userName}!</>
            )}
          </h2>
        </motion.div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <motion.p 
          className="text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isFirstTimeUser ? (
            "Let's begin with your first lesson and start building the skills that will launch your development career."
          ) : (
            "Continue where you left off and keep building your programming expertise with personalized AI guidance."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {isFirstTimeUser ? (
            <EnhancedButton
              onClick={onStartFirstLesson}
              size="lg"
              variant="gradient"
              loading={isLoading}
              className="flex items-center gap-2 shadow-lg"
              animation="bounce"
            >
              <Sparkles className="w-5 h-5" />
              Start Your First Lesson
            </EnhancedButton>
          ) : (
            <>
              <EnhancedButton
                onClick={onStartTodaysSession}
                size="lg"
                variant="gradient"
                loading={isLoading}
                className="flex items-center gap-2 shadow-lg"
                animation="bounce"
              >
                <TrendingUp className="w-5 h-5" />
                Continue Learning
              </EnhancedButton>
              
              <EnhancedButton
                onClick={onStartFirstLesson}
                size="lg"
                variant="outline"
                className="flex items-center gap-2"
                animation="scale"
              >
                <Clock className="w-5 h-5" />
                Quick Practice
              </EnhancedButton>
            </>
          )}
        </motion.div>

        {/* Progress indicator for returning users */}
        {!isFirstTimeUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-muted/50 rounded-lg p-4"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today's Progress</span>
              <span className="font-medium text-foreground">2 of 3 goals completed</span>
            </div>
            <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: "66%" }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
