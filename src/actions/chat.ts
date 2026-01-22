"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import Groq from "groq-sdk";

export async function getAiResponse({
  message,
  lifeStage,
  scenarioId,
  scenarioContext,
  isPractice,
}: {
  message: string;
  lifeStage: string;
  scenarioId?: string;
  scenarioContext?: string;
  isPractice?: boolean;
}) {
  const session = await auth();
  if (!session?.user) throw new Error("User must be authenticated.");

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      reflection: "The mirror is currently disconnected.",
      reassurance: "The Groq API key is missing.",
      suggestion: "Check your .env.local file for GROQ_API_KEY."
    };
  }

  const groq = new Groq({ apiKey });

  try {
    const systemInstruction = `You are the 'Social Mirror' (AI Social Coach). 
  Goal: Decode subtext for ASD Level 1 users. 
  ${isPractice ? `Scenario: ${scenarioId}. Context: ${scenarioContext}.` : ""}
  IMPORTANT: Return ONLY a valid JSON object with keys: "reflection", "reassurance", and "suggestion".`;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: `Life Stage: ${lifeStage}. Input: ${message || "Analyze this situation."}` },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const text = chatCompletion.choices[0]?.message?.content;
    if (!text) throw new Error("EMPTY_RESPONSE");

    const data = JSON.parse(text);

    // --- PERSISTENCE ---
    const client = await clientPromise;
    const db = client.db("mirrorDB"); 
    
    const chatDoc = {
      userId: session.user.id,
      lifeStage,
      userMessage: message,
      aiResponse: data,
      timestamp: new Date(), // This is a Date object (not plain)
    };

    await db.collection("chat_history").insertOne(chatDoc);

    // --- THE FIX: SERIALIZATION ---
    // We use the JSON trick to convert Dates and ObjectIds into plain strings
    // before passing them back to the Client Component.
    return JSON.parse(JSON.stringify(data));

  } catch (error: any) {
    console.error("Mirror Engine Error:", error);
    
    return {
      reflection: "The mirror is momentarily hazy.",
      reassurance: "Technical static happens, but your effort is valued.",
      suggestion: "Wait 10 seconds and try refreshing your reflection."
    };
  }
}