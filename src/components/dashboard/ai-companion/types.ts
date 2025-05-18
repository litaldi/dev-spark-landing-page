
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface AIStudyCompanionProps {
  userName: string;
}
