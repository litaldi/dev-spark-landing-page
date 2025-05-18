
import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ForWhomSection from "@/components/landing/ForWhomSection";
import TestimonialCard from "@/components/landing/TestimonialCard";
import JoinNowSection from "@/components/landing/JoinNowSection";
import Footer from "@/components/landing/Footer";
import FaqAccordion from "@/components/landing/FaqAccordion";
import FeatureComparisonTable from "@/components/landing/FeatureComparisonTable";
import StickyCTABar from "@/components/landing/StickyCTABar";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import WhyItWorks from "@/components/landing/WhyItWorks";
import CommunityStats from "@/components/landing/CommunityStats";
import MotivationQuote from "@/components/landing/MotivationQuote";
import AppPreview from "@/components/landing/AppPreview";
import NewsletterSignup from "@/components/landing/NewsletterSignup";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Accessibility: Skip to content link for keyboard users */}
      <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
      
      <Navbar />
      <SkipNavContent id="main-content">
        {/* Primary sections */}
        <HeroSection />
        <WhyItWorks />
        <HowItWorksSection />
        
        {/* App preview and community stats */}
        <div id="demo" className="scroll-mt-20">
          <AppPreview />
        </div>
        <CommunityStats />
        
        {/* Motivation quote */}
        <div className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            <MotivationQuote />
          </div>
        </div>
        
        {/* Features and testimonials */}
        <div id="features" className="scroll-mt-20">
          <FeatureGrid />
        </div>
        <TestimonialCard />
        <ForWhomSection />
        
        {/* Product comparison and FAQ */}
        <div id="pricing" className="scroll-mt-20">
          <FeatureComparisonTable />
        </div>
        <div id="faq" className="scroll-mt-20">
          <FaqAccordion />
        </div>
        
        {/* Call to action */}
        <NewsletterSignup />
        <JoinNowSection />
      </SkipNavContent>
      <Footer />
      <StickyCTABar />
    </div>
  );
};

export default Index;
