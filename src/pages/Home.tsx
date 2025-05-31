
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid"; 
import TestimonialCard from "@/components/landing/TestimonialCard";
import JoinNowSection from "@/components/landing/JoinNowSection";
import StickyCTABar from "@/components/landing/StickyCTABar";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink>Skip to content</SkipNavLink>
      <Navbar />
      <main className="flex-1">
        <SkipNavContent>
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
        </SkipNavContent>
      </main>
      <Footer />
      <StickyCTABar />
    </div>
  );
};

export default Home;
