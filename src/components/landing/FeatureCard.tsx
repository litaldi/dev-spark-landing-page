
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon: Icon }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-brand-100 hover:border-brand-300 h-full">
      <CardContent className="flex flex-col items-center p-6 text-center h-full">
        <div className="rounded-full bg-brand-100 p-3 mb-4">
          <Icon className="h-8 w-8 text-brand-600" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-brand-800">{title}</h3>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
