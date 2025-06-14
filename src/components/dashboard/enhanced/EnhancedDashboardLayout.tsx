
import React from "react";
import { motion } from "framer-motion";
import { EnhancedWelcomeCard } from "./EnhancedWelcomeCard";
import { InteractiveStatsGrid } from "./InteractiveStatsGrid";
import { EnhancedWebFirstLayout } from "@/components/layout/EnhancedWebFirstLayout";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

interface EnhancedDashboardLayoutProps {
  userName: string;
  isFirstTimeUser: boolean;
  isLoading: boolean;
  onStartFirstLesson: () => void;
  onStartTodaysSession: () => void;
  children?: React.ReactNode;
}

export const EnhancedDashboardLayout: React.FC<EnhancedDashboardLayoutProps> = ({
  userName,
  isFirstTimeUser,
  isLoading,
  onStartFirstLesson,
  onStartTodaysSession,
  children
}) => {
  return (
    <ErrorBoundary>
      <EnhancedWebFirstLayout
        title={`${userName}'s Learning Dashboard`}
        description="Track your progress, discover new content, and accelerate your learning journey"
        className="bg-gradient-to-br from-background via-background to-muted/20"
        maxWidth="2xl"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="py-6 lg:py-8 space-y-8"
        >
          {/* Welcome Section */}
          <EnhancedWelcomeCard
            userName={userName}
            isFirstTimeUser={isFirstTimeUser}
            isLoading={isLoading}
            onStartFirstLesson={onStartFirstLesson}
            onStartTodaysSession={onStartTodaysSession}
          />

          {/* Stats Grid */}
          <InteractiveStatsGrid />

          {/* Additional Dashboard Content */}
          {children}
        </motion.div>
      </EnhancedWebFirstLayout>
    </ErrorBoundary>
  );
};
