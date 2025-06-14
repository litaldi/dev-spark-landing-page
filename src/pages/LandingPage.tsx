
import React from 'react';
import { ConsolidatedLayout } from '@/components/layout/ConsolidatedLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import TestimonialCard from '@/components/landing/TestimonialCard';
import JoinNowSection from '@/components/landing/JoinNowSection';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <ConsolidatedLayout
      title="DevAI Learning Platform"
      description="Master programming with AI-powered personalized learning experiences"
      variant="minimal"
      fullWidth={true}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-16"
      >
        <HeroSection />
        <FeatureGrid />

        {/* Improved Testimonials section with fade-in */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
              What Our Learners Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard />
            </div>
          </div>
        </section>

        <JoinNowSection />
      </motion.div>
    </ConsolidatedLayout>
  );
}
