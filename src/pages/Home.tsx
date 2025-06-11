
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
                <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="container mx-auto px-4">
                    <motion.div
                      className="text-center mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-brand-800 dark:text-white mb-4">
                        What Our Students Say
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Join thousands of developers who've transformed their careers with DevAI
                      </p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <TestimonialCard 
                          quote="DevAI helped me land my first developer job in just 3 months!"
                          author="Sarah Chen"
                          role="Frontend Developer at Google"
                          rating={5}
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <TestimonialCard 
                          quote="The AI-powered feedback is incredible. It's like having a senior developer mentor you 24/7."
                          author="Marcus Johnson"
                          role="Full Stack Developer at Microsoft"
                          rating={5}
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:col-span-2 lg:col-span-1"
                      >
                        <TestimonialCard 
                          quote="I went from complete beginner to confident developer. The personalized learning path made all the difference."
                          author="Emily Rodriguez"
                          role="Software Engineer at Meta"
                          rating={5}
                        />
                      </motion.div>
                    </div>
                  </div>
                </section>
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
