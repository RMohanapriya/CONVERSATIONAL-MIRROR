import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

/**
 * AnalyticsPage - Server Component
 * * This component acts as the entry point for the Progress Mirror.
 * It manages authentication and extracts the user's life stage
 * to provide context-aware social growth metrics.
 */
export default async function AnalyticsPage() {
  const session = await auth();

  // 1. AUTHENTICATION GUARD
  // Redirects unauthorized users to login to protect the 'Private Vault'
  if (!session) {
    redirect("/login");
  }

  // 2. CONTEXT EXTRACTION
  // Extracts lifeStage (e.g., 'college', 'job') for personalized feedback
  // Using 'any' as a bridge if the Session User type isn't fully extended
  const userStage = (session.user as any).lifeStage || "General";

  return (
    <main className="min-h-screen bg-[#F8FAFC]"> 
      {/* The top padding (pt-20) is handled within AnalyticsDashboard 
        to accommodate the sticky navigation and scroll behavior.
      */}
      <AnalyticsDashboard lifeStage={userStage} />
    </main>
  );
}