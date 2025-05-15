
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const Privacy = () => {
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
                  <span className="text-gray-700">Privacy Policy</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Privacy Policy
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: May 15, 2025
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              At DevAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 mb-6">
              We may collect personal information that you voluntarily provide to us, such as your name, email address, and profile information when you register for an account. We also automatically collect certain information about your device and how you interact with our services.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and monitor and analyze usage patterns to enhance user experience.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              4. Information Sharing
            </h2>
            <p className="text-gray-700 mb-6">
              We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service. We may also disclose your information if required by law or to protect our rights, privacy, safety, or property.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              5. Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              6. Your Rights
            </h2>
            <p className="text-gray-700 mb-6">
              Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to collect information about your browsing activities and to remember your preferences. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              8. Third-Party Links
            </h2>
            <p className="text-gray-700 mb-6">
              Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              9. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              11. Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about this Privacy Policy, please contact us at privacy@devai.example.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
