
/**
 * Generate AI responses based on user queries
 */
export const getAIResponse = (query: string, userName?: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("html") || lowerQuery.includes("structure")) {
    return "HTML (HyperText Markup Language) defines the structure of web content. Start with basic tags like <!DOCTYPE html>, <html>, <head>, and <body> to create your first webpage.";
  }
  
  if (lowerQuery.includes("css") || lowerQuery.includes("style")) {
    return "CSS (Cascading Style Sheets) controls the presentation of HTML elements. You can use selectors to target elements and apply properties like color, font-size, and margin.";
  }
  
  if (lowerQuery.includes("javascript") || lowerQuery.includes("js") || lowerQuery.includes("function")) {
    return "JavaScript is a programming language that enables interactive web pages. You can use functions, variables, and events to create dynamic content.";
  }
  
  if (lowerQuery.includes("react")) {
    return "React is a JavaScript library for building user interfaces, particularly single-page applications. It uses components to create reusable UI elements and a virtual DOM for efficient rendering.";
  }
  
  if (lowerQuery.includes("help") || lowerQuery.includes("stuck")) {
    return "I'd be happy to help! Could you provide more details about what you're working on or what concept you're struggling with?";
  }
  
  return "That's an interesting question! Let me guide you through this topic. What specific aspect would you like to know more about?";
};
