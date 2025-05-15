
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MailCheck } from "lucide-react";

const Newsletter = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This would be replaced with actual form submission logic
    toast({
      title: "Success!",
      description: "You have been subscribed to our newsletter.",
      duration: 5000,
    });
    
    // Reset the form
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                <MailCheck className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Join Our Newsletter</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with the latest developer tools, AI advancements, and product updates.
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                />
              </div>
              
              <div className="space-y-4">
                <Label>Interests</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="interest-ai" />
                  <Label htmlFor="interest-ai" className="font-normal">Artificial Intelligence</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="interest-dev" />
                  <Label htmlFor="interest-dev" className="font-normal">Developer Tools</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="interest-tutorials" />
                  <Label htmlFor="interest-tutorials" className="font-normal">Tutorials & Guides</Label>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" required />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="terms" 
                    className="font-normal text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to receive occasional emails from DevAI. You can unsubscribe at any time.
                  </Label>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;
