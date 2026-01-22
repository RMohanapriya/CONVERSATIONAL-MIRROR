import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
// FIXED: Capital 'C' to match your filename ChatDashboard.tsx
import { ChatDashboard } from "../../generalchat/ChatDashboard"; 
import { PRACTICE_LIBRARY } from "../library";

interface PageProps {
  params: Promise<{ ID: string }>;
}

export default async function ScenarioSessionPage({ params }: PageProps) {
  const session = await auth();
  
  // 1. Security Guard
  if (!session) redirect("/login");

  // 2. Await the dynamic parameters (Next.js 15 standard)
  const { ID } = await params;

  // 3. Extract user context
  const userStage = (session.user as any).lifeStage || "college";
  const stageKey = userStage.toLowerCase();
  
  // 4. Access the library
  const stageData = PRACTICE_LIBRARY[stageKey] || PRACTICE_LIBRARY.college;
  
  // 5. Flatten categories and find the specific scenario ID (e.g., c-s4)
  const allScenarios = Object.values(stageData).flat();
  const scenario = allScenarios.find((s) => s.id === ID);

  // 6. Handle missing scenarios
  if (!scenario) {
    console.error(`Scenario ID "${ID}" not found for stage "${stageKey}"`);
    return notFound();
  }

  return (
    <div className="h-screen bg-[#F8FAFC]">
       {/* Passing the Mission Context to the AI Mirror */}
       <ChatDashboard 
         userStage={userStage} 
         scenarioId={scenario.id} 
         scenarioContext={scenario.context} 
         isPractice={true} 
       />
    </div>
  );
}