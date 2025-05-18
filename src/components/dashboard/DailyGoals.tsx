
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const DailyGoals: React.FC = () => {
  // Mock data for daily goals
  const goals = [
    { id: 1, name: "Complete JavaScript lesson", completed: true },
    { id: 2, name: "Solve 2 coding challenges", completed: false },
    { id: 3, name: "Review yesterday's notes", completed: true }
  ];
  
  // Calculate completion percentage
  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const completionPercentage = Math.round((completedGoals / totalGoals) * 100);
  
  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Trophy className="h-4 w-4 text-yellow-500" aria-hidden="true" />
          Daily Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">{completedGoals} of {totalGoals} completed</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        <ul className="space-y-2 mt-3">
          {goals.map((goal) => (
            <li key={goal.id} className="flex items-center gap-2">
              <CheckCircle2 
                className={`h-4 w-4 flex-shrink-0 ${
                  goal.completed ? "text-green-500" : "text-gray-300 dark:text-gray-600"
                }`} 
                aria-hidden="true"
              />
              <span className={`text-sm ${
                goal.completed ? "line-through text-muted-foreground" : ""
              }`}>
                {goal.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
