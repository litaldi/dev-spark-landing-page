
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const Accessibility = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="mb-6 flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-brand-500">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-700">Accessibility Statement</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Accessibility Statement
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: May 15, 2025
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Our Commitment
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve this.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Conformance Status
            </h2>
            <p className="text-gray-700 mb-6">
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. DevAI is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Accessibility Features
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI includes the following accessibility features:
            </p>
            <ul className="list-disc pl-8 mb-6 text-gray-700">
              <li>Semantic HTML structure</li>
              <li>Keyboard navigation support</li>
              <li>ARIA attributes where appropriate</li>
              <li>Alternative text for images</li>
              <li>Color contrast that meets WCAG 2.1 AA standards</li>
              <li>Resizable text without loss of functionality</li>
              <li>Focus indicators for keyboard navigation</li>
            </ul>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Compatible Browsers and Assistive Technologies
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI is designed to be compatible with the following browsers and assistive technologies:
            </p>
            <ul className="list-disc pl-8 mb-6 text-gray-700">
              <li>Latest versions of Chrome, Firefox, Safari, and Edge</li>
              <li>Screen readers including NVDA, JAWS, and VoiceOver</li>
              <li>Zoom capabilities up to 200% without loss of content or functionality</li>
            </ul>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Known Limitations
            </h2>
            <p className="text-gray-700 mb-6">
              Despite our best efforts, there may be some aspects of our website that are not fully accessible:
            </p>
            <ul className="list-disc pl-8 mb-6 text-gray-700">
              <li>Some older PDF documents may not be fully accessible to screen readers</li>
              <li>Some interactive code examples may have limited accessibility features</li>
              <li>Some third-party content may not be fully accessible</li>
            </ul>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Feedback
            </h2>
            <p className="text-gray-700 mb-6">
              We welcome your feedback on the accessibility of DevAI. Please let us know if you encounter accessibility barriers:
            </p>
            <ul className="list-disc pl-8 mb-6 text-gray-700">
              <li>Email: accessibility@devai.example.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Feedback form: [Link to form]</li>
            </ul>
            <p className="text-gray-700 mb-6">
              We try to respond to feedback within 2 business days.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Assessment Methods
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI assesses the accessibility of our website using the following methods:
            </p>
            <ul className="list-disc pl-8 mb-6 text-gray-700">
              <li>Self-evaluation</li>
              <li>External evaluation by accessibility experts</li>
              <li>User testing with assistive technologies</li>
              <li>Automated testing tools</li>
            </ul>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              Formal Approval
            </h2>
            <p className="text-gray-700 mb-6">
              This accessibility statement was created on May 15, 2025, and was last updated on May 15, 2025.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessibility;
