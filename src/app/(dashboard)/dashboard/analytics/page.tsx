import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { getOverallAnalytics } from "@/actions/analytics";

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  // Fetch on the server - eliminates client waterfall
  const data = await getOverallAnalytics();
  const userStage = (session.user as any).lifeStage || "General";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <AnalyticsDashboard lifeStage={userStage} data={data} />
    </main>
  );
}
