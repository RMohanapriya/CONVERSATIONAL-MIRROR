import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { name, email, password, lifeStage } = await req.json();

    const client = await clientPromise;
    // Updated to match mirrorDB
    const db = client.db("mirrorDB");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      lifeStage,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}