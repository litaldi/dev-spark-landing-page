
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

interface LoginSuccessProps {
  userName: string;
  redirectTo: string;
  isFirstTimeUser: boolean;
}

export const LoginSuccess = ({ userName, redirectTo, isFirstTimeUser }: LoginSuccessProps) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo);
    }, 2000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate, redirectTo]);

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center text-center max-w-md px-4">
        <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-6 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" aria-hidden="true" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {isFirstTimeUser ? "Welcome to DevSpark!" : "Welcome back!"}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {isFirstTimeUser 
            ? `Great to have you here, ${userName}. Setting up your dashboard...`
            : `Good to see you again, ${userName}. Loading your dashboard...`
          }
        </p>
        
        <div className="relative w-64 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-500 dark:bg-brand-400 rounded-full transition-all duration-300"
            style={{ width: `${((2 - countdown) / 2) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-3">
          Redirecting in {countdown} {countdown === 1 ? 'second' : 'seconds'}...
        </p>
      </div>
    </div>
  );
};
