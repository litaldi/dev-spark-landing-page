
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AppPreview: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const screens = [
    {
      title: "Practice Editor",
      description: "Solve real-world coding challenges with AI-powered feedback",
      image: "/practice-editor-placeholder.svg" // Replace with actual screenshots
    },
    {
      title: "Resume Builder",
      description: "Create an ATS-friendly resume that highlights your skills",
      image: "/resume-builder-placeholder.svg"
    },
    {
      title: "Performance Dashboard",
      description: "Track your progress and identify areas for improvement",
      image: "/dashboard-placeholder.svg"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % screens.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + screens.length) % screens.length);
  };
  
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900" aria-labelledby="app-preview-title">
      <div className="container">
        <h2 
          id="app-preview-title" 
          className="text-3xl md:text-4xl font-bold text-center text-brand-800 dark:text-brand-100 mb-6"
        >
          See the App in <span className="text-brand-500 dark:text-brand-400">Action</span>
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Take a look at how our platform helps you practice coding, build your resume, and track your progress.
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          <Card className="border-brand-100 dark:border-brand-800 shadow-lg dark:shadow-brand-900/30 overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-0">
              <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div 
                className="p-6 flex flex-col items-center"
                aria-live="polite"
                aria-atomic="true"
              >
                <h3 className="text-xl font-semibold text-brand-800 dark:text-brand-200 mb-2">
                  {screens[activeIndex].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  {screens[activeIndex].description}
                </p>
                <div 
                  className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full h-64 md:h-80 bg-gray-50 dark:bg-gray-800 flex items-center justify-center"
                  role="img"
                  aria-label={`Screenshot of ${screens[activeIndex].title}`}
                >
                  <p className="text-gray-400 dark:text-gray-500">App screenshot preview</p>
                  {/* Replace with actual image: 
                  <img 
                    src={screens[activeIndex].image} 
                    alt={screens[activeIndex].title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  /> */}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div 
            className="flex justify-center mt-6 gap-2"
            role="tablist"
            aria-label="App screenshot navigation"
          >
            {screens.map((screen, index) => (
              <button 
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${
                  index === activeIndex ? 'bg-brand-500 dark:bg-brand-400' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`View ${screen.title}`}
                aria-selected={index === activeIndex}
                role="tab"
                tabIndex={index === activeIndex ? 0 : -1}
              />
            ))}
          </div>
          
          <Button 
            onClick={handlePrevious}
            variant="outline" 
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-black/50 border-gray-200 dark:border-gray-700 shadow-sm"
            aria-label="Previous screen"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            onClick={handleNext}
            variant="outline" 
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-black/50 border-gray-200 dark:border-gray-700 shadow-sm"
            aria-label="Next screen"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            className="rounded-full border-brand-300 dark:border-brand-700 hover:bg-brand-50 dark:hover:bg-brand-900/50"
            aria-label="Try the application demo"
          >
            Try Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
