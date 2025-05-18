
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoUserBanner from "@/components/demo/DemoUserBanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Code, ListTodo, BarChart } from "lucide-react";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Check login status
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
      navigate("/auth/login");
      return () => clearTimeout(timer);
    }

    setIsLoggedIn(true);
    
    // Get user name
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    // Check if demo user
    const demoStatus = localStorage.getItem("isDemoUser");
    setIsDemoUser(demoStatus === "true");

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `You clicked on ${action}. This feature is coming soon!`,
    });
  };

  const dashboardWidgets = [
    {
      title: "Learning Roadmap",
      description: "Track your progress through the curriculum",
      icon: <Code className="h-6 w-6 text-primary" aria-hidden="true" />,
      action: "View Roadmap",
      onClick: () => handleAction("Learning Roadmap"),
    },
    {
      title: "Upcoming Tasks",
      description: "See what's next in your learning journey",
      icon: <ListTodo className="h-6 w-6 text-primary" aria-hidden="true" />,
      action: "View Tasks",
      onClick: () => handleAction("Upcoming Tasks"),
    },
    {
      title: "Weekly Schedule",
      description: "Plan your learning sessions",
      icon: <CalendarDays className="h-6 w-6 text-primary" aria-hidden="true" />,
      action: "Open Calendar",
      onClick: () => handleAction("Weekly Schedule"),
    },
    {
      title: "Performance Analytics",
      description: "Track your learning progress over time",
      icon: <BarChart className="h-6 w-6 text-primary" aria-hidden="true" />,
      action: "View Stats",
      onClick: () => handleAction("Performance Analytics"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink>Skip to content</SkipNavLink>
      <Navbar />
      <main className="flex-1 container py-8 md:py-16" id="main-content">
        <SkipNavContent>
          {isDemoUser && <DemoUserBanner className="mb-8" />}
          
          <section className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Welcome back, {userName}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {isLoading ? "Loading your dashboard..." : "Here's what's happening today"}
                </p>
              </div>
              <Button 
                onClick={() => handleAction("Quick Start")}
                className="whitespace-nowrap"
                aria-label="Start your daily learning session"
              >
                Start Today's Session
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardWidgets.map((widget, i) => (
                  <Card 
                    key={i} 
                    className="border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-primary/50 dark:hover:border-primary/30"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {widget.icon}
                      </div>
                      <CardTitle className="text-xl mt-2">{widget.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                        {widget.description}
                      </p>
                      <Button 
                        variant="outline"
                        onClick={widget.onClick}
                        size="sm"
                        className="w-full"
                        aria-label={widget.action}
                      >
                        {widget.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
          
          {/* Progress section */}
          <section className="mb-10">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Goal Progress</span>
                      <span className="text-primary font-medium">2/10 hours</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: "20%" }}
                        role="progressbar"
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Empty state message */}
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">
                      Complete your first lesson to see more detailed progress metrics
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={() => handleAction("First Lesson")}
                      aria-label="Start your first lesson"
                    >
                      Start First Lesson
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
