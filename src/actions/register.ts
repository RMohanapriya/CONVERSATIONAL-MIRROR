"use server";

import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

/**
 * Server Action: Registers a new user for the Conversational Mirror.
 * Syncs with 'mirrorDB' and prepares the user for individualized AI coaching.
 */
export async function registerUser(formData: FormData) {
  // 1. Extract and sanitize input
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const lifeStage = formData.get("lifeStage") as string; // Crucial for Groq Prompting

  // 2. Initial Validation
  if (!name || !email || !password || !lifeStage) {
    return { error: "All fields are required to personalize your experience." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters for security." };
  }

  try {
    const client = await clientPromise;
    const db = client.db("mirrorDB"); // Keeping consistent with chat logic

    // 3. Check for existing user (Email normalization)
    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // 4. Secure Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create User Document
    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      lifeStage, // "school", "college", or "job"
      createdAt: new Date(),
      lastActive: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    // 6. Return success to trigger the redirect to /login
    return { success: true };
  } catch (error) {
    console.error("Registration Database Error:", error);
    return { error: "System error during registration. Please try again." };
  }
}
