import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PRACTICE_LIBRARY } from "./library";
import { normalizeLifeStageForLibrary } from "@/lib/utils";

export default async function PracticeEntryPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const rawStage = (session.user as any).lifeStage ?? "college";
  const normalizedStage = normalizeLifeStageForLibrary(rawStage);

  const stageData =
    PRACTICE_LIBRARY[normalizedStage] ?? PRACTICE_LIBRARY.college;
  const allScenarios = Object.values(stageData).flat();
  const randomScenario =
    allScenarios[Math.floor(Math.random() * allScenarios.length)];

  redirect(`/dashboard/practice/${randomScenario.id}`);
}
