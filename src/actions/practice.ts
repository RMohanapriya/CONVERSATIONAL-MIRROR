"use server";

import Groq from "groq-sdk";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import type { PracticeResponse } from "../../types";

const MIRROR_CORE = `
You are Mirror — a safe, non-judgmental guide for people with ASD.

LANGUAGE RULES:
- Use plain, warm, concrete language. Short sentences. No jargon.
- Never use clinical ASD language (e.g. "social cues", "turn-taking", "ASD traits").
- Never label the user's behavior as wrong, broken, or a symptom.
- Always ground your response in the EXACT words the user used.
- Do not generalize. Do not assume. Only work with what the user shared.
`;

// ── similarity check (catches copy-paste of suggestion) ───────────────────
function isSimilarToSuggestion(input: string, suggestion: string): boolean {
  if (!suggestion) return false;
  const normalize = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9 ]/g, "");
  const a = normalize(input);
  const b = normalize(suggestion);
  if (a === b) return true;
  const wordsB = b.split(" ");
  const wordsA = new Set(a.split(" "));
  const overlap = wordsB.filter((w) => wordsA.has(w)).length;
  return overlap / wordsB.length >= 0.8;
}

// ── save session to MongoDB ───────────────────────────────────────────────
async function savePracticeSession({
  userId,
  scenarioId,
  lifeStage,
  userMessage,
  reflection,
  suggestion,
  isSuccessful,
  clarity_score,
}: {
  userId: string;
  scenarioId: string;
  lifeStage: string;
  userMessage: string;
  reflection: string;
  suggestion: string;
  isSuccessful: boolean;
  clarity_score: number;
}) {
  const client = await clientPromise;
  const db = client.db("mirrorDB");
  await db.collection("practice_history").insertOne({
    userId,
    scenarioId,
    lifeStage,
    userMessage,
    reflection,
    suggestion,
    isSuccessful,
    feedback: { clarity_score },
    timestamp: new Date(),
  });
}

export async function getPracticeResponse({
  userMessage,
  scenarioContext,
  scenarioId,
  lifeStage,
  lastSuggestion = "",
}: {
  userMessage: string;
  scenarioContext: string;
  scenarioId: string;
  lifeStage: string;
  lastSuggestion?: string;
}): Promise<PracticeResponse> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("Missing GROQ_API_KEY configuration.");
  }

  // ── if user copied the suggestion, auto-succeed without calling AI ────────
  if (isSimilarToSuggestion(userMessage, lastSuggestion)) {
    const autoResponse: PracticeResponse = {
      reflection:
        "That phrasing fits the situation. It's direct and easy to understand.",
      suggestion: "",
      isSuccessful: true,
    };

    try {
      const session = await auth();
      if (session?.user) {
        await savePracticeSession({
          userId: session.user.id ?? session.user.email ?? "unknown",
          scenarioId,
          lifeStage,
          userMessage,
          reflection: autoResponse.reflection,
          suggestion: "",
          isSuccessful: true,
          clarity_score: 8,
        });
      }
    } catch (saveError) {
      console.error("Failed to save auto-success session:", saveError);
    }

    return autoResponse;
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const systemInstruction = `
${MIRROR_CORE}

ROLE: Social rehearsal guide for people with ASD.
GOAL: Evaluate what the user said — be generous and encouraging. Only flag a response if it would genuinely cause confusion or hurt the relationship.

SITUATION: "${scenarioContext}"
USER'S RESPONSE: "${userMessage}"

EVALUATION PHILOSOPHY:
- People with ASD often communicate differently but still effectively. Imperfect phrasing is NOT a failure.
- If the user's intent is clear and kind, and the response would not damage the relationship — mark it as SUCCESSFUL.
- Only mark as needing improvement if the response would genuinely confuse the other person or come across as rude/dismissive.
- Grade on intent + effect, NOT on polish or grammar.

SUCCESS — mark isSuccessful: true if ANY of these are true:
- The user acknowledged the other person's situation (e.g. their deadline, feelings, workload)
- The user offered a practical solution or alternative
- The user asked a clarifying question
- The response would not damage the relationship even if phrased imperfectly
- The meaning is clear even if the words aren't perfect

ONLY mark isSuccessful: false if:
- The response would come across as rude, dismissive, or uncaring to most people
- The response completely ignores the other person's stated concern
- The response would likely cause conflict or confusion

SUCCESS CASE:
- reflection: One or two sentences explaining specifically what worked — what the user did right.
- suggestion: MUST be empty string "".
- isSuccessful: true.
- clarity_score: 6 to 10.

IMPROVEMENT CASE:
- reflection: One sentence naming the specific issue — what a listener might misunderstand or feel.
- suggestion: ONE natural sentence the user could say instead, specific to THIS situation.
  — Write as direct speech, ready to say aloud.
  — Do NOT start with "Try saying...", "You should...", or "I can...".
  — Must reference the actual situation, not be a generic phrase.
- isSuccessful: false.
- clarity_score: 1 to 5.

OUTPUT JSON ONLY:
{
  "reflection": "string",
  "suggestion": "string",
  "isSuccessful": boolean,
  "clarity_score": number
}
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemInstruction }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.15,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error("AI failed to return content.");

    const result = JSON.parse(content) as PracticeResponse & {
      clarity_score?: number;
    };

    try {
      const session = await auth();
      if (session?.user) {
        await savePracticeSession({
          userId: session.user.id ?? session.user.email ?? "unknown",
          scenarioId,
          lifeStage,
          userMessage,
          reflection: result.reflection,
          suggestion: result.suggestion,
          isSuccessful: result.isSuccessful,
          clarity_score:
            result.clarity_score ?? (result.isSuccessful ? 7 : 3),
        });
      }
    } catch (saveError) {
      console.error("Failed to save practice session:", saveError);
    }

    return {
      reflection: result.reflection,
      suggestion: result.suggestion,
      isSuccessful: result.isSuccessful,
    };
  } catch (error) {
    console.error("getPracticeResponse error:", error);
    return {
      reflection:
        "Mirror is currently refining its insight. Please try your response again.",
      suggestion: "Excuse me, could you repeat that?",
      isSuccessful: false,
    };
  }
}