
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const quotes = [
  "Keep going. Every line of code counts.",
  "The best way to learn is by building something real.",
  "Mistakes are proof that you're trying.",
  "Your future self will thank you for the work you put in today.",
  "Don't compare your day 1 to someone else's day 100.",
  "Small progress is still progress.",
  "Coding is like humor. When you have to explain it, it's bad.",
  "The secret to getting ahead is getting started."
];

const MotivationQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Get random quote on initial load
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);

    // Optionally rotate quotes periodically
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        const newIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[newIndex]);
        setFadeIn(true);
      }, 300);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefreshQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[newIndex]);
      setFadeIn(true);
    }, 300);
  };

  return (
    <Card className="bg-gradient-to-r from-brand-50 to-white border-brand-100 max-w-2xl mx-auto overflow-hidden shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className={`text-center transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-lg md:text-xl font-medium text-brand-700 italic mb-4 leading-relaxed">
            "{currentQuote}"
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-brand-500 hover:text-brand-600 hover:bg-brand-50 mt-2"
            onClick={handleRefreshQuote}
            aria-label="Get new motivation quote"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationQuote;
