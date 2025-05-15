
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with actual form submission logic
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
        </section>
        
        <section className="py-16 container">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our team is here to help. Reach out to us through any of the channels below or fill out the contact form.
              </p>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Email</p>
                      <a href="mailto:hello@devai.com" className="text-brand-600 dark:text-brand-400 hover:underline">hello@devai.com</a>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Phone</p>
                      <a href="tel:+1-555-123-4567" className="text-brand-600 dark:text-brand-400 hover:underline">+1 (555) 123-4567</a>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">Address</p>
                      <p className="text-gray-600 dark:text-gray-300">123 Tech Drive, San Francisco, CA 94107</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Send us a message</h3>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Message subject" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
