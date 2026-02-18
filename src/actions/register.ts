"use server";

import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { Db } from "mongodb";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const lifeStage = formData.get("lifeStage") as string;

  if (!name || !email || !password || !lifeStage) {
    return { error: "All fields are required to personalize your experience." };
  }

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters for security.",
    };
  }

  // Validate lifeStage value explicitly
  const validStages = ["school", "college", "job"];
  if (!validStages.includes(lifeStage)) {
    return { error: "Please select a valid focus area." };
  }

  try {
    const client = await clientPromise;
    const db: Db = client.db("mirrorDB");

    const existingUser = await db.collection("users").findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      lifeStage, // stored as "school" | "college" | "job"
      createdAt: new Date(),
      lastActive: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Registration Database Error:", error);
    return {
      error: "System error during registration. Please try again.",
    };
  }
}
