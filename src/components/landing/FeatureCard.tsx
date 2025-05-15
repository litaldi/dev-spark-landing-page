
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon, description }) => {
  return (
    <Card 
      className="h-full border-brand-100 hover:border-brand-300 hover:shadow-md transition-all duration-300 group focus-within:ring-2 focus-within:ring-brand-400 focus-within:ring-offset-2"
      tabIndex={0}
    >
      <CardContent className="flex flex-col items-center p-6 text-center h-full">
        <div 
          className="rounded-full bg-brand-100 p-3 mb-4 group-hover:bg-brand-200 transition-colors duration-300 transform group-hover:scale-110 group-focus-within:bg-brand-200 group-focus-within:scale-110"
          aria-hidden="true"
        >
          <Icon className="h-8 w-8 text-brand-600 group-hover:text-brand-700 transition-colors" />
        </div>
        
        <h3 className="text-xl font-medium mb-3 text-brand-800">{title}</h3>
        
        {description && (
          <p className="text-gray-600 mt-2 leading-relaxed">{description}</p>
        )}
        
        <div 
          className="mt-auto w-0 group-hover:w-1/2 group-focus-within:w-1/2 h-0.5 bg-brand-300 mt-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" 
          aria-hidden="true"
        ></div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
