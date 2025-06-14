
interface ProgressData {
  userName: string;
  totalHours: number;
  streakDays: number;
  lessonsCompleted: number;
  projectsStarted: number;
  lastActivityDate?: string;
}

export function exportProgressReport(data: ProgressData): void {
  const reportContent = generateProgressReport(data);
  downloadFile(reportContent, `${data.userName}_progress_report.txt`, 'text/plain');
}

export function exportProgressCSV(data: ProgressData): void {
  const csvContent = generateProgressCSV(data);
  downloadFile(csvContent, `${data.userName}_progress_data.csv`, 'text/csv');
}

function generateProgressReport(data: ProgressData): string {
  const date = new Date().toLocaleDateString();
  
  return `
DevAI Learning Platform - Progress Report
Generated: ${date}
Student: ${data.userName}

===========================================
LEARNING PROGRESS SUMMARY
===========================================

📚 Study Statistics:
   • Total Study Hours: ${data.totalHours}
   • Current Streak: ${data.streakDays} days
   • Lessons Completed: ${data.lessonsCompleted}
   • Projects Started: ${data.projectsStarted}
   • Last Activity: ${data.lastActivityDate || 'N/A'}

🎯 Performance Insights:
   • Average Study Time: ${(data.totalHours / Math.max(data.streakDays, 1)).toFixed(1)} hours/day
   • Completion Rate: ${((data.lessonsCompleted / Math.max(data.projectsStarted * 3, 1)) * 100).toFixed(1)}%
   • Learning Consistency: ${data.streakDays > 7 ? 'Excellent' : data.streakDays > 3 ? 'Good' : 'Needs Improvement'}

🚀 Recommendations:
   ${generateRecommendations(data)}

===========================================
Keep up the great work! 🌟
  `.trim();
}

function generateProgressCSV(data: ProgressData): string {
  const headers = 'Date,Metric,Value';
  const rows = [
    `${new Date().toISOString().split('T')[0]},Total Hours,${data.totalHours}`,
    `${new Date().toISOString().split('T')[0]},Streak Days,${data.streakDays}`,
    `${new Date().toISOString().split('T')[0]},Lessons Completed,${data.lessonsCompleted}`,
    `${new Date().toISOString().split('T')[0]},Projects Started,${data.projectsStarted}`,
    `${new Date().toISOString().split('T')[0]},Last Activity,${data.lastActivityDate || 'N/A'}`
  ];
  
  return [headers, ...rows].join('\n');
}

function generateRecommendations(data: ProgressData): string {
  const recommendations = [];
  
  if (data.streakDays < 7) {
    recommendations.push('• Try to maintain a daily study routine for better consistency');
  }
  
  if (data.totalHours < 10) {
    recommendations.push('• Consider increasing daily study time to accelerate progress');
  }
  
  if (data.projectsStarted > data.lessonsCompleted) {
    recommendations.push('• Focus on completing current lessons before starting new projects');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('• Excellent progress! Keep maintaining your current pace');
    recommendations.push('• Consider exploring advanced topics to challenge yourself further');
  }
  
  return recommendations.join('\n   ');
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
