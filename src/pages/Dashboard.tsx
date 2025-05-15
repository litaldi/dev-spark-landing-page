
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DemoUserBanner from "@/components/demo/DemoUserBanner";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus !== "true") {
      navigate("/auth/login");
      return;
    }

    setIsLoggedIn(true);
    
    // Check if demo user
    const demoStatus = localStorage.getItem("isDemoUser");
    setIsDemoUser(demoStatus === "true");
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-16">
        {isDemoUser && <DemoUserBanner />}
        
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              Welcome to your dashboard. This is a placeholder page for the dashboard interface.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Dashboard Widget {i}</h3>
                  <p className="text-gray-500 dark:text-gray-400">This is a placeholder for dashboard content.</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
