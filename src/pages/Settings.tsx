
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AccessibilityMenu } from "@/components/a11y/AccessibilityMenu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink contentId="main-content" />
      <Navbar />
      <SkipNavContent id="main-content">
        <main className="flex-1 container py-16">
          <section className="mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <AccessibilityMenu />
                  <span className="text-sm text-muted-foreground">Accessibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-sm text-muted-foreground">Theme</span>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="appearance">Dark Theme</Label>
                        <p className="text-sm text-muted-foreground">Set your preferred theme</p>
                      </div>
                      <Switch id="appearance" />
                    </div>
                    
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="language">Language</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="form-select rounded border border-gray-300 dark:border-gray-700 px-3 py-1 bg-white dark:bg-gray-800">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="change-password">Change Password</Label>
                      <input
                        id="change-password"
                        type="password" 
                        placeholder="New password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <input
                        id="confirm-password"
                        type="password" 
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                      />
                    </div>
                    
                    <Button className="mt-4">Update Password</Button>
                    
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                      <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
                      <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back.</p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch id="email-notifications" />
                    </div>
                    
                    <div className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive marketing newsletters</p>
                      </div>
                      <Switch id="marketing" />
                    </div>
                    
                    <Button className="mt-4">Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </SkipNavContent>
      <Footer />
    </div>
  );
};

export default Settings;
