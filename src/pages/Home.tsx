
import React from "react";
import { WebFirstLayout } from "@/components/layout/WebFirstLayout";
import { ResponsiveContainer, ResponsiveText } from "@/components/ui/enhanced-responsive";
import EnhancedHeroSection from "@/components/landing/EnhancedHeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid"; 
import TestimonialCard from "@/components/landing/TestimonialCard";
import JoinNowSection from "@/components/landing/JoinNowSection";
import StickyCTABar from "@/components/landing/StickyCTABar";
import Footer from "@/components/landing/Footer";

const Home = () => {
  return (
    <WebFirstLayout
      title="DevAI Learning Platform - AI-Powered Programming Education"
      description="Master programming with personalized AI assistance, interactive challenges, and real-time code reviews"
      includeBreadcrumbs={false}
      fullWidth={true}
      className="bg-background"
    >
      <EnhancedHeroSection />
      
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <ResponsiveContainer maxWidth="xl">
          <div className="text-center mb-12">
            <ResponsiveText variant="h2" className="text-gray-800 dark:text-white mb-4">
              Elevate Your Coding Journey
            </ResponsiveText>
            <ResponsiveText variant="p" className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master programming with AI-powered learning, personalized feedback, and hands-on projects
            </ResponsiveText>
          </div>
          <FeatureGrid />
        </ResponsiveContainer>
      </section>
      
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <ResponsiveContainer maxWidth="xl">
          <div className="text-center mb-12">
            <ResponsiveText variant="h2" className="text-gray-800 dark:text-white mb-4">
              Success Stories from Our Community
            </ResponsiveText>
            <ResponsiveText variant="p" className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how developers are transforming their careers with DevAI
            </ResponsiveText>
          </div>
          <TestimonialCard />
        </ResponsiveContainer>
      </section>
      
      <JoinNowSection />
      
      <Footer />
      <StickyCTABar />
    </WebFirstLayout>
  );
};

export default Home;
