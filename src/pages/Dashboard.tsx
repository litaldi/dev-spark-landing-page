
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoUserBanner from "@/components/demo/DemoUserBanner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Code, ListTodo, BarChart, ChevronRight, BookOpen, Award, Zap } from "lucide-react";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/loading";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(false);
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
    
    // Check if first-time user (no lessons completed)
    const onboardingComplete = localStorage.getItem("onboardingComplete");
    setIsFirstTimeUser(onboardingComplete !== "true");

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

  const startFirstLesson = () => {
    localStorage.setItem("onboardingComplete", "true");
    setIsFirstTimeUser(false);
    toast({
      title: "First Lesson Started",
      description: "Welcome to your learning journey!",
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

  const quickStartCards = [
    {
      title: "Begin HTML & CSS Basics",
      description: "Start with the fundamentals of web development",
      icon: <BookOpen className="h-8 w-8 text-brand-400" />,
      time: "Est. 2 hours",
      onClick: () => handleAction("HTML & CSS"),
    },
    {
      title: "JavaScript Essentials",
      description: "Learn the core concepts of JavaScript programming",
      icon: <Zap className="h-8 w-8 text-amber-400" />,
      time: "Est. 3 hours",
      onClick: () => handleAction("JavaScript"),
    },
    {
      title: "React Introduction",
      description: "Build your first React component",
      icon: <Award className="h-8 w-8 text-sky-400" />,
      time: "Est. 4 hours",
      onClick: () => handleAction("React"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink>Skip to content</SkipNavLink>
      <Navbar />
      <main className="flex-1 container py-6 md:py-10 lg:py-12" id="main-content">
        <SkipNavContent>
          {isDemoUser && <DemoUserBanner className="mb-6" />}
          
          <section className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  Welcome back, {userName}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {isLoading ? "Loading your dashboard..." : isFirstTimeUser ? "Let's start your learning journey" : "Here's what's happening today"}
                </p>
              </div>
              {!isFirstTimeUser && (
                <Button 
                  onClick={() => handleAction("Quick Start")}
                  className="whitespace-nowrap"
                  aria-label="Start your daily learning session"
                >
                  Start Today's Session
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <Skeleton height="24px" width="24px" className="rounded-full" />
                      <Skeleton height="28px" width="70%" className="mt-4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton height="40px" width="100%" />
                      <Skeleton height="36px" width="50%" className="mt-4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : isFirstTimeUser ? (
              <Card className="border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/20">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-brand-700 dark:text-brand-300">Ready to start learning?</CardTitle>
                  <CardDescription>Complete your first lesson to unlock your personalized dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickStartCards.map((card, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-200 cursor-pointer group",
                          i === 0 && "ring-2 ring-brand-300 dark:ring-brand-700"
                        )}
                        onClick={i === 0 ? startFirstLesson : card.onClick}
                      >
                        <div className="flex flex-col space-y-3">
                          <div className="rounded-full bg-brand-100 dark:bg-brand-900/50 w-12 h-12 flex items-center justify-center mb-1">
                            {card.icon}
                          </div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                            {card.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {card.description}
                          </p>
                          <div className="text-xs text-gray-500 flex items-center justify-between mt-2">
                            <span>{card.time}</span>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-center border-t border-gray-100 dark:border-gray-800 pt-4">
                  <Button 
                    onClick={startFirstLesson} 
                    className="bg-brand-500 hover:bg-brand-600 text-white"
                  >
                    Start First Lesson
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
          
          {/* Progress section - only show if not first-time user */}
          {!isFirstTimeUser && !isLoading && (
            <section className="mb-8">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl md:text-2xl">Your Progress</CardTitle>
                  <CardDescription>
                    Track your learning goals and recent achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                          aria-label="Weekly goal progress: 20%"
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1">
                        <span>0 hours</span>
                        <span>10 hours</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">2</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Lessons completed</div>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">1</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Projects started</div>
                      </div>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">5</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Days streak</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </SkipNavContent>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
