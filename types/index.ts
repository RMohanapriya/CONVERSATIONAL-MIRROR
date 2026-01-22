export interface MirrorFeedback {
  tone: string;
  clarity_score: number;
  emotional_impact?: string; // Optional if not displayed on main page
  suggestion: string;
}