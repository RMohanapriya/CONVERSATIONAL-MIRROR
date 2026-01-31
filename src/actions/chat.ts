"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import Groq from "groq-sdk";

type AIResponse = {
  summary: string;
  inquiry: string;
  suggestion: string;
};

const MODE_REGEX = /^(past|future|present|now)$/i;
const YES_REGEX = /^(yes|yeah|yep|sure)$/i;
const NO_REGEX = /^(no|not now|nothing|skip)$/i;
const STOP_REGEX = /^(stop|exit)$/i;
const UNDERSTOOD_REGEX = /^(ok|okay|i understood|got it)$/i;

export async function getAiResponse({
  message,
  scenarioId,
  lifeStage,
}: {
  message: string;
  scenarioId?: string;
  lifeStage: "school" | "college" | "adult";
}): Promise<AIResponse> {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
  const resolvedScenarioId = scenarioId ?? "general";
  const client = await clientPromise;
  const db = client.db("mirrorDB");

  const lastTurns = await db
    .collection("chat_history")
    .find({ userId: session.user.id, scenarioId: resolvedScenarioId })
    .sort({ timestamp: -1 })
    .limit(1)
    .toArray();

  const lastTurn = lastTurns[0];

  /* ---------- CLOSURE ---------- */
  if (
    STOP_REGEX.test(message.trim()) ||
    UNDERSTOOD_REGEX.test(message.trim()) ||
    (NO_REGEX.test(message.trim()) && lastTurn?.stage === "FOLLOW_UP")
  ) {
    const closure: AIResponse = {
      summary:
        "You reflected on what happened and learned something useful about social timing. That effort matters. We can stop here.",
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(db, session.user.id, resolvedScenarioId, message, closure, "CLOSED");
    return closure;
  }

  /* ---------- MODE ---------- */
  if (MODE_REGEX.test(message.trim())) {
    const mode = message.trim().toUpperCase();
    const response: AIResponse = {
      summary:
        mode === "PAST"
          ? "Okay. Please describe the past situation you want to talk about."
          : "Okay. Please describe the situation that is coming up.",
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(db, session.user.id, resolvedScenarioId, message, response, "AWAIT_SCENARIO", mode);
    return response;
  }

  /* ---------- PAST: QUESTION ---------- */
  if (lastTurn?.stage === "AWAIT_SCENARIO" && lastTurn.scenarioType === "PAST") {
    const question: AIResponse = {
      summary: "",
      inquiry:
        lifeStage === "college"
          ? "What were you hoping would happen when you spoke?"
          : "What were you trying to do when you spoke?",
      suggestion: "",
    };

    await saveTurn(db, session.user.id, resolvedScenarioId, message, question, "QUESTION", "PAST");
    return question;
  }

  /* ---------- PAST: REFLECTION ---------- */
  if (lastTurn?.stage === "QUESTION") {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
ROLE: ASD-safe reflection assistant.

TASK:
- Validate the user's intent
- Clearly state WHAT the user did that caused difficulty
- Explain WHY it didn’t work
- Explain the hidden social rule (turn-taking / timing)
- DO NOT give advice
- DO NOT ask questions
- Keep it factual and supportive

OUTPUT JSON:
{ "summary": "", "inquiry": "", "suggestion": "" }

Populate ONLY summary.
`,
        },
        { role: "user", content: message },
      ],
    });

    const reflection: AIResponse = JSON.parse(completion.choices[0].message.content);
    reflection.summary += "\n\nWould you like a suggestion?";

    await saveTurn(db, session.user.id, resolvedScenarioId, message, reflection, "ASK_SUGGESTION", "PAST");
    return reflection;
  }

  /* ---------- PAST: SUGGESTION ---------- */
  if (lastTurn?.stage === "ASK_SUGGESTION" && YES_REGEX.test(message.trim())) {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
ROLE: ASD-safe coaching assistant.

TASK:
- Give 1–2 specific actions the user could do NEXT TIME
- Suggestions must replace the past mistake
- Focus on timing, signaling, or waiting strategies
- No general advice
- No questions

OUTPUT JSON:
{ "summary": "", "inquiry": "", "suggestion": "" }

Populate ONLY suggestion.
`,
        },
        { role: "user", content: message },
      ],
    });

    const suggestion: AIResponse = JSON.parse(completion.choices[0].message.content);
    suggestion.suggestion += "\n\nIs there anything else you'd like to discuss?";

    await saveTurn(db, session.user.id, resolvedScenarioId, message, suggestion, "FOLLOW_UP", "PAST");
    return suggestion;
  }

  /* ---------- LOOP ---------- */
  if (lastTurn?.stage === "FOLLOW_UP" && YES_REGEX.test(message.trim())) {
    const response: AIResponse = {
      summary: "Okay. Please describe the next past situation you’d like to talk about.",
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(db, session.user.id, resolvedScenarioId, message, response, "AWAIT_SCENARIO", "PAST");
    return response;
  }

  return {
    summary: "You can continue, or let me know if you’d like to stop.",
    inquiry: "",
    suggestion: "",
  };
}

/* ---------- DB ---------- */
async function saveTurn(
  db: any,
  userId: string,
  scenarioId: string,
  userMessage: string,
  aiResponse: AIResponse,
  stage: string,
  scenarioType?: string
) {
  await db.collection("chat_history").insertOne({
    userId,
    scenarioId,
    userMessage,
    aiResponse,
    stage,
    scenarioType,
    timestamp: new Date(),
  });
}
