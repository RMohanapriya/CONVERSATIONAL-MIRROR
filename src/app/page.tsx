import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Root Page Controller
 * Handles the initial entry point of the Conversational Mirror.
 */
export default async function RootPage() {
  // Check the server-side session using NextAuth
  const session = await auth();

  // 1. SECURITY GUARD: If NO session exists, redirect to login
  if (!session) {
    redirect("/login");
  }

  // 2. FLOW OPTIMIZATION: If already logged in, skip to dashboard
  // This prevents the user from having to sign in every time they visit.
  redirect("/dashboard");
}