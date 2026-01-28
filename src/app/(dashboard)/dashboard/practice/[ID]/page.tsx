import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { PracticeDashboard } from "./PracticeDashboard"; 
import { PRACTICE_LIBRARY } from "../library";

interface PageProps {
  params: Promise<{ ID: string }>; // Required for Next.js 15
}

export default async function ScenarioSessionPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/login");

  // 1. Resolve Dynamic Segment
  const { ID } = await params;

  // 2. Identify User's Life Stage
  const userStage = ((session.user as any).lifeStage || "college").toLowerCase();
  
  // 3. Navigate the Scenario Library
  const stageData = PRACTICE_LIBRARY[userStage] || PRACTICE_LIBRARY.college;
  const allScenarios = Object.values(stageData).flat();
  const scenario = allScenarios.find((s) => s.id === ID);

  // 4. Fail Gracefully
  if (!scenario) {
    console.error(`Mission ID "${ID}" not found for: ${userStage}`);
    return notFound();
  }

  return (
    <div className="h-screen bg-[#F8FAFC]">
      {/* 5. Initialize the Client-Side Behavioral Coach */}
      <PracticeDashboard
        userStage={userStage}
        scenarioId={scenario.id}
        scenarioTitle={scenario.title}
        scenarioContext={scenario.context}
      />
    </div>
  );
}