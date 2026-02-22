export interface MirrorFeedback {
  tone: string;
  clarity_score: number;
  emotional_impact?: string;
  suggestion: string;
}

export type LifeStage = "school" | "college" | "adult";

export type NormalizedLifeStage = "school" | "college" | "job";

export interface AIResponse {
  summary: string;
  inquiry: string;
  suggestion: string;
}

export interface PracticeResponse {
  reflection: string;
  suggestion: string;
  isSuccessful: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  context: string;
  research_goal: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  suggestion?: string;
  inquiry?: string;   // ← added: holds the follow-up question separately
}