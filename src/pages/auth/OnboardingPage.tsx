
import React from 'react';
import { EnhancedOnboardingOverlay } from '@/components/onboarding/EnhancedOnboardingOverlay';
import { EnhancedWebFirstLayout } from '@/components/layout/EnhancedWebFirstLayout';

export default function OnboardingPage() {
  return (
    <EnhancedWebFirstLayout
      title="Welcome - Let's Get Started"
      description="Personalize your learning experience"
      variant="minimal"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <EnhancedOnboardingOverlay />
    </EnhancedWebFirstLayout>
  );
}
