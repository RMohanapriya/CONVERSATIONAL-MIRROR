import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { PracticeDashboard } from "./PracticeDashboard";
import { PRACTICE_LIBRARY } from "../library";
import { normalizeLifeStageForLibrary } from "@/lib/utils";

interface PageProps {
  params: Promise<{ ID: string }>;
}

export default async function ScenarioSessionPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/login");

  const { ID } = await params;

  const rawStage = ((session.user as any).lifeStage ?? "college").toLowerCase();
  const normalizedStage = normalizeLifeStageForLibrary(rawStage);

  const stageData =
    PRACTICE_LIBRARY[normalizedStage] ?? PRACTICE_LIBRARY.college;
  const allScenarios = Object.values(stageData).flat();
  const scenario = allScenarios.find((s) => s.id === ID);

  if (!scenario) {
    console.error(`Mission ID "${ID}" not found for stage: ${normalizedStage}`);
    return notFound();
  }

  return (
    <div className="h-screen bg-[#F8FAFC]">
      <PracticeDashboard
        scenarioId={scenario.id}
        scenarioTitle={scenario.title}
        scenarioContext={scenario.context}
      />
    </div>
  );
}
