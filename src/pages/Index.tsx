
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip to content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-500 text-white px-4 py-2 z-50 focus:outline-none rounded-md"
      >
        Skip to content
      </a>
      
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <div id="features">
          <FeatureGrid />
        </div>
        <TestimonialCard />
        <ForWhomSection />
        <FeatureComparisonTable />
        <div id="faq">
          <FaqAccordion />
        </div>
        <div id="pricing">
          <JoinNowSection />
        </div>
      </main>
      <Footer />
      <StickyCTABar />
    </div>
  );
};

export default Index;
