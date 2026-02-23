"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import Groq from "groq-sdk";
import { Db, ObjectId } from "mongodb";
import type { AIResponse } from "../../types";
import type { LifeStage } from "../../types";

const MODE_REGEX = /^(past|future)$/i;
const YES_REGEX =
  /^(yes|yeah|yep|sure|ok|okay|yes please|please|yep sure|why not|definitely|of course|sounds good|go ahead|sure thing|absolutely)$/i;
const NO_REGEX =
  /^(no|not now|nothing|skip|nope|no thanks|not really|no idea|i don't know|idk|not sure|maybe not|i'm not sure|don't know|not really sure)$/i;
const STOP_REGEX = /^(stop|exit|done|finish)$/i;
const UNDERSTOOD_REGEX = /^(i understood|got it|i see|thanks|thank you)$/i;

function safeParseAIResponse(content: string | null): AIResponse {
  if (!content) return { summary: "", inquiry: "", suggestion: "" };
  try {
    return JSON.parse(content) as AIResponse;
  } catch {
    return { summary: "", inquiry: "", suggestion: "" };
  }
}

function toObjectId(id: unknown): ObjectId | null {
  try {
    if (!id) return null;
    if (id instanceof ObjectId) return id;
    return new ObjectId(String(id));
  } catch {
    return null;
  }
}

const groqModel = "llama-3.3-70b-versatile";

const MIRROR_CORE = `
You are Mirror — a safe, non-judgmental reflective tool for people with ASD.

MIRROR PRINCIPLES:
- Use plain, warm, concrete language. Short sentences. No jargon.
- Never use clinical ASD language (e.g. "social cues", "turn-taking", "ASD traits").
- Never label the user's behavior as wrong, broken, or a symptom.
- Always ground your response in the EXACT situation the user described.
- Do not generalize. Do not assume. Only work with what the user shared.
`;

async function generateQuestion(
  groq: Groq,
  scenarioType: "PAST" | "FUTURE",
  scenarioContext: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
SCENARIO TYPE: ${scenarioType}
USER'S SITUATION: "${scenarioContext}"

TASK:
Ask ONE short, warm question about this specific situation.
- PAST:   Ask what the user was hoping for OR how they felt in that moment.
- FUTURE: Ask what outcome they most want OR what feels uncertain about it.
- Must reference THIS exact situation — not generic.
- One question only. No lists. No multiple parts.

OUTPUT JSON ONLY:
{ "inquiry": "<your single question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return (
    parsed.inquiry ||
    (scenarioType === "PAST"
      ? "What were you hoping would happen in that moment?"
      : "What outcome matters most to you in this situation?")
  );
}

async function generatePastReflection(
  groq: Groq,
  scenarioContext: string,
  userIntent: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.25,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
WHAT HAPPENED: "${scenarioContext}"
WHAT THE USER WANTED/FELT: "${userIntent}"

TASK:
Write a short, warm reflection that builds genuine metacognitive awareness.
Cover all four of these in order, in plain language:

1. INTERNAL STATE: What the user was thinking or assuming in that moment.
2. TRIGGER: What specifically caused their reaction.
3. OTHER PERSON'S EXPERIENCE: What the other person might have experienced.
4. INTENT vs IMPACT GAP: The difference between what the user meant to do and what actually happened.

CRITICAL RULES:
- NEVER mirror the user's words back verbatim.
- NEVER use vague phrases.
- ALWAYS name the specific situation directly.
- No assumptions beyond what the user shared.
- Do not say what they "should" have done.
- Do not end with advice or a question.
- 4–5 sentences maximum.

OUTPUT JSON ONLY:
{ "summary": "<reflection here>", "inquiry": "", "suggestion": "" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.summary || "";
}

async function generateAskSuggestion(
  groq: Groq,
  scenarioContext: string,
  reflectionText: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
SITUATION: "${scenarioContext}"
REFLECTION JUST GIVEN: "${reflectionText}"

TASK:
Write ONE short, warm yes/no question asking if the user would like
some concrete ideas for handling a similar situation next time.
- Must be answerable with yes or no.
- One sentence only. Warm, not pushy.

OUTPUT JSON ONLY:
{ "inquiry": "<your single yes/no question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Would you like some ideas for next time?";
}

async function generatePastSuggestion(
  groq: Groq,
  scenarioContext: string,
  userIntent: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
WHAT HAPPENED: "${scenarioContext}"
WHAT THE USER WANTED: "${userIntent}"

TASK:
Offer 1–2 concrete possibilities the user could consider next time.
Frame them as options, not instructions.
- 2–4 sentences maximum.

OUTPUT JSON ONLY:
{ "summary": "", "inquiry": "", "suggestion": "<possibilities here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.suggestion || "";
}

async function generatePastFollowUp(
  groq: Groq,
  scenarioContext: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
SITUATION: "${scenarioContext}"

TASK:
Write ONE short, warm yes/no question asking if the user wants to reflect on anything else.

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Is there anything else you'd like to reflect on?";
}

async function generateAskHelpQuestion(
  groq: Groq,
  scenarioContext: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
UPCOMING SITUATION: "${scenarioContext}"

TASK:
Write ONE short, warm yes/no question asking if the user would like help
thinking through how to handle this situation.

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Would you like help thinking through how to handle it?";
}

async function generateFutureScenariosAndPrep(
  groq: Groq,
  scenarioContext: string,
  userGoal: string,
  lifeStage: LifeStage,
): Promise<AIResponse> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
UPCOMING SITUATION: "${scenarioContext}"
WHAT THE USER HOPES TO GET FROM IT: "${userGoal}"

TASK:
Produce a warm, grounded response in two parts.

PART 1 — summary:
Reflect the SITUATION back clearly. Acknowledge the user's goal (what they hope to get).
Name what might feel uncertain — not as a flaw, just as something real.
2–3 sentences. No advice yet.
- Do NOT validate emotions with phrases like "it's okay to feel that way", "that's understandable", or "it's normal to feel...".
- Just name the situation and the uncertainty plainly.

PART 2 — suggestion (THREE separate fields):

"scenarios": 2–3 short sentences. What could realistically happen in THIS situation.
- Base on the situation, not the goal. Each sentence = one scenario.
- Max 3 sentences.

"actions": 2–3 short sentences. One concrete option per scenario from above.
- Use "you could", "one option is", "it may help to".
- NEVER use "you should", "you must", "you need to", "you have to".
- Max 3 sentences.

"hidden_rules": 2–3 short sentences. Unwritten expectations in this type of situation.
- Be direct. Spell it out. No hinting.
- Use "most people...", "a common expectation is...", "people in this situation usually...".
- NEVER use "you should", "you must".
- End on the last rule — no motivational closing sentence.
- Max 3 sentences.

GLOBAL RULES:
- Each sentence must add new information. No repetition.
- Never confuse the situation with the goal.

OUTPUT JSON ONLY:
{ "summary": "<part 1>", "inquiry": "", "suggestion": "", "scenarios": "<scenarios>", "actions": "<actions>", "hidden_rules": "<hidden_rules>" }
`,
      },
    ],
  });

  return safeParseAIResponse(completion.choices[0].message.content);
}

async function generateFutureMotivation(
  groq: Groq,
  scenarioContext: string,
  userGoal: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.35,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
UPCOMING SITUATION: "${scenarioContext}"
WHAT THE USER WANTS: "${userGoal}"

TASK:
Write a short, warm, encouraging message. No advice. 2–3 sentences maximum.

OUTPUT JSON ONLY:
{ "summary": "<motivation here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.summary || "You've already thought this through, and that matters.";
}

async function generateFutureFollowUp(
  groq: Groq,
  scenarioContext: string,
  lifeStage: LifeStage,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: groqModel,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
${MIRROR_CORE}

LIFE STAGE: ${lifeStage}
SITUATION: "${scenarioContext}"

TASK:
Write ONE short, warm yes/no question asking if there is anything else
the user wants to think through.

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Is there anything else you'd like to think through?";
}

async function resolveScenarioTurn(
  db: Db,
  userId: string,
  scenarioId: string,
  parentTurnId: unknown,
) {
  const parentId = toObjectId(parentTurnId);
  if (parentId) {
    const turn = await db.collection("chat_history").findOne({ _id: parentId });
    if (turn) return turn;
  }
  return db.collection("chat_history").findOne(
    { userId, scenarioId, stage: "AWAIT_SCENARIO" },
    { sort: { timestamp: -1 } },
  );
}

/* ==========================================================================
   RESET ACTION — clears DB state so next session starts fresh
   ========================================================================== */
export async function resetChatSession({
  scenarioId,
}: {
  scenarioId?: string;
}): Promise<void> {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const client = await clientPromise;
  const db: Db = client.db("mirrorDB");
  const userId = session.user.id ?? session.user.email ?? "unknown";
  const resolvedScenarioId = scenarioId ?? "general";

  // Mark all existing turns for this user+scenario as CLOSED
  await db.collection("chat_history").updateMany(
    { userId, scenarioId: resolvedScenarioId },
    { $set: { stage: "CLOSED" } },
  );
}

/* ==========================================================================
   MODE SELECTION ACTION — saves past/future choice to DB
   (called by frontend when user taps Past or Future button)
   ========================================================================== */
export async function saveModeSelection({
  mode,
  scenarioId,
}: {
  mode: "past" | "future";
  scenarioId?: string;
}): Promise<void> {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const client = await clientPromise;
  const db: Db = client.db("mirrorDB");
  const userId = session.user.id ?? session.user.email ?? "unknown";
  const resolvedScenarioId = scenarioId ?? "general";
  const scenarioType = mode.toUpperCase() as "PAST" | "FUTURE";

  const modeLabels: Record<string, string> = {
    PAST: "Okay. Describe the situation you'd like to reflect on.",
    FUTURE: "Okay. Describe the situation you're thinking about.",
  };

  // Check the latest turn — if it's already AWAIT_SCENARIO just update it
  // (happens when FOLLOW_UP→YES already created an AWAIT_SCENARIO turn)
  const lastTurn = await db
    .collection("chat_history")
    .findOne(
      { userId, scenarioId: resolvedScenarioId },
      { sort: { timestamp: -1 } },
    );

  if (lastTurn?.stage === "AWAIT_SCENARIO") {
    // Just update the scenarioType in case mode changed
    await db.collection("chat_history").updateOne(
      { _id: lastTurn._id },
      { $set: { scenarioType, userMessage: mode, timestamp: new Date() } },
    );
  } else {
    // Fresh insert
    await db.collection("chat_history").insertOne({
      userId,
      scenarioId: resolvedScenarioId,
      userMessage: mode,
      aiResponse: { summary: modeLabels[scenarioType], inquiry: "", suggestion: "" },
      stage: "AWAIT_SCENARIO",
      scenarioType,
      parentTurnId: null,
      timestamp: new Date(),
    });
  }
}

/* ==========================================================================
   MAIN ACTION
   ========================================================================== */
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

  const userId = session.user.id ?? session.user.email ?? "unknown";

  const trimmed = message.trim().toLowerCase();
  const original = message.trim();

  const lastTurn = await db
    .collection("chat_history")
    .findOne(
      { userId, scenarioId: resolvedScenarioId },
      { sort: { timestamp: -1 } },
    );

  const currentStage = lastTurn?.stage ?? null;

  /* ---------- CLOSURE ---------- */
  if (
    STOP_REGEX.test(trimmed) ||
    UNDERSTOOD_REGEX.test(trimmed) ||
    (NO_REGEX.test(trimmed) && currentStage === "FOLLOW_UP")
  ) {
    const closure: AIResponse = {
      summary:
        "Thank you for sharing that. Taking time to look inward like this takes courage. Come back whenever you're ready.",
      inquiry: "",
      suggestion: "",
    };
    await saveTurn(db, userId, resolvedScenarioId, original, closure, "CLOSED");
    return closure;
  }

  /* ---------- MODE SELECTION — still supported if typed directly ---------- */
  const isIdle =
    !currentStage ||
    currentStage === "CLOSED" ||
    currentStage === "FOLLOW_UP";

  if (isIdle && MODE_REGEX.test(trimmed)) {
    const mode = trimmed.toUpperCase() as "PAST" | "FUTURE";
    const modeLabels: Record<string, string> = {
      PAST: "Okay. Describe the situation you'd like to reflect on.",
      FUTURE: "Okay. Describe the situation you're thinking about.",
    };

    const response: AIResponse = {
      summary: modeLabels[mode],
      inquiry: "",
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      response,
      "AWAIT_SCENARIO",
      mode,
    );
    return response;
  }

  /* ---------- AWAIT_SCENARIO → ONE CLARIFYING QUESTION ---------- */
  if (currentStage === "AWAIT_SCENARIO") {
    const scenarioType = lastTurn!.scenarioType as "PAST" | "FUTURE";
    const inquiry = await generateQuestion(groq, scenarioType, original, lifeStage);
    const question: AIResponse = { summary: "", inquiry, suggestion: "" };

    await saveTurn(
      db, userId, resolvedScenarioId, original, question,
      "QUESTION", scenarioType, lastTurn!._id,
    );
    return question;
  }

  /* ---------- QUESTION → REFLECTION (PAST) or ASK_HELP (FUTURE) ---------- */
  if (currentStage === "QUESTION") {
    const scenarioType = (lastTurn!.scenarioType ?? "PAST") as "PAST" | "FUTURE";
    if (!lastTurn!.scenarioType) {
      // Corrupted turn — reset and bail
      await db.collection("chat_history").updateMany(
        { userId, scenarioId: resolvedScenarioId },
        { $set: { stage: "CLOSED" } },
      );
      return { summary: "Let's start fresh. Choose Past or Future to begin.", inquiry: "", suggestion: "" };
    }
    const awaitScenarioTurn = await resolveScenarioTurn(
      db, userId, resolvedScenarioId, lastTurn!.parentTurnId,
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";

    if (scenarioType === "PAST") {
      const reflectionText = await generatePastReflection(groq, scenarioContext, original, lifeStage);
      const askInquiry = await generateAskSuggestion(groq, scenarioContext, reflectionText, lifeStage);
      const reflection: AIResponse = { summary: reflectionText, inquiry: askInquiry, suggestion: "" };

      await saveTurn(
        db, userId, resolvedScenarioId, original, reflection,
        "ASK_SUGGESTION", "PAST", awaitScenarioTurn?._id,
      );
      return reflection;
    }

    if (scenarioType === "FUTURE") {
      const askHelpInquiry = await generateAskHelpQuestion(groq, scenarioContext, lifeStage);
      const askHelp: AIResponse = { summary: "", inquiry: askHelpInquiry, suggestion: "" };

      await saveTurn(
        db, userId, resolvedScenarioId, original, askHelp,
        "ASK_HELP", "FUTURE", awaitScenarioTurn?._id,
      );
      return askHelp;
    }
  }

  /* ---------- PAST: ASK_SUGGESTION → YES ---------- */
  if (currentStage === "ASK_SUGGESTION" && YES_REGEX.test(trimmed)) {
    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );
    const awaitScenarioTurn = await resolveScenarioTurn(
      db, userId, resolvedScenarioId, questionTurn?.parentTurnId,
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userIntent = questionTurn?.userMessage ?? "";

    const suggestionText = await generatePastSuggestion(groq, scenarioContext, userIntent, lifeStage);
    const followUpInquiry = await generatePastFollowUp(groq, scenarioContext, lifeStage);
    const suggestion: AIResponse = { summary: "", inquiry: followUpInquiry, suggestion: suggestionText };

    await saveTurn(db, userId, resolvedScenarioId, original, suggestion, "FOLLOW_UP", "PAST");
    return suggestion;
  }

  /* ---------- PAST: ASK_SUGGESTION → NO or UNRECOGNIZED ---------- */
  if (currentStage === "ASK_SUGGESTION") {
    const awaitScenarioTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
      { sort: { timestamp: -1 } },
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const followUpInquiry = await generatePastFollowUp(groq, scenarioContext, lifeStage);
    const response: AIResponse = { summary: "", inquiry: followUpInquiry, suggestion: "" };

    await saveTurn(db, userId, resolvedScenarioId, original, response, "FOLLOW_UP", "PAST");
    return response;
  }

  /* ---------- FUTURE: ASK_HELP → YES ---------- */
  if (currentStage === "ASK_HELP" && YES_REGEX.test(trimmed)) {
    const awaitScenarioTurn = await resolveScenarioTurn(
      db, userId, resolvedScenarioId, lastTurn!.parentTurnId,
    );
    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userGoal = questionTurn?.userMessage ?? "";

    const futureResponse = await generateFutureScenariosAndPrep(groq, scenarioContext, userGoal, lifeStage);
    futureResponse.inquiry = await generateFutureFollowUp(groq, scenarioContext, lifeStage);

    await saveTurn(
      db, userId, resolvedScenarioId, original, futureResponse,
      "FOLLOW_UP", "FUTURE", awaitScenarioTurn?._id,
    );
    return futureResponse;
  }

  /* ---------- FUTURE: ASK_HELP → NO or UNRECOGNIZED ---------- */
  if (currentStage === "ASK_HELP") {
    const awaitScenarioTurn = await resolveScenarioTurn(
      db, userId, resolvedScenarioId, lastTurn!.parentTurnId,
    );
    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userGoal = questionTurn?.userMessage ?? "";

    const motivationText = await generateFutureMotivation(groq, scenarioContext, userGoal, lifeStage);
    const followUpInquiry = await generateFutureFollowUp(groq, scenarioContext, lifeStage);
    const motivation: AIResponse = { summary: motivationText, inquiry: followUpInquiry, suggestion: "" };

    await saveTurn(
      db, userId, resolvedScenarioId, original, motivation,
      "FOLLOW_UP", "FUTURE", awaitScenarioTurn?._id,
    );
    return motivation;
  }

  /* ---------- FOLLOW_UP → YES → prompt mode selection (don't lock mode) ---------- */
  if (currentStage === "FOLLOW_UP" && YES_REGEX.test(trimmed)) {
    // Return a prompt but do NOT save AWAIT_SCENARIO here.
    // saveModeSelection() will save it after the user taps Past or Future.
    const response: AIResponse = {
      summary: "CHOOSE_MODE",
      inquiry: "",
      suggestion: "",
    };
    // Just close the current flow so saveModeSelection can insert fresh
    await saveTurn(db, userId, resolvedScenarioId, original, response, "CLOSED");
    return response;
  }

  /* ---------- FALLBACK — should rarely trigger now ---------- */
  // If we reach here the DB state is stale/unrecognized. Reset and prompt mode selection.
  await db.collection("chat_history").updateMany(
    { userId, scenarioId: resolvedScenarioId },
    { $set: { stage: "CLOSED" } },
  );

  return {
    summary: "Let's start fresh. Choose Past or Future to begin.",
    inquiry: "",
    suggestion: "",
  };
}

/* ==========================================================================
   DB HELPER
   ========================================================================== */
async function saveTurn(
  db: Db,
  userId: string,
  scenarioId: string,
  userMessage: string,
  aiResponse: AIResponse,
  stage: string,
  scenarioType?: string,
  parentTurnId?: ObjectId,
) {
  await db.collection("chat_history").insertOne({
    userId,
    scenarioId,
    userMessage,
    aiResponse,
    stage,
    scenarioType,
    parentTurnId: parentTurnId ?? null,
    timestamp: new Date(),
  });
}