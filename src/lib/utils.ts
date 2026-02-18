import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { LifeStage, NormalizedLifeStage } from "../../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes the lifeStage value stored in the DB ("job", "workplace", etc.)
 * to the values accepted by the AI prompting layer ("school" | "college" | "adult").
 */
export function normalizeLifeStageForAI(stage: string): LifeStage {
  if (stage === "school") return "school";
  if (stage === "college") return "college";
  return "adult"; // covers "job", "workplace", undefined
}

/**
 * Normalizes the lifeStage value to match the PRACTICE_LIBRARY keys.
 * DB stores "job"; library uses "job" (after our fix to library.tsx).
 */
export function normalizeLifeStageForLibrary(
  stage: string,
): NormalizedLifeStage {
  if (stage === "school") return "school";
  if (stage === "college") return "college";
  return "job"; // covers "job", "workplace", "adult", undefined
}
