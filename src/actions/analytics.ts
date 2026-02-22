"use server";

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Db } from "mongodb";

export async function getOverallAnalytics() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized access to Private Vault.");

  const client = await clientPromise;
  const db: Db = client.db("mirrorDB");
  const userId = session.user.id as string;

  // ── 1. SOCIAL STREAK (based on any activity: chat or practice) ────────────
  const [chatDates, practiceDates] = await Promise.all([
    db
      .collection("chat_history")
      .aggregate([
        { $match: { userId } },
        {
          $project: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
            },
          },
        },
        { $group: { _id: "$date" } },
      ])
      .toArray(),
    db
      .collection("practice_history")
      .aggregate([
        { $match: { userId } },
        {
          $project: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
            },
          },
        },
        { $group: { _id: "$date" } },
      ])
      .toArray(),
  ]);

  // Merge and deduplicate dates from both collections
  const allDates = [
    ...new Set([
      ...chatDates.map((d) => d._id),
      ...practiceDates.map((d) => d._id),
    ]),
  ].sort((a, b) => b.localeCompare(a));

  let streak = 0;
  if (allDates.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];
    let expectedDate = allDates[0] === today ? today : yesterday;

    for (const date of allDates) {
      if (date === expectedDate) {
        streak++;
        expectedDate = new Date(new Date(expectedDate).getTime() - 86400000)
          .toISOString()
          .split("T")[0];
      } else break;
    }
  }

  // ── 2. CHAT HISTORY METRICS (reflection sessions) ─────────────────────────
  const chatStats = await db
    .collection("chat_history")
    .aggregate([
      { $match: { userId } },
      {
        $facet: {
          totals: [{ $group: { _id: null, count: { $sum: 1 } } }],

          completedSessions: [
            { $match: { stage: { $in: ["FOLLOW_UP", "CLOSED"] } } },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],

          pastReflections: [
            {
              $match: {
                scenarioType: "PAST",
                stage: { $in: ["ASK_SUGGESTION", "FOLLOW_UP", "CLOSED"] },
              },
            },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],

          uniqueScenarios: [
            { $group: { _id: "$scenarioId" } },
            { $count: "total" },
          ],

          recentHistory: [
            { $sort: { timestamp: -1 } },
            { $limit: 5 },
            {
              $project: {
                scenarioId: 1,
                lifeStage: 1,
                timestamp: 1,
                stage: 1,
                scenarioType: 1,
              },
            },
          ],
        },
      },
    ])
    .toArray();

  // ── 3. PRACTICE HISTORY METRICS ───────────────────────────────────────────
  const practiceStats = await db
    .collection("practice_history")
    .aggregate([
      { $match: { userId } },
      {
        $facet: {
          totals: [{ $group: { _id: null, count: { $sum: 1 } } }],

          successfulAttempts: [
            { $match: { isSuccessful: true } },
            { $group: { _id: null, count: { $sum: 1 } } },
          ],

          uniqueScenarios: [
            { $group: { _id: "$scenarioId" } },
            { $count: "total" },
          ],

          attemptsPerScenario: [
            { $group: { _id: "$scenarioId", attempts: { $sum: 1 } } },
            { $group: { _id: null, avgAttempts: { $avg: "$attempts" } } },
          ],
        },
      },
    ])
    .toArray();

  // ── 4. PRACTICE SESSIONS FOR PROGRESS CHART ───────────────────────────────
  const practiceSessionsRaw = await db
    .collection("practice_history")
    .find({ userId })
    .sort({ timestamp: 1 })
    .project({ feedback: 1, timestamp: 1, createdAt: 1 })
    .toArray();

  // ── 5. CALCULATE FINAL METRICS ────────────────────────────────────────────
  const chat = chatStats[0];
  const practice = practiceStats[0];

  const totalChatSessions: number = chat.totals[0]?.count ?? 0;
  const completedChatSessions: number = chat.completedSessions[0]?.count ?? 0;
  const pastReflectionCount: number = chat.pastReflections[0]?.count ?? 0;
  const uniqueChatScenarios: number = chat.uniqueScenarios[0]?.total ?? 0;

  const totalPracticeSessions: number = practice.totals[0]?.count ?? 0;
  const successfulPractice: number = practice.successfulAttempts[0]?.count ?? 0;
  const uniquePracticeScenarios: number =
    practice.uniqueScenarios[0]?.total ?? 0;
  const avgPracticeAttempts: number =
    practice.attemptsPerScenario[0]?.avgAttempts ?? 0;

  const socialComfortRaw =
    totalChatSessions > 0
      ? Math.round((completedChatSessions / totalChatSessions) * 100)
      : 0;
  const socialComfort = `${socialComfortRaw}%`;

  const interactionMaturity =
    avgPracticeAttempts > 0 ? avgPracticeAttempts.toFixed(1) : "0.0";

  const perspectiveInsightRaw =
    totalChatSessions > 0
      ? Math.round((pastReflectionCount / totalChatSessions) * 100)
      : 0;
  const perspectiveInsight = `${perspectiveInsightRaw}%`;

  const totalScenarios = uniqueChatScenarios + uniquePracticeScenarios;

  const rawData = {
    streak,
    socialComfort,
    interactionMaturity,
    perspectiveInsight,
    totalScenarios,
    totalChatSessions,
    totalPracticeSessions,
    successfulPractice,
    history: chat.recentHistory ?? [],
    // ✅ NEW: for ProgressChart — array of { feedback: { clarity_score }, timestamp }
    practiceSessions: practiceSessionsRaw,
  };

  return JSON.parse(JSON.stringify(rawData));
}