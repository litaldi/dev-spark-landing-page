
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
    <Card className="hover:shadow-lg transition-all duration-500 border-brand-100 hover:border-brand-300 h-full group">
      <CardContent className="flex flex-col items-center p-6 text-center h-full">
        <div className="rounded-full bg-brand-100 p-3 mb-4 group-hover:bg-brand-200 transition-colors duration-300 transform group-hover:scale-110">
          <Icon className="h-8 w-8 text-brand-600 group-hover:text-brand-700 transition-colors" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-brand-800">{title}</h3>
        {description && <p className="text-gray-600 text-sm mt-2">{description}</p>}
        <div className="w-0 group-hover:w-1/2 h-0.5 bg-brand-300 mt-3 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
