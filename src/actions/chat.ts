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

/* ==========================================================================
   AI HELPERS
   ========================================================================== */

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
   What belief or feeling was already active before they responded?
   Use their exact situation — never vague phrases.
   Example: "When your supervisor pointed out the error, your first instinct was to protect your position."

2. TRIGGER: What specifically caused their reaction.
   What was the moment that set things in motion?
   Example: "As soon as he named the error, you were already forming a response."

3. OTHER PERSON'S EXPERIENCE: What the other person might have experienced — briefly, without assuming too much.
   Example: "He may have experienced your response as pushback rather than explanation."

4. INTENT vs IMPACT GAP: The difference between what the user meant to do and what actually happened.
   Name it gently — not as a flaw, just as something real.
   Example: "You wanted to be heard, but the conversation became tense instead."

CRITICAL RULES:
- NEVER mirror the user's words back verbatim. Always reframe in clearer terms.
- NEVER use vague phrases like "you were trying to do something" or "something happened".
- ALWAYS name the specific situation directly using the user's own details.
- No assumptions beyond what the user shared.
- Do not say what they "should" have done.
- Avoid: "wrong", "mistake", "error", "problem", "difficulty", "struggle".
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
- Do not ask multiple things.
- Example: "Would you like some ideas for next time?"

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

Rules:
- Use phrasing like "Some people find it helps to...", "One thing worth considering is...", "You might try..."
- Each possibility must relate directly to THIS specific situation.
- Focus on observable, concrete actions (pausing, waiting, signaling, asking).
- Never say "you should", "you must", "you need to".
- No general life advice. No labels.
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
- Low pressure. Open. One sentence only.
- Must be answerable with yes or no.

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Is there anything else you'd like to reflect on?";
}

// ── FUTURE: ask if the user wants preparation help ──────────────────────────
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
- One sentence only. Low pressure. Inviting, not pushy.
- Must be answerable with yes or no.
- Example: "Would you like help thinking through how to handle it?"

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return (
    parsed.inquiry || "Would you like help thinking through how to handle it?"
  );
}

// ── FUTURE: full preparation with scenarios + hidden rules ───────────────────
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
WHAT THE USER WANTS: "${userGoal}"

TASK:
Produce a warm, grounded response in two parts:

PART 1 — summary:
Reflect the situation back clearly and acknowledge what the user wants.
- Name the situation in their own terms.
- Acknowledge their goal without judgment.
- Briefly name what might feel uncertain or challenging — not as a flaw, just as something real.
- 2–3 sentences. No advice in this part.

PART 2 — suggestion:
Help the user face this situation with confidence. Cover all three areas:

1. POSSIBLE SCENARIOS: What could realistically happen. Name 2–3 specific possibilities.
2. CONCRETE ACTIONS: What the user can do for each scenario.
   - Use "You could...", "It may help to...", "If X happens, you might..."
   - Focus on observable actions: what to say, when to pause, how to signal, what to watch for.
3. HIDDEN RULES: The unwritten expectations most people follow in this type of situation
   that are rarely explained out loud.
   - Name them plainly: "In situations like this, people usually expect...",
     "It's common for others to assume...", "One thing that often goes unspoken is..."
   - Be direct and specific — do not hint. Spell it out.

Rules for PART 2:
- Plain, direct language. No jargon. No clinical terms.
- Never say "you should", "you must", "you need to".
- 5–8 sentences maximum.

OUTPUT JSON ONLY:
{ "summary": "<part 1 here>", "inquiry": "", "suggestion": "<part 2 here>" }
`,
      },
    ],
  });

  return safeParseAIResponse(completion.choices[0].message.content);
}

// ── FUTURE: simple warm motivation when user declines help ───────────────────
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
Write a short, warm, encouraging message for someone who already feels
ready to face this situation on their own.
- Acknowledge what they want from the situation.
- Affirm that they've already taken a good step by thinking it through.
- No advice. No scenarios. No suggestions. Just genuine warmth.
- 2–3 sentences maximum.

OUTPUT JSON ONLY:
{ "summary": "<motivation here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return (
    parsed.summary ||
    "You've already thought this through, and that matters. Trust what you know about what you want from this."
  );
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
the user wants to think through about this situation.
- Low pressure. Open. One sentence only.
- Must be answerable with yes or no.

OUTPUT JSON ONLY:
{ "inquiry": "<your question here>" }
`,
      },
    ],
  });

  const parsed = safeParseAIResponse(completion.choices[0].message.content);
  return parsed.inquiry || "Is there anything else you'd like to think through?";
}

/* ==========================================================================
   HELPER — resolve AWAIT_SCENARIO turn from any child turn
   ========================================================================== */
async function resolveScenarioTurn(
  db: Db,
  userId: string,
  scenarioId: string,
  parentTurnId: unknown,
) {
  const parentId = toObjectId(parentTurnId);
  if (parentId) {
    const turn = await db
      .collection("chat_history")
      .findOne({ _id: parentId });
    if (turn) return turn;
  }
  return db.collection("chat_history").findOne(
    { userId, scenarioId, stage: "AWAIT_SCENARIO" },
    { sort: { timestamp: -1 } },
  );
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

  /* ---------- MODE SELECTION (only when idle) ---------- */
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
    const inquiry = await generateQuestion(
      groq,
      scenarioType,
      original,
      lifeStage,
    );

    const question: AIResponse = { summary: "", inquiry, suggestion: "" };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      question,
      "QUESTION",
      scenarioType,
      lastTurn!._id,
    );
    return question;
  }

  /* ---------- QUESTION → REFLECTION (PAST) or ASK_HELP (FUTURE) ---------- */
  if (currentStage === "QUESTION") {
    const scenarioType = lastTurn!.scenarioType as "PAST" | "FUTURE";
    const awaitScenarioTurn = await resolveScenarioTurn(
      db,
      userId,
      resolvedScenarioId,
      lastTurn!.parentTurnId,
    );
    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";

    /* ── PAST: generate metacognitive reflection ── */
    if (scenarioType === "PAST") {
      const reflectionText = await generatePastReflection(
        groq,
        scenarioContext,
        original,
        lifeStage,
      );

      const askInquiry = await generateAskSuggestion(
        groq,
        scenarioContext,
        reflectionText,
        lifeStage,
      );

      const reflection: AIResponse = {
        summary: reflectionText,
        inquiry: askInquiry,
        suggestion: "",
      };

      await saveTurn(
        db,
        userId,
        resolvedScenarioId,
        original,
        reflection,
        "ASK_SUGGESTION",
        "PAST",
        awaitScenarioTurn?._id,
      );
      return reflection;
    }

    /* ── FUTURE: ask if user wants help (YES/NO branch) ── */
    if (scenarioType === "FUTURE") {
      const askHelpInquiry = await generateAskHelpQuestion(
        groq,
        scenarioContext,
        lifeStage,
      );

      const askHelp: AIResponse = {
        summary: "",
        inquiry: askHelpInquiry,
        suggestion: "",
      };

      await saveTurn(
        db,
        userId,
        resolvedScenarioId,
        original,
        askHelp,
        "ASK_HELP",
        "FUTURE",
        awaitScenarioTurn?._id,
      );
      return askHelp;
    }
  }

  /* ---------- PAST: ASK_SUGGESTION → YES → give suggestion ---------- */
  if (currentStage === "ASK_SUGGESTION" && YES_REGEX.test(trimmed)) {
    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );

    const awaitScenarioTurn = await resolveScenarioTurn(
      db,
      userId,
      resolvedScenarioId,
      questionTurn?.parentTurnId,
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userIntent = questionTurn?.userMessage ?? "";

    const suggestionText = await generatePastSuggestion(
      groq,
      scenarioContext,
      userIntent,
      lifeStage,
    );

    const followUpInquiry = await generatePastFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    const suggestion: AIResponse = {
      summary: "",
      inquiry: followUpInquiry,
      suggestion: suggestionText,
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      suggestion,
      "FOLLOW_UP",
      "PAST",
    );
    return suggestion;
  }

  /* ---------- PAST: ASK_SUGGESTION → NO → skip to follow-up ---------- */
  if (currentStage === "ASK_SUGGESTION" && NO_REGEX.test(trimmed)) {
    const awaitScenarioTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
      { sort: { timestamp: -1 } },
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const followUpInquiry = await generatePastFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    const response: AIResponse = {
      summary: "",
      inquiry: followUpInquiry,
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      response,
      "FOLLOW_UP",
      "PAST",
    );
    return response;
  }

  /* ---------- PAST: ASK_SUGGESTION → UNRECOGNIZED → treat as NO ---------- */
  if (currentStage === "ASK_SUGGESTION") {
    const awaitScenarioTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "AWAIT_SCENARIO" },
      { sort: { timestamp: -1 } },
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const followUpInquiry = await generatePastFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    const response: AIResponse = {
      summary: "",
      inquiry: followUpInquiry,
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      response,
      "FOLLOW_UP",
      "PAST",
    );
    return response;
  }

  /* ---------- FUTURE: ASK_HELP → YES → full prep + hidden rules ---------- */
  if (currentStage === "ASK_HELP" && YES_REGEX.test(trimmed)) {
    const awaitScenarioTurn = await resolveScenarioTurn(
      db,
      userId,
      resolvedScenarioId,
      lastTurn!.parentTurnId,
    );

    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userGoal = questionTurn?.userMessage ?? "";

    const futureResponse = await generateFutureScenariosAndPrep(
      groq,
      scenarioContext,
      userGoal,
      lifeStage,
    );

    futureResponse.inquiry = await generateFutureFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      futureResponse,
      "FOLLOW_UP",
      "FUTURE",
      awaitScenarioTurn?._id,
    );
    return futureResponse;
  }

  /* ---------- FUTURE: ASK_HELP → NO → simple motivation + follow-up ---------- */
  if (currentStage === "ASK_HELP" && NO_REGEX.test(trimmed)) {
    const awaitScenarioTurn = await resolveScenarioTurn(
      db,
      userId,
      resolvedScenarioId,
      lastTurn!.parentTurnId,
    );

    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userGoal = questionTurn?.userMessage ?? "";

    const motivationText = await generateFutureMotivation(
      groq,
      scenarioContext,
      userGoal,
      lifeStage,
    );

    const followUpInquiry = await generateFutureFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    const motivation: AIResponse = {
      summary: motivationText,
      inquiry: followUpInquiry,
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      motivation,
      "FOLLOW_UP",
      "FUTURE",
      awaitScenarioTurn?._id,
    );
    return motivation;
  }

  /* ---------- FUTURE: ASK_HELP → UNRECOGNIZED → treat as NO ---------- */
  if (currentStage === "ASK_HELP") {
    const awaitScenarioTurn = await resolveScenarioTurn(
      db,
      userId,
      resolvedScenarioId,
      lastTurn!.parentTurnId,
    );

    const questionTurn = await db.collection("chat_history").findOne(
      { userId, scenarioId: resolvedScenarioId, stage: "QUESTION" },
      { sort: { timestamp: -1 } },
    );

    const scenarioContext = awaitScenarioTurn?.userMessage ?? "";
    const userGoal = questionTurn?.userMessage ?? "";

    const motivationText = await generateFutureMotivation(
      groq,
      scenarioContext,
      userGoal,
      lifeStage,
    );

    const followUpInquiry = await generateFutureFollowUp(
      groq,
      scenarioContext,
      lifeStage,
    );

    const motivation: AIResponse = {
      summary: motivationText,
      inquiry: followUpInquiry,
      suggestion: "",
    };

    await saveTurn(
      db,
      userId,
      resolvedScenarioId,
      original,
      motivation,
      "FOLLOW_UP",
      "FUTURE",
      awaitScenarioTurn?._id,
    );
    return motivation;
  }

  /* ---------- FOLLOW_UP → YES → new scenario (same mode) ---------- */
  if (currentStage === "FOLLOW_UP" && YES_REGEX.test(trimmed)) {
    const scenarioType = (lastTurn!.scenarioType ?? "PAST") as "PAST" | "FUTURE";
    const promptLabels: Record<string, string> = {
      PAST: "Okay. Describe the next situation you'd like to reflect on.",
      FUTURE: "Okay. Describe the next situation you're thinking about.",
    };

    const response: AIResponse = {
      summary: promptLabels[scenarioType],
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
      scenarioType,
    );
    return response;
  }

  /* ---------- FALLBACK ---------- */
  return {
    summary:
      'Type "past" to reflect on something that happened, or "future" to prepare for something coming up.',
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