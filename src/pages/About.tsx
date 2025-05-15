
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">About DevAI</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're building the next generation of developer tools powered by artificial intelligence.
            </p>
          </div>
        </section>
        
        <section className="py-16 container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                DevAI is on a mission to empower developers at every stage of their journey. We believe that AI can be a powerful tool to augment human creativity and productivity.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our platform combines cutting-edge AI technology with intuitive design to help developers learn faster, code better, and build more efficiently.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500 text-center">
                [Mission Image Placeholder]
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We constantly push the boundaries of what's possible with AI and developer tools."
                },
                {
                  title: "Accessibility",
                  description: "We believe great development tools should be accessible to everyone, regardless of background."
                },
                {
                  title: "Quality",
                  description: "We're committed to building reliable, high-quality tools that developers can depend on."
                },
                {
                  title: "Community",
                  description: "We value the developer community and build our products with their needs in mind."
                },
                {
                  title: "Education",
                  description: "We're passionate about helping developers learn and grow their skills."
                },
                {
                  title: "Ethics",
                  description: "We approach AI development with a strong commitment to ethical practices and principles."
                }
              ].map((value, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <h3 className="text-xl font-medium text-gray-800 dark:text-white">Team Member {i}</h3>
                <p className="text-gray-500 dark:text-gray-400">Position</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
