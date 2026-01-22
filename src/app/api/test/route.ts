import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { GoogleGenAI } from "@google/genai";

export async function GET() {
  const diagnostics = {
    database: "Checking",
    ai_engine: "Checking",
    env_vars: "Checking",
  };

  try {
    if (!process.env.MONGODB_URI || !process.env.GEMINI_API_KEY) {
      diagnostics.env_vars = "Missing Keys in .env.local";
      throw new Error("Missing environment variables");
    }
    diagnostics.env_vars = "Valid";

    const dbClient = await clientPromise;
    await dbClient.db("admin").command({ ping: 1 });
    diagnostics.database = "Connected Successfully";

    const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Using the 2.5 stable model
    const result = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: "System check" }] }]
    });

    // FIX: Access .text as a property, not a function
    diagnostics.ai_engine = "Online: " + (result.text || "No text returned");

    return NextResponse.json({ status: "Success", diagnostics });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "Error", 
      message: error.message, 
      diagnostics 
    }, { status: 500 });
  }
}