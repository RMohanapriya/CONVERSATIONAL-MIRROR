import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { 
      message, 
      lifeStage, 
      scenarioId, 
      scenarioContext, 
      isPractice,
      imageBase64 
    } = await req.json();

    // 1. Updated System Instruction (Enforced JSON for Theory of Mind decoding)
    const systemInstruction = `
      ROLE: You are the "Conversational Mirror," a social coach for adults with ASD.
      USER PROFILE: Life Stage is '${lifeStage}'.

      ${isPractice ? 
        `PRACTICE MODE: Scenario "${scenarioId}". Context: ${scenarioContext}` : 
        `GENERAL MODE: Social decoder.`
      }

      STRICT OUTPUT RULE:
      You must return ONLY a valid JSON object.
      Required keys:
      "reflection": Analyze implicit intent and Theory of Mind (perspective taking).
      "reassurance": Validate effort and reduce social anxiety.
      "suggestion": Provide two scripts (A: Direct, B: Nuanced).
    `;

    // 2. Groq Chat Completion (Llama 3.3 70B for high-reasoning tasks)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { 
          role: "user", 
          content: message || "Analyze this situation." 
          // Note: Standard Groq text models do not support base64 images directly. 
          // Use llama-3.2-11b-vision-preview if image analysis is required.
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }, // Strictly enforces valid JSON
      temperature: 0.7,
    });

    const rawContent = chatCompletion.choices[0]?.message?.content;
    if (!rawContent) throw new Error("Empty response from Groq");

    // 3. Explicit Serialization
    const data = JSON.parse(rawContent);

    return NextResponse.json(data);

  } catch (error) {
    console.error("Groq Mirror API Error:", error);
    return NextResponse.json(
      { 
        reflection: "The mirror is momentarily hazy.", 
        reassurance: "Technical static happens, but your effort is valued.", 
        suggestion: "Wait 10 seconds and try again." 
      }, 
      { status: 500 }
    );
  }
}