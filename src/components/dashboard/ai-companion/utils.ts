
import { sanitizeInput } from '@/lib/security';

export const getAIResponse = (userMessage: string, userName: string): string => {
  // Sanitize the input message
  const sanitizedMessage = sanitizeInput(userMessage.toLowerCase());
  
  // Simple response logic based on keywords
  if (sanitizedMessage.includes('help') || sanitizedMessage.includes('stuck')) {
    return `Hi ${userName}! I'm here to help. Can you tell me more about what you're working on? I can assist with code reviews, explain concepts, or suggest learning resources.`;
  }
  
  if (sanitizedMessage.includes('code') || sanitizedMessage.includes('review')) {
    return `I'd be happy to help with code review! Please share your code and I'll provide feedback on best practices, potential improvements, and learning opportunities.`;
  }
  
  if (sanitizedMessage.includes('learn') || sanitizedMessage.includes('study')) {
    return `Great question about learning! Based on your progress, I recommend focusing on practical projects. Would you like me to suggest some exercises that match your current skill level?`;
  }
  
  if (sanitizedMessage.includes('project') || sanitizedMessage.includes('build')) {
    return `Building projects is an excellent way to learn! I can help you plan your project structure, suggest technologies, or review your implementation as you go.`;
  }
  
  if (sanitizedMessage.includes('debug') || sanitizedMessage.includes('error')) {
    return `Debugging can be tricky! Share the error message or describe the issue you're facing, and I'll help you troubleshoot step by step.`;
  }
  
  if (sanitizedMessage.includes('thanks') || sanitizedMessage.includes('thank you')) {
    return `You're very welcome, ${userName}! I'm always here to support your learning journey. Feel free to ask me anything anytime!`;
  }
  
  // Default responses
  const defaultResponses = [
    `That's an interesting question, ${userName}! Can you provide more details so I can give you a more specific answer?`,
    `I'm here to help with your learning journey! What specific topic or challenge would you like to explore?`,
    `Great to hear from you! I can assist with coding concepts, project planning, or learning strategies. What would be most helpful right now?`,
    `Let's dive into that topic together! What aspect would you like to focus on first?`
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};
