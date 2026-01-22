import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

// Initialize Genkit with the Google AI plugin
export const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash', {
    temperature: 0.7, // Balances structure with natural tone
  }),
});