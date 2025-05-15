
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CodeSquare, FileText } from "lucide-react";

const CommunityStats: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-brand-500" />,
      value: "5,000+",
      label: "Users Onboarded"
    },
    {
      icon: <CodeSquare className="h-8 w-8 text-brand-500" />,
      value: "50,000+",
      label: "Practice Challenges Completed"
    },
    {
      icon: <FileText className="h-8 w-8 text-brand-500" />,
      value: "1,200+",
      label: "Resumes Optimized"
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-brand-100">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-brand-800 mb-10">
          Join Our <span className="text-brand-500">Growing Community</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="border-none shadow-none bg-gradient-to-br from-brand-50 to-white"
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="mb-4">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-brand-800 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;
