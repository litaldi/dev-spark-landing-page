
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, HelpCircle, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink contentId="main-content">Skip to content</SkipNavLink>
      <Navbar />
      <main className="flex-1">
        <SkipNavContent id="main-content">
          <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">Help Center</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
                Find answers to common questions or contact our support team.
              </p>
              
              <div className="max-w-lg mx-auto flex items-center">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    aria-label="Search for help articles"
                  />
                </div>
                <Button className="ml-2 px-6 h-[42px]">Search</Button>
              </div>
            </div>
          </section>
          
          <section className="py-16 container">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">Popular Topics</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Getting Started",
                  description: "Learn the basics and set up your DevAI account.",
                  icon: <BookOpen className="h-6 w-6 text-brand-500" />,
                  link: "/faq#getting-started"
                },
                {
                  title: "Account & Billing",
                  description: "Manage your account settings and subscription.",
                  icon: <FileText className="h-6 w-6 text-brand-500" />,
                  link: "/faq#account-billing"
                },
                {
                  title: "Technical Issues",
                  description: "Troubleshoot common problems and find solutions.",
                  icon: <HelpCircle className="h-6 w-6 text-brand-500" />,
                  link: "/faq#technical-issues"
                }
              ].map((topic, i) => (
                <Card key={i} className="transition-all hover:shadow-md">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 rounded-full bg-brand-50 dark:bg-gray-800">
                      {topic.icon}
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" asChild>
                      <Link to={topic.link} className="flex items-center">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
          
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Need Additional Help?</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Our support team is available to assist you with any questions or issues that aren't covered in our help articles.
                  </p>
                  <div className="space-y-4">
                    <Button asChild size="lg">
                      <Link to="/contact">Contact Support</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="ml-4">
                      <Link to="/faq">Visit FAQ</Link>
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Support Hours</h3>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 8:00 PM EST</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 6:00 PM EST</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      Average response time: <span className="font-medium text-green-600 dark:text-green-400">Under 24 hours</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
