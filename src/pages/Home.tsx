
import React from "react";
import { EnhancedPageLayout } from "@/components/layout/EnhancedPageLayout";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid"; 
import TestimonialCard from "@/components/landing/TestimonialCard";
import JoinNowSection from "@/components/landing/JoinNowSection";
import StickyCTABar from "@/components/landing/StickyCTABar";
import Footer from "@/components/landing/Footer";

const Home = () => {
  return (
    <EnhancedPageLayout
      title="DevAI Learning Platform - AI-Powered Programming Education"
      description="Master programming with personalized AI assistance, interactive challenges, and real-time code reviews"
      includeBreadcrumbs={false} // Don't show breadcrumbs on home page
      className="bg-background"
    >
      <HeroSection />
      
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Elevate Your Coding Journey
          </h2>
          <FeatureGrid />
        </div>
      </section>
      
      <section className="py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Success Stories from Our Community
          </h2>
          <TestimonialCard />
        </div>
      </section>
      
      <JoinNowSection />
      
      <Footer />
      <StickyCTABar />
    </EnhancedPageLayout>
  );
};

export default Home;
