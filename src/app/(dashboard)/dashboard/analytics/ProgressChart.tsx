"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface SessionData {
  feedback?: {
    clarity_score?: number;
  };
  timestamp?: string;
  createdAt?: string;
}

interface ChartPoint {
  session: string;
  momentum: number;
  date: string;
}

export default function ProgressChart({ data }: { data: SessionData[] }) {
  const chartData: ChartPoint[] = data
    .filter((item) => item.feedback?.clarity_score != null) // ✅ skip sessions without scores
    .slice(-7)
    .map((item, index) => {
      const rawDate = item.timestamp ?? item.createdAt;
      const date = rawDate
        ? new Date(rawDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : `Session ${index + 1}`;

      return {
        session: `S${index + 1}`,
        momentum: item.feedback?.clarity_score ?? 5, // ✅ safe access
        date,
      };
    });

  // ── real stats ────────────────────────────────────────────────────────────
  const totalSessions = data.length;
  const scoredSessions = data.filter((d) => d.feedback?.clarity_score != null);
  const avgScore =
    scoredSessions.length > 0
      ? Math.round(
          scoredSessions.reduce(
            (sum, d) => sum + (d.feedback?.clarity_score ?? 0),
            0
          ) / scoredSessions.length
        )
      : 0;

  const trend =
    chartData.length >= 2
      ? chartData[chartData.length - 1].momentum >
        chartData[chartData.length - 2].momentum
        ? "Rising"
        : chartData[chartData.length - 1].momentum <
            chartData[chartData.length - 2].momentum
          ? "Steadying"
          : "Holding"
      : "Starting";

  // ── empty state ───────────────────────────────────────────────────────────
  if (chartData.length === 0) {
    return (
      <Card className="w-full h-[380px] border-none shadow-xl bg-white rounded-[3rem] p-6 flex flex-col items-center justify-center gap-4">
        <div className="p-4 bg-rose-50 rounded-2xl">
          <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
        </div>
        <p className="text-slate-400 text-sm font-bold text-center">
          Complete your first practice session
          <br />
          to see your pulse here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full h-[380px] border-none shadow-xl bg-white rounded-[3rem] p-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-slate-800 text-xl font-black tracking-tight">
            My Practice Pulse
          </CardTitle>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Last {chartData.length} session{chartData.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="p-3 bg-rose-50 rounded-2xl">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        </div>
      </CardHeader>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis hide domain={[0, 12]} />
            <XAxis dataKey="session" hide />

            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const point = payload[0].payload as ChartPoint;
                  return (
                    <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {point.date} · Score {point.momentum}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="momentum"
              stroke="#6366f1"
              strokeWidth={6}
              strokeLinecap="round"
              fill="url(#colorPulse)"
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-50 rounded-3xl border border-indigo-100/50">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">
            Sessions
          </span>
          <span className="text-lg font-bold text-indigo-700">
            {totalSessions} Total
          </span>
        </div>
        <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100/50">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
            Trend
          </span>
          <span className="text-lg font-bold text-emerald-700">
            {trend} · Avg {avgScore}
          </span>
        </div>
      </div>
    </Card>
  );
}