
import React from 'react';
import { EnhancedDashboardContent } from '@/components/dashboard/EnhancedDashboardContent';
import { EnhancedWebFirstLayout } from '@/components/layout/EnhancedWebFirstLayout';
import { useUnifiedAuth } from '@/hooks/auth/use-unified-auth';
import { PageLoading } from '@/components/ui/enhanced-loading';

export default function DashboardPage() {
  const { currentUser, isLoading } = useUnifiedAuth();

  if (isLoading) {
    return <PageLoading text="Loading your dashboard..." />;
  }

  if (!currentUser) {
    return <PageLoading text="Authenticating..." />;
  }

  const handleError = (error: string | null) => {
    console.error('Dashboard error:', error);
  };

  return (
    <EnhancedWebFirstLayout
      title={`${currentUser.name}'s Dashboard`}
      description="Your personalized learning hub"
      className="bg-gradient-to-br from-background via-background to-muted/20"
    >
      <EnhancedDashboardContent
        userName={currentUser.name}
        isFirstTimeUser={currentUser.isFirstTimeUser || false}
        isLoading={isLoading}
        onError={handleError}
      />
    </EnhancedWebFirstLayout>
  );
}
