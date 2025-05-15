
import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureGrid from "@/components/landing/FeatureGrid";
import ForWhomSection from "@/components/landing/ForWhomSection";
import TestimonialCard from "@/components/landing/TestimonialCard";
import JoinNowSection from "@/components/landing/JoinNowSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid />
        <ForWhomSection />
        <TestimonialCard />
        <JoinNowSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
