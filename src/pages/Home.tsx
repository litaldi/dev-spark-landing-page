
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid"; 
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { JoinNowSection } from "@/components/landing/JoinNowSection";
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestimonialCard 
                  quote="DevAI helped me land my first developer job within 3 months of starting the program."
                  name="Alex Johnson"
                  role="Frontend Developer"
                  rating={5}
                />
                <TestimonialCard 
                  quote="The interview practice feature was a game-changer. I felt so prepared for my real interviews!"
                  name="Sophia Chen"
                  role="Full Stack Developer"
                  rating={5}
                />
                <TestimonialCard 
                  quote="The personalized learning path saved me months of figuring out what to learn next."
                  name="Michael Rodriguez"
                  role="Software Engineer"
                  rating={4}
                />
              </div>
            </div>
          </section>
          
          <JoinNowSection />
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
