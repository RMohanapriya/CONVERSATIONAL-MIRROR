import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ChatDashboard } from "./ChatDashboard";

export default async function GeneralChatPage() {
  const session = await auth();

  if (!session) redirect("/login");

  const userStage = (session.user as any).lifeStage || "college";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <ChatDashboard lifeStage={userStage} />
    </main>
  );
}
