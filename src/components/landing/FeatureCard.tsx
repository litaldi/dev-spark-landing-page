
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  id?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon, description, id }) => {
  // Generate a unique ID if not provided
  const cardId = id || `feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <Card 
      className="h-full border-brand-100 hover:border-brand-300 hover:shadow-md dark:border-brand-700 dark:hover:border-brand-500 transition-all duration-300 group focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1"
      tabIndex={0}
      id={cardId}
      role="article"
      aria-labelledby={`${cardId}-title`}
      aria-describedby={description ? `${cardId}-desc` : undefined}
    >
      <CardContent className="flex flex-col items-center p-6 text-center h-full">
        <div 
          className="rounded-full bg-brand-100/80 dark:bg-brand-900/30 p-3.5 mb-5 group-hover:bg-brand-200 dark:group-hover:bg-brand-800/50 transition-all duration-300 transform group-hover:scale-105 group-focus-within:bg-brand-200 group-focus-within:scale-105"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6 text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors" />
        </div>
        
        <h3 
          id={`${cardId}-title`}
          className="text-xl font-semibold mb-3 text-brand-800 dark:text-brand-200 group-hover:text-brand-700 dark:group-hover:text-brand-100 transition-colors"
        >
          {title}
        </h3>
        
        {description && (
          <p 
            id={`${cardId}-desc`}
            className="text-gray-600 dark:text-gray-300 mt-2.5 leading-relaxed"
          >
            {description}
          </p>
        )}
        
        <div 
          className="mt-auto w-0 group-hover:w-1/3 group-focus-within:w-1/3 h-0.5 bg-brand-300 dark:bg-brand-700 mt-4 transition-all duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" 
          aria-hidden="true"
        ></div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
