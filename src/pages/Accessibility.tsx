
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { SkipNavLink, SkipNavContent } from "@/components/a11y/skip-nav";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipNavLink contentId="main-content">Skip to main content</SkipNavLink>
      <Navbar />
      <SkipNavContent id="main-content">
        <main className="flex-1 container py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Accessibility Statement</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="mb-4">
                We are committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
              <p className="mb-4">
                We've implemented the following features to make our website more accessible:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Text size adjustment for better readability</li>
                <li>High contrast mode for users with visual impairments</li>
                <li>Enhanced keyboard navigation for users who cannot use a mouse</li>
                <li>Skip to content link for keyboard users to bypass repetitive navigation</li>
                <li>ARIA attributes throughout the site for better screen reader compatibility</li>
                <li>Alt text for all informative images</li>
                <li>Semantic HTML for better document structure</li>
                <li>Responsive design that works on various devices and screen sizes</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Using Our Accessibility Menu</h2>
              <p className="mb-4">
                Our accessibility menu (the button with the accessibility icon) allows you to:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Adjust Text Size:</strong> Make text larger or smaller for better readability</li>
                <li><strong>Enable High Contrast Mode:</strong> Increase color contrast for easier reading</li>
                <li><strong>Enable Keyboard Navigation Mode:</strong> Enhanced focus indicators for keyboard users</li>
              </ul>
              <p className="mt-4">
                Your accessibility preferences will be saved for future visits to our site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
              <p>
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards. We are actively working to maintain and improve our level of accessibility.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
              <p className="mb-4">
                We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us through our <a href="/contact" className="text-primary underline">Contact Page</a>.
              </p>
            </section>
          </div>
        </main>
      </SkipNavContent>
      <Footer />
    </div>
  );
};

export default Accessibility;
