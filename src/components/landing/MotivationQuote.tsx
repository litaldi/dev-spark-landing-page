
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

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

  useEffect(() => {
    // Get random quote on initial load
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);

    // Optionally rotate quotes periodically
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[newIndex]);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-brand-50 border-brand-100 max-w-2xl mx-auto overflow-hidden">
      <CardContent className="p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg md:text-xl italic font-medium text-brand-700">
            "{currentQuote}"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationQuote;
