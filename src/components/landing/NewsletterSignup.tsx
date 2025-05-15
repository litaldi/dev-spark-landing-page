
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-brand-50 border-t border-brand-100 py-10">
      <div className="container max-w-3xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-brand-800">
            Get Junior Dev Tips & Updates
          </h3>
          <p className="text-gray-600 mt-2">
            Join our newsletter for exclusive content, tips, and early access to new features.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
          />
          <Button 
            type="submit" 
            className="bg-brand-500 hover:bg-brand-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
