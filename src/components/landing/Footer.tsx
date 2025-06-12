
import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-background border-t border-border"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info Column */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
              aria-label="Go to homepage"
            >
              <div 
                className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-base" 
                aria-hidden="true"
              >
                D
              </div>
              <span className="font-bold text-lg text-foreground">DevAI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              AI-powered programming education platform designed to help developers learn, grow, and excel in their coding journey.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Visit our GitHub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Visit our LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-accent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Visit our Twitter"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                <a 
                  href="mailto:hello@devai.com" 
                  className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  hello@devai.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                <a 
                  href="tel:+1234567890" 
                  className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground">
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on new features and learning resources.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 text-sm"
                  aria-label="Email address for newsletter"
                />
                <Button type="submit" size="sm" className="px-3">
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Subscribe to newsletter</span>
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground text-sm">Resources</h4>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/help" 
                    className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/accessibility" 
                    className="text-muted-foreground hover:text-primary text-sm transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              © {currentYear} DevAI Learning Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-xs">
              <Link 
                to="/terms" 
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/cookies" 
                className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus-visible:text-primary focus-visible:underline"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
