
import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { CalendarDays, Clock, Edit, Settings } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AchievementBadge, Achievement } from "@/components/gamification/AchievementBadge";
import { StreakCalendar } from "@/components/gamification/StreakCalendar";

interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  joinedDate: string;
  bio: string;
  skills: string[];
  learningLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  streak: number;
  totalHoursLearned: number;
  topicsOfInterest: string[];
  certifications: Array<{
    name: string;
    issueDate: string;
    id: string;
  }>;
}

const Profile = () => {
  // State for user profile
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>("userProfile", {
    name: "Lital Levin",
    avatar: "",
    email: "lital@example.com",
    joinedDate: "May 2023",
    bio: "Frontend developer and UI/UX enthusiast passionate about creating intuitive and accessible web experiences.",
    skills: ["React", "TypeScript", "Tailwind CSS", "UI Design", "Accessibility"],
    learningLevel: "Intermediate",
    streak: 5,
    totalHoursLearned: 42,
    topicsOfInterest: ["React", "UI/UX Design", "Web Accessibility", "JavaScript"],
    certifications: [
      {
        name: "Frontend Development Basics",
        issueDate: "June 2023",
        id: "CERT-FE-2023-06"
      },
      {
        name: "React Fundamentals",
        issueDate: "August 2023",
        id: "CERT-REACT-2023-08"
      }
    ]
  });
  
  // State for user achievements
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>("userAchievements", [
    {
      id: "daily-streak-3",
      title: "3-Day Streak",
      description: "Completed lessons for 3 consecutive days",
      icon: "trophy",
      isUnlocked: true,
      dateAchieved: "2025-05-15",
      category: "streak"
    },
    {
      id: "daily-streak-7",
      title: "Weekly Warrior",
      description: "Completed lessons for 7 consecutive days",
      icon: "trophy",
      isUnlocked: true,
      dateAchieved: "2025-05-17",
      category: "streak"
    },
    {
      id: "lessons-5",
      title: "Getting Started",
      description: "Completed 5 lessons",
      icon: "check",
      isUnlocked: true,
      dateAchieved: "2025-05-12",
      category: "lessons"
    },
    {
      id: "first-project",
      title: "Project Pioneer",
      description: "Completed your first project",
      icon: "star",
      isUnlocked: true,
      dateAchieved: "2025-05-16",
      category: "projects"
    }
  ]);
  
  // Load user data from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserProfile(prev => ({ ...prev, name: storedUserName }));
    }
    
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserProfile(prev => ({ ...prev, email: storedEmail }));
    }
  }, [setUserProfile]);

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-10">
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Profile</h1>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Your Profile</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-medium">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{userProfile.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground/70" />
                  <p className="text-xs text-muted-foreground">Joined {userProfile.joinedDate}</p>
                </div>
                
                <Badge className="mt-3" variant="outline">{userProfile.learningLevel}</Badge>
                
                <div className="w-full mt-6 flex justify-between items-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-500">{userProfile.streak}</p>
                    <p className="text-xs text-muted-foreground">Day streak</p>
                  </div>
                  <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-500">{userProfile.totalHoursLearned}</p>
                    <p className="text-xs text-muted-foreground">Hours learned</p>
                  </div>
                  <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-brand-600 dark:text-brand-500">{unlockedAchievements.length}</p>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="w-full">
                  <h3 className="text-sm font-medium mb-2 text-left">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, i) => (
                      <div 
                        key={i} 
                        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full mt-6">
                  <h3 className="text-sm font-medium mb-2 text-left">Topics of Interest</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.topicsOfInterest.map((topic, i) => (
                      <div 
                        key={i} 
                        className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full text-xs"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>About Me</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{userProfile.bio}</p>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="achievements">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="achievements" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
                        {unlockedAchievements.map(achievement => (
                          <AchievementBadge 
                            key={achievement.id} 
                            achievement={achievement} 
                          />
                        ))}
                      </div>
                      {unlockedAchievements.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                          You haven't earned any achievements yet. Start learning to unlock them!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Learning Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StreakCalendar />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="certifications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userProfile.certifications.length > 0 ? (
                        <div className="space-y-4">
                          {userProfile.certifications.map((cert, index) => (
                            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{cert.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Issued: {cert.issueDate}</p>
                                </div>
                                <Button variant="outline" size="sm">View Certificate</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                          You haven't earned any certifications yet. Complete courses to earn them!
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
