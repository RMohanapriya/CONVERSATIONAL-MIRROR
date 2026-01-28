"use server";

import Groq from "groq-sdk";

/**
 * getPracticeResponse:
 * The Behavioral Coach core logic. Evaluates user social attempts against a mission context.
 */
export async function getPracticeResponse({
  userMessage,
  scenarioContext,
}: {
  userMessage: string;
  scenarioContext: string;
}) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY configuration.");
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const systemInstruction = `
ROLE: Social Skills Coach for ASD Level 1 adults.
GOAL: Evaluate a social rehearsal attempt using Reflection and a Scripted Alternative.

CONTEXT: "${scenarioContext}"
USER ATTEMPT: "${userMessage}"

STRICT EVALUATION RULES:
1. Judge ONLY the user's spoken response.
2. NO emotional reassurance or "praising" language.
3. NO questions or psychological analysis.
4. Use neutral, concrete, and concise language.

SUCCESS CASE (Effective Communication):
- reflection: Explain clearly why the response was socially effective.
- suggestion: MUST be an empty string "".
- isSuccessful: true.

IMPROVEMENT CASE (Ineffective/Unclear):
- reflection: Explain the specific social limitation or "hidden rule" missed.
- suggestion: Provide a single sentence the user can say aloud.
- suggestion MUST: NOT use "Try saying...", "I can...", or "You should...". Start the dialogue directly.
- isSuccessful: false.

OUTPUT JSON ONLY:
{
  "reflection": "string",
  "suggestion": "string",
  "isSuccessful": boolean
}
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.15, // Low temperature for high consistency/determinism
    });

    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) throw new Error("AI failed to return content.");

    return JSON.parse(content);

  } catch (error) {
    console.error("Coach Logic Error:", error);
    // Bulletproof Fallback
    return {
      reflection: "The coach is currently refining its insight. Please try your response again.",
      suggestion: "Excuse me, could you repeat that?",
      isSuccessful: false,
    };
  }
}