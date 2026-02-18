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

  // 1. CALCULATE SOCIAL STREAK
  const historyDates = await db
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
      { $sort: { _id: -1 } },
    ])
    .toArray();

  let streak = 0;
  if (historyDates.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];
    let expectedDate = historyDates[0]._id === today ? today : yesterday;

    for (const entry of historyDates) {
      if (entry._id === expectedDate) {
        streak++;
        expectedDate = new Date(new Date(expectedDate).getTime() - 86400000)
          .toISOString()
          .split("T")[0];
      } else break;
    }
  }

  // 2. FETCH GROWTH METRICS & HISTORY
  const stats = await db
    .collection("chat_history")
    .aggregate([
      { $match: { userId } },
      {
        $facet: {
          totals: [{ $group: { _id: null, count: { $sum: 1 } } }],
          recentHistory: [
            { $sort: { timestamp: -1 } },
            { $limit: 5 },
            {
              $project: {
                scenarioId: 1,
                lifeStage: 1,
                timestamp: 1,
                isPractice: 1,
              },
            },
          ],
        },
      },
    ])
    .toArray();

  const totalSessions: number = stats[0]?.totals[0]?.count ?? 0;

  const rawData = {
    streak,
    socialComfort: totalSessions > 5 ? "+28%" : "+5%",
    interactionMaturity: (totalSessions * 0.4).toFixed(1),
    perspectiveInsight: totalSessions > 10 ? "+65%" : "+12%",
    totalScenarios: totalSessions,
    history: stats[0]?.recentHistory ?? [],
  };

  return JSON.parse(JSON.stringify(rawData));
}
