
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock } from "lucide-react";

export const StudyTimeSummary: React.FC = () => {
  // Mock data for study time by day of the week
  const studyData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 1.75 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 3.0 },
    { day: 'Sun', hours: 1.0 },
  ];

  // Calculate total hours
  const totalHours = studyData.reduce((sum, day) => sum + day.hours, 0);
  const averageHoursPerDay = (totalHours / 7).toFixed(1);
  const mostProductiveDay = [...studyData].sort((a, b) => b.hours - a.hours)[0].day;

  return (
    <Card className="border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" aria-hidden="true" />
          Study Time Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-medium">Total this week</p>
            <p className="text-2xl font-bold">{totalHours} hours</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Daily average</p>
            <p className="text-lg font-medium">{averageHoursPerDay} hrs</p>
          </div>
        </div>

        <div className="h-48 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis tickCount={5} />
              <Tooltip
                formatter={(value) => [`${value} hrs`, 'Study Time']}
                labelFormatter={(label) => `${label}`}
              />
              <Bar 
                dataKey="hours" 
                fill="var(--brand-500)" 
                radius={[4, 4, 0, 0]} 
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-sm text-center text-muted-foreground mt-2">
          Most productive day: <span className="font-medium">{mostProductiveDay}</span>
        </p>
      </CardContent>
    </Card>
  );
};
