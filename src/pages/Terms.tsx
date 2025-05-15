
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
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
                  <span className="text-gray-700">Terms of Use</span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="font-bold text-3xl md:text-4xl mb-8 text-brand-800">
            Terms of Use
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: May 15, 2025
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-6">
              By accessing or using DevAI services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              2. Description of Service
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI provides tools and resources for developers to practice coding, build portfolios, and prepare for job interviews. Our services include AI-powered feedback, guided learning paths, and community resources.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              3. User Accounts
            </h2>
            <p className="text-gray-700 mb-6">
              You may need to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              4. User Content
            </h2>
            <p className="text-gray-700 mb-6">
              You retain all rights to any content you submit through our services. By posting content, you grant DevAI a worldwide, non-exclusive license to use, reproduce, and display your content in connection with providing our services.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              5. Prohibited Activities
            </h2>
            <p className="text-gray-700 mb-6">
              Users may not engage in any activity that interferes with or disrupts our services, attempts to gain unauthorized access to our systems, or violates any applicable laws or regulations.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              6. Modification of Terms
            </h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website or sending an email.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              7. Termination
            </h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or us.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              8. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 mb-6">
              Our services are provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-6">
              DevAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
            
            <h2 className="font-medium text-xl mt-8 mb-4 text-brand-700">
              10. Governing Law
            </h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be governed by the laws of the jurisdiction in which DevAI operates, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
