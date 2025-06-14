
import React from 'react';
import { EnhancedOnboardingOverlay } from '@/components/onboarding/EnhancedOnboardingOverlay';
import { ConsolidatedLayout } from '@/components/layout/ConsolidatedLayout';
import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();

  const handleOnboardingComplete = () => {
    // Navigate to dashboard after onboarding completion
    navigate('/dashboard');
  };

  return (
    <ConsolidatedLayout
      title="Welcome - Let's Get Started"
      description="Personalize your learning experience"
      variant="minimal"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <EnhancedOnboardingOverlay onComplete={handleOnboardingComplete} />
    </ConsolidatedLayout>
  );
}
