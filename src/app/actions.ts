"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth"; // Your NextAuth configuration
import { MirrorResponseSchema, getSystemInstruction } from "@/ai/flows/structured-response";

/**
 * getAiResponse
 * The "Brain" of the Conversational Mirror.
 * - Authenticates the user session.
 * - Calls Gemini 2.0 Flash for social reasoning.
 * - Persists the conversation and AI feedback to MongoDB.
 */
export async function getAiResponse(
  userInput: string, 
  scenarioContext: string, 
  lifeStage: string = "general"
) {
  try {
    // 1. SECURITY: Get the authenticated user session
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Authentication required." };
    }

    // 2. AI GENERATION: Using Gemini 2.0 Flash (The "3rd Generation" speed architecture)
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001"), 
      schema: MirrorResponseSchema,
      system: getSystemInstruction(lifeStage),
      prompt: `
        [SCENARIO]: ${scenarioContext}
        [USER MESSAGE]: "${userInput}"
        
        Analyze the social nuances and provide the structured Mirror analysis.
      `,
    });

    // 3. DATABASE PERSISTENCE: Save to MongoDB 'history' collection
    try {
      const dbClient = await clientPromise;
      const db = dbClient.db("conversational_mirror");
      
      await db.collection("history").insertOne({
        userId: session.user.id || session.user.email, // Link to the user
        userName: session.user.name,
        userInput,
        feedback: object, // Stores { aiResponse, reflection, suggestion, theoryOfMind }
        lifeStage,
        scenarioContext,
        createdAt: new Date(),
      });
    } catch (dbError) {
      // Log DB errors but don't stop the AI response from returning to the user
      console.error("MongoDB Save Error:", dbError);
    }

    // 4. RETURN DATA TO UI
    return { success: true, data: object };

  } catch (error) {
    console.error("Metacognitive Core Error:", error);
    return { 
      success: false, 
      error: "The Mirror is currently recalibrating. Please try again." 
    };
  }
}