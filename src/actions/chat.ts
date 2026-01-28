"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import Groq from "groq-sdk";

export async function getAiResponse({
  message,
  scenarioId,
}: {
  message: string;
  scenarioId?: string;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY environment variable.");

  const groq = new Groq({ apiKey });

  try {
    const client = await clientPromise;
    const db = client.db("mirrorDB");

    // 1. CONTEXT RETRIEVAL (Social Memory)
    const pastMessages = await db
      .collection("chat_history")
      .find({ userId: session.user.id, scenarioId })
      .sort({ timestamp: -1 })
      .limit(6)
      .toArray();

    const history = pastMessages.reverse().flatMap((doc) => [
      { role: "user", content: doc.userMessage },
      {
        role: "assistant",
        content: Object.values(doc.aiResponse)
          .filter((v) => typeof v === "string" && v.trim() !== "")
          .join(" "),
      },
    ]);

    // 2. IMPROVED SYSTEM INSTRUCTION
    const systemInstruction = `
ROLE: Structured assistant for an ASD Level 1 metacognitive practice platform.
THIS IS NOT THERAPY.

STRICT RULE: Identify user intent and respond using ONLY ONE MODE.

MODES:

1. UNDERSTANDING (User describes a situation)
- Purpose: Anchor the social situation calmly.
- Do NOT paraphrase the user sentence-by-sentence.
- Do NOT repeat the user’s exact wording.
- Focus on WHAT is happening socially, not emotions.
- Use ONE grounding sentence with varied phrasing.

2. REFLECTION (User asks if right/wrong or expresses confusion)
- Ask ONLY ONE reflective question.
- Focus on thought process or interpretation.
- No advice, no summary.

3. GUIDANCE (User asks what to do next)
- Provide 1–2 simple, practical suggestions.
- No questions, no summary.

4. CLOSURE (User gives short confirmation like "ok", "alright", "thanks")
- Briefly acknowledge the plan.
- End the turn naturally.

JSON FORMAT:
{ "summary": "...", "inquiry": "", "suggestion": "" }

HARD RULES:
- Only ONE field may be populated.
- All other fields MUST be empty strings.
- Phase 1 and Phase 4 output go into "summary".
- If message is 1–3 words ("ok", "yes", "alright", "thanks"), ALWAYS use CLOSURE mode.
- If more than one field is populated → INVALID response.

GLOBAL STYLE:
- Calm, simple, neutral language.
- Avoid reassurance and clinical phrasing.
- Avoid repeating sentence patterns across turns.
`;

    // 3. INFERENCE
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        ...history,
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const data = JSON.parse(
      chatCompletion.choices[0]?.message?.content || "{}"
    );

    // 4. SAVE
    await db.collection("chat_history").insertOne({
      userId: session.user.id,
      scenarioId,
      userMessage: message,
      aiResponse: data,
      timestamp: new Date(),
    });

    return data;
  } catch (error) {
    console.error("Mirror Error:", error);
    return { summary: "System recalibrating.", inquiry: "", suggestion: "" };
  }
}
