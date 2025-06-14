
import React from "react";
import { EnhancedDashboardLayout } from "@/components/dashboard/enhanced/EnhancedDashboardLayout";
import { useAuth } from "@/hooks/auth/use-auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Users, Star } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or a loading spinner
  }

  const handleStartFirstLesson = () => {
    console.log("Starting first lesson...");
    // Navigate to first lesson or show lesson selection
  };

  const handleStartTodaysSession = () => {
    console.log("Starting today's session...");
    // Navigate to continue learning
  };

  const quickActions = [
    {
      title: "Browse Courses",
      description: "Explore our comprehensive programming courses",
      icon: BookOpen,
      action: () => console.log("Browse courses"),
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Practice Coding",
      description: "Sharpen your skills with coding challenges",
      icon: Code,
      action: () => console.log("Practice coding"),
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Join Community",
      description: "Connect with other learners and mentors",
      icon: Users,
      action: () => console.log("Join community"),
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "View Achievements",
      description: "See your progress and earned badges",
      icon: Star,
      action: () => console.log("View achievements"),
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950"
    }
  ];

  return (
    <EnhancedDashboardLayout
      userName={user.name}
      isFirstTimeUser={user.isFirstTimeUser || false}
      isLoading={false}
      onStartFirstLesson={handleStartFirstLesson}
      onStartTodaysSession={handleStartTodaysSession}
    >
      {/* Quick Actions Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Card 
                key={action.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-background via-background to-muted/20"
                onClick={action.action}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${action.color}`} />
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
};

export default Dashboard;
