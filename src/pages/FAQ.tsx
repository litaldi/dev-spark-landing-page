
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FAQ = () => {
  // Sample FAQ data
  const faqs = [
    {
      question: "What is DevAI?",
      answer: "DevAI is an AI-powered platform that helps developers learn, practice coding, and prepare for job interviews through personalized exercises, projects, and interview simulations."
    },
    {
      question: "How do I get started?",
      answer: "To get started, simply sign up for an account, complete your profile by selecting your experience level and preferred technologies, and you'll get personalized learning paths and coding exercises."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a free tier that gives you access to basic features. You can upgrade to a premium plan at any time to unlock additional features and content."
    },
    {
      question: "What technologies are supported?",
      answer: "We currently support a wide range of programming languages and frameworks including JavaScript, Python, React, Node.js, TypeScript, and many more. We're constantly adding new technologies based on user demand."
    },
    {
      question: "How does the AI interview practice work?",
      answer: "Our AI interview simulator creates realistic technical interview scenarios based on real-world questions. You'll receive feedback on your answers, code quality, and communication skills, along with suggestions for improvement."
    },
    {
      question: "Can I track my progress?",
      answer: "Yes, your dashboard provides detailed analytics on your learning progress, strengths, areas for improvement, and consistency. You can set goals and track your improvement over time."
    },
    {
      question: "Do you offer certifications?",
      answer: "We offer completion certificates for our comprehensive learning paths that you can share on your resume or LinkedIn profile to showcase your skills to potential employers."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team by emailing support@devai.com or through the chat support feature in your account. We typically respond within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Find answers to common questions about our platform.
            </p>
            
            <div className="flex max-w-md mx-auto">
              <Input
                placeholder="Search questions..."
                className="rounded-l-md rounded-r-none border-r-0"
              />
              <Button className="rounded-l-none">
                <Search className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="py-16 container">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Still have questions? We're here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a href="/contact">Contact Us</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/support">Visit Support Center</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
