
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import EnhancedHeroSection from "@/components/landing/EnhancedHeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialCard from "@/components/landing/TestimonialCard";
import Footer from "@/components/landing/Footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <SEOHead 
        title="DevAI - AI-Powered Programming Education Platform"
        description="Learn programming with AI-powered education. Get personalized learning paths, real-time code reviews, and land your first developer job."
        keywords="programming education, AI learning, code review, developer jobs, web development"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
        <Navbar />
        
        <main id="main-content" className="flex-1">
          <SkipNavContent id="main-content">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <EnhancedHeroSection />
              
              <motion.div variants={sectionVariants}>
                <FeatureGrid />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <HowItWorksSection />
              </motion.div>
              
              <motion.div variants={sectionVariants}>
                <TestimonialCard />
              </motion.div>
            </motion.div>
          </SkipNavContent>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
