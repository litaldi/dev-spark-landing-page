
import { ChatMessage } from '@/components/dashboard/ai-companion/types';

interface ProgressData {
  userName: string;
  totalHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  lastActivityDate?: string;
}

export const exportChatHistory = (messages: ChatMessage[], userName: string) => {
  const content = messages
    .map(msg => `[${msg.timestamp.toLocaleString()}] ${msg.sender.toUpperCase()}: ${msg.text}`)
    .join('\n\n');
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-chat-history-${userName}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportProgressReport = (data: ProgressData) => {
  const report = `
DevAI Learning Platform - Progress Report
Generated: ${new Date().toLocaleString()}

Student: ${data.userName}
=================================

Learning Statistics:
• Total Study Hours: ${data.totalHours}
• Current Streak: ${data.streakDays} days
• Lessons Completed: ${data.lessonsCompleted}
• Projects Started: ${data.projectsStarted}
• Last Activity: ${data.lastActivityDate || 'N/A'}

Progress Summary:
${data.lessonsCompleted > 10 ? '🏆 Excellent progress! You\'ve completed over 10 lessons.' : '📚 Keep learning! Complete more lessons to unlock achievements.'}
${data.streakDays > 7 ? '🔥 Amazing streak! You\'ve maintained consistency for over a week.' : '⭐ Build your learning habit by studying daily.'}
${data.totalHours > 20 ? '💪 Great dedication! You\'ve invested significant time in learning.' : '🎯 Continue investing time in your skills development.'}

Keep up the excellent work!
Visit: https://devai-learning.com for more resources.
  `.trim();

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `progress-report-${data.userName}-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportProgressCSV = (data: ProgressData) => {
  const csvContent = `
Date,Student,Total Hours,Streak Days,Lessons Completed,Projects Started,Last Activity
${new Date().toISOString().split('T')[0]},${data.userName},${data.totalHours},${data.streakDays},${data.lessonsCompleted},${data.projectsStarted},${data.lastActivityDate || 'N/A'}
  `.trim();

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `progress-data-${data.userName}-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
