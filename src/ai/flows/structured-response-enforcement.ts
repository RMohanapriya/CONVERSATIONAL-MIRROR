import { z } from "zod";

/**
 * This schema defines the 4 pillars of the Conversational Mirror.
 * It ensures the AI always returns data in a format the UI can display.
 */
export const MirrorResponseSchema = z.object({
  aiResponse: z.string().describe("The direct response from the person in the scenario."),
  reflection: z.string().describe("An analysis of the social hidden curriculum or nuances in the user's message."),
  suggestion: z.string().describe("A gentle suggestion on how to rephrase or improve the social interaction."),
  theoryOfMind: z.string().describe("A brief explanation of what the other person might be thinking or feeling.")
});

export type MirrorResponse = z.infer<typeof MirrorResponseSchema>;

// Helper to create the system instruction
export const getSystemInstruction = (lifeStage: string) => `
  You are a non-judgmental Social Mirror for a person in the '${lifeStage}' stage of life. 
  Your goal is to help them navigate social nuances. 
  You must ALWAYS respond in valid JSON format matching the requested schema.
  Keep your 'reflection' and 'suggestion' sections supportive and clear.
`;