
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  // Mock user data - this would come from your API or auth provider in a real app
  const user = {
    name: "Lital Levin",
    avatar: "", // Place your avatar URL here
    email: "lital@example.com",
    joined: "May 2023",
    bio: "Frontend developer and UI/UX enthusiast",
    skills: ["React", "TypeScript", "Tailwind CSS", "UI Design"]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-16">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-medium">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">Joined {user.joined}</p>
                
                <Separator className="my-6" />
                
                <Button className="w-full" variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{user.bio}</p>
                
                <h3 className="text-md font-medium mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
