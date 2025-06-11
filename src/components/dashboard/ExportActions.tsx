
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { exportProgressReport, exportProgressCSV } from "@/lib/export-utils";

interface ExportActionsProps {
  userName: string;
  totalHours: number;
  currentStreak: number;
  lessonsCompleted: number;
  projectsStarted: number;
  lastActivityDate?: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  userName,
  totalHours,
  currentStreak,
  lessonsCompleted,
  projectsStarted,
  lastActivityDate
}) => {
  const handleExportProgress = () => {
    exportProgressReport({
      userName,
      totalHours,
      streakDays: currentStreak,
      lessonsCompleted,
      projectsStarted,
      lastActivityDate
    });
  };

  const handleExportCSV = () => {
    exportProgressCSV({
      userName,
      totalHours,
      streakDays: currentStreak,
      lessonsCompleted,
      projectsStarted,
      lastActivityDate
    });
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <Button 
          variant="outline"
          size="sm"
          className="w-full justify-start hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300"
          onClick={handleExportProgress}
          aria-label="Export progress report"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Progress Report
        </Button>
        <Button 
          variant="outline"
          size="sm"
          className="w-full justify-start hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all duration-300"
          onClick={handleExportCSV}
          aria-label="Export progress data as CSV"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV Data
        </Button>
      </div>
    </motion.div>
  );
};
