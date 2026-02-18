"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import Groq from "groq-sdk";
import { Db } from "mongodb";
import type { AIResponse } from "../../types";
import type { LifeStage } from "../../types";

const MODE_REGEX = /^(past|future|present|now)$/i;
const YES_REGEX = /^(yes|yeah|yep|sure)$/i;
const NO_REGEX = /^(no|not now|nothing|skip)$/i;
const STOP_REGEX = /^(stop|exit)$/i;
const UNDERSTOOD_REGEX = /^(ok|okay|i understood|got it)$/i;

function safeParseAIResponse(content: string | null): AIResponse {
  if (!content) return { summary: "", inquiry: "", suggestion: "" };
  try {
    return JSON.parse(content) as AIResponse;
  } catch {
    return { summary: "", inquiry: "", suggestion: "" };
  }
}

export async function getAiResponse({
  message,
  scenarioId,
  lifeStage,
}: {
  message: string;
  scenarioId?: string;
  lifeStage: LifeStage;
}): Promise<AIResponse> {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
  const resolvedScenarioId = scenarioId ?? "general";
  const client = await clientPromise;
  const db: Db = client.db("mirrorDB");
  const userId = session.user.id;

  const lastTurns = await db
    .collection("chat_history")
    .find({ userId, scenarioId: resolvedScenarioId })
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
    await saveTurn(db, userId, resolvedScenarioId, message, closure, "CLOSED");
    return closure;
  }

  /* ---------- MODE SELECTION ---------- */
  if (MODE_REGEX.test(message.trim())) {
    const mode = message.trim().toUpperCase();
    const modeLabels: Record<string, string> = {
      PAST: "Okay. Please describe the past situation you want to talk about.",
      FUTURE:
        "Okay. Please describe the upcoming situation you want to prepare for.",
      PRESENT: "Okay. Please describe what is happening right now.",
      NOW: "Okay. Please describe what is happening right now.",
    };

    const response: AIResponse = {
      summary: modeLabels[mode] ?? "Please describe your situation.",
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      response,
      "AWAIT_SCENARIO",
      mode,
    );
    return response;
  }

  /* ---------- PAST: QUESTION ---------- */
  if (
    lastTurn?.stage === "AWAIT_SCENARIO" &&
    lastTurn.scenarioType === "PAST"
  ) {
    const question: AIResponse = {
      summary: "",
      inquiry:
        lifeStage === "college"
          ? "What were you hoping would happen when you spoke?"
          : "What were you trying to do when you spoke?",
      suggestion: "",
    };
    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      question,
      "QUESTION",
      "PAST",
    );
    return question;
  }

  /* ---------- FUTURE/NOW: QUESTION ---------- */
  if (
    lastTurn?.stage === "AWAIT_SCENARIO" &&
    (lastTurn.scenarioType === "FUTURE" ||
      lastTurn.scenarioType === "PRESENT" ||
      lastTurn.scenarioType === "NOW")
  ) {
    const question: AIResponse = {
      summary: "",
      inquiry:
        lifeStage === "college"
          ? "What outcome are you hoping for in this situation?"
          : "What do you want to happen in this situation?",
      suggestion: "",
    };
    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      question,
      "QUESTION",
      lastTurn.scenarioType,
    );
    return question;
  }

  /* ---------- PAST: REFLECTION ---------- */
  if (lastTurn?.stage === "QUESTION" && lastTurn.scenarioType === "PAST") {
    // Retrieve the original scenario for context
    const originalScenarioTurn = await db
      .collection("chat_history")
      .findOne(
        { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
        { sort: { timestamp: -1 } },
      );

    const scenarioContext = originalScenarioTurn?.userMessage ?? "";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
ROLE: ASD-safe reflection assistant.

ORIGINAL SITUATION: "${scenarioContext}"
USER'S INTENT: "${message}"

TASK:
- Validate the user's intent
- Clearly state WHAT the user did that caused difficulty
- Explain WHY it didn't work
- Explain the hidden social rule (turn-taking / timing)
- DO NOT give advice
- DO NOT ask questions
- Keep it factual and supportive

OUTPUT JSON ONLY:
{ "summary": "", "inquiry": "", "suggestion": "" }

Populate ONLY summary.
`,
        },
        { role: "user", content: message },
      ],
    });

    const reflection = safeParseAIResponse(
      completion.choices[0].message.content,
    );
    reflection.summary += "\n\nWould you like a suggestion?";

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      reflection,
      "ASK_SUGGESTION",
      "PAST",
    );
    return reflection;
  }

  /* ---------- FUTURE/NOW: PREPARATION ---------- */
  if (
    lastTurn?.stage === "QUESTION" &&
    (lastTurn.scenarioType === "FUTURE" ||
      lastTurn.scenarioType === "PRESENT" ||
      lastTurn.scenarioType === "NOW")
  ) {
    const originalScenarioTurn = await db
      .collection("chat_history")
      .findOne(
        { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
        { sort: { timestamp: -1 } },
      );

    const scenarioContext = originalScenarioTurn?.userMessage ?? "";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
ROLE: ASD-safe social preparation assistant.

UPCOMING SITUATION: "${scenarioContext}"
USER'S GOAL: "${message}"

TASK:
- Acknowledge the situation clearly
- Identify the key social challenge the user might face
- Give 1-2 concrete preparation strategies
- Focus on observable actions and timing
- DO NOT use vague emotional language
- DO NOT ask further questions

OUTPUT JSON ONLY:
{ "summary": "", "inquiry": "", "suggestion": "" }

Populate summary with acknowledgment and suggestion with strategies.
`,
        },
        { role: "user", content: message },
      ],
    });

    const preparation = safeParseAIResponse(
      completion.choices[0].message.content,
    );
    preparation.summary += "\n\nIs there anything else you'd like to discuss?";

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      preparation,
      "FOLLOW_UP",
      lastTurn.scenarioType,
    );
    return preparation;
  }

  /* ---------- PAST: SUGGESTION ---------- */
  if (lastTurn?.stage === "ASK_SUGGESTION" && YES_REGEX.test(message.trim())) {
    const originalScenarioTurn = await db
      .collection("chat_history")
      .findOne(
        { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
        { sort: { timestamp: -1 } },
      );

    const scenarioContext = originalScenarioTurn?.userMessage ?? "";

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `
ROLE: ASD-safe coaching assistant.

ORIGINAL SITUATION: "${scenarioContext}"
USER'S INTENT: "${message}"

TASK:
- Give 1-2 specific actions the user could do NEXT TIME
- Suggestions must replace the past mistake
- Focus on timing, signaling, or waiting strategies
- No general advice
- No questions

OUTPUT JSON ONLY:
{ "summary": "", "inquiry": "", "suggestion": "" }

Populate ONLY suggestion.
`,
        },
        { role: "user", content: message },
      ],
    });

    const suggestion = safeParseAIResponse(
      completion.choices[0].message.content,
    );
    suggestion.suggestion +=
      "\n\nIs there anything else you'd like to discuss?";

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      suggestion,
      "FOLLOW_UP",
      "PAST",
    );
    return suggestion;
  }

  /* ---------- LOOP (YES to continue) ---------- */
  if (lastTurn?.stage === "FOLLOW_UP" && YES_REGEX.test(message.trim())) {
    const scenarioType = lastTurn.scenarioType ?? "PAST";
    const promptLabels: Record<string, string> = {
      PAST: "Okay. Please describe the next past situation you'd like to talk about.",
      FUTURE:
        "Okay. Please describe the next upcoming situation you'd like to prepare for.",
      PRESENT: "Okay. Please describe the current situation.",
      NOW: "Okay. Please describe the current situation.",
    };

    const response: AIResponse = {
      summary: promptLabels[scenarioType] ?? "Please describe your situation.",
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      response,
      "AWAIT_SCENARIO",
      scenarioType,
    );
    return response;
  }

  /* ---------- SKIP SUGGESTION (NO) ---------- */
  if (lastTurn?.stage === "ASK_SUGGESTION" && NO_REGEX.test(message.trim())) {
    const response: AIResponse = {
      summary: "No problem. Is there anything else you'd like to reflect on?",
      inquiry: "",
      suggestion: "",
    };
    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      message,
      response,
      "FOLLOW_UP",
      lastTurn.scenarioType,
    );
    return response;
  }

  /* ---------- FALLBACK ---------- */
  return {
    summary:
      'To get started, type "past", "future", or "now" to choose a reflection mode.',
    inquiry: "",
    suggestion: "",
  };
}

/* ---------- DB HELPER ---------- */
async function saveTurn(
  db: Db,
  userId: string,
  scenarioId: string,
  userMessage: string,
  aiResponse: AIResponse,
  stage: string,
  scenarioType?: string,
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
