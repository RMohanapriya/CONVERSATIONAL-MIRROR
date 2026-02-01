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
  if (!session) {
    redirect("/login");
  }

  const userStage = (session.user as any).lifeStage || "General";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <AnalyticsDashboard lifeStage={userStage} />
    </main>
  );
}
