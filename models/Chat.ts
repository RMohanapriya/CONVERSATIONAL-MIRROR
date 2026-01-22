import mongoose, { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  userId: { type: String, required: true, index: true }, // Essential for fetching history
  lifeStage: { type: String, required: true }, // "College", "School", or "Job"
  userMessage: { type: String, required: true },
  hasImage: { type: Boolean, default: false }, // For tracking multimodal usage
  
  // The structured AI response
  aiResponse: {
    reflection: { type: String, required: true },
    reassurance: { type: String, required: true },
    suggestion: { type: String, required: true }
  },
  
  // Metadata for analytics
  scenarioId: { type: String, default: "General Chat" },
  isPractice: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

// The 'models.Chat || model' pattern is vital for Next.js Hot Reloading
export default models.Chat || model("Chat", ChatSchema);