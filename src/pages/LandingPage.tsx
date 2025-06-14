
import React from 'react';
import { EnhancedWebFirstLayout } from '@/components/layout/EnhancedWebFirstLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import TestimonialCard from '@/components/landing/TestimonialCard';
import JoinNowSection from '@/components/landing/JoinNowSection';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <EnhancedWebFirstLayout
      title="DevAI Learning Platform"
      description="Master programming with AI-powered personalized learning experiences"
      variant="minimal"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-16"
      >
        <HeroSection />
        <FeatureGrid />
        
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Learners Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                name="Sarah Chen"
                role="Full Stack Developer"
                content="This platform transformed my coding journey. The AI recommendations are spot-on!"
                rating={5}
              />
              <TestimonialCard
                name="Marcus Johnson"
                role="Frontend Engineer"
                content="Finally, a learning platform that adapts to my pace and style. Highly recommended!"
                rating={5}
              />
              <TestimonialCard
                name="Elena Rodriguez"
                role="Software Engineer"
                content="The personalized approach helped me land my dream job in tech. Thank you!"
                rating={5}
              />
            </div>
          </div>
        </section>
        
        <JoinNowSection />
      </motion.div>
    </EnhancedWebFirstLayout>
  );
}
