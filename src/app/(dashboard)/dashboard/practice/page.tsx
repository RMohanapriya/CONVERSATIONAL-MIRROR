import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PRACTICE_LIBRARY } from "./library"; 

export default async function PracticeEntryPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const userStage = (session.user as any).lifeStage?.toLowerCase() || "college";
  const stageData = PRACTICE_LIBRARY[userStage] || PRACTICE_LIBRARY.college;

  // Flatten the library to pick any random scenario
  const allScenarios = Object.values(stageData).flat();
  const randomScenario = allScenarios[Math.floor(Math.random() * allScenarios.length)];

  // Jump to the dynamic session page
  redirect(`/dashboard/practice/${randomScenario.id}`);
}