"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

export default function ProgressChart({ data }: { data: any[] }) {
  const chartData = data.map((item, index) => ({
    session: `Session ${index + 1}`,
    momentum: item.feedback.clarity_score || 5, 
  })).slice(-7);

  return (
    <Card className="w-full h-[380px] border-none shadow-xl bg-white rounded-[3rem] p-6 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-slate-800 text-xl font-black tracking-tight">
            My Practice Pulse
          </CardTitle>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Visualizing your commitment to growth
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
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            {/* 1. HIDE THE NUMBERS: No Y-Axis tick values means no "failing grade" */}
            <YAxis hide domain={[0, 12]} /> 
            <XAxis dataKey="session" hide />
            
            <Tooltip 
              cursor={false}
              content={({ active }) => {
                if (active) return (
                  <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Session Complete ✨
                  </div>
                );
                return null;
              }}
            />

            {/* 2. SOFT, FLOWING AREA: Use a thick, rounded line */}
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
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Consistency</span>
          <span className="text-lg font-bold text-indigo-700">7-Day Streak</span>
        </div>
        <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100/50">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-1">Insight</span>
          <span className="text-lg font-bold text-emerald-700">Deepening</span>
        </div>
      </div>
    </Card>
  );
}