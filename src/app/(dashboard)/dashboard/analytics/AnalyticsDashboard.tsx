"use client";

import { useState, useEffect } from "react";
import { getOverallAnalytics } from "@/actions/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
  Sparkles, Compass, Zap, Smile, ShieldCheck, 
  ArrowLeft, BarChart3, CheckCircle2, Clock, Globe, Flame,
  TrendingUp, Info
} from "lucide-react";

export function AnalyticsDashboard({ lifeStage }: { lifeStage: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const result = await getOverallAnalytics();
      setData(result);
    }
    load();
  }, []);

  if (!data) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" 
      />
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Calibrating Progress Mirror...</p>
    </div>
  );

  const metrics = [
    { title: "Social Comfort", val: data.socialComfort, icon: Smile, col: "text-emerald-600", bg: "bg-emerald-50", desc: "Ease in navigating conversations" },
    { title: "Interaction Maturity", val: `+${data.interactionMaturity}`, icon: Compass, col: "text-indigo-600", bg: "bg-indigo-50", desc: "Adaptive social responses" },
    { title: "Perspective Insight", val: data.perspectiveInsight, icon: Zap, col: "text-blue-600", bg: "bg-blue-50", desc: "Understanding unspoken cues" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* --- 1. STICKY NAVIGATION --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-widest transition-all group shrink-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </Link>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <BarChart3 className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 uppercase tracking-tighter text-sm">Progress Mirror</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Private Vault</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 space-y-12 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* --- 2. HEADER & STREAK --- */}
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
              <Sparkles className="w-3 h-3" /> My Growth Journey
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Personal Social <span className="text-blue-600">Insights</span>
            </h2>
            <p className="text-slate-500 font-medium">
              Tracking your style evolution in <span className="text-indigo-600 font-bold">{lifeStage}</span> practice sessions.
            </p>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <Flame className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1 leading-none">Social Streak</p>
              <p className="text-3xl font-black text-orange-600">{data.streak} Days Consistent</p>
            </div>
          </motion.div>
        </div>

        {/* --- 3. STRENGTH-BASED CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="p-10 rounded-[3rem] border-none shadow-xl bg-white flex flex-col items-center group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-slate-100 group-hover:text-slate-200 transition-colors">
                  <TrendingUp size={40} />
                </div>
                <div className={`p-4 rounded-2xl mb-6 ${m.bg} ${m.col}`}>
                  <m.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-6xl font-black mb-2 tracking-tighter ${m.col}`}>{m.val}</h3>
                <p className="font-bold text-slate-800 text-lg mb-1">{m.title}</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest text-center">{m.desc}</p>
                
                <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-2">
                   <Info className="w-3 h-3 text-slate-300" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Based on {data.totalScenarios} Sessions</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* --- 4. MASTERED HISTORY --- */}
        <Card className="p-10 rounded-[3.5rem] bg-white border-none shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Mastered Scenarios</h3>
            <div className="px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Private Reflection Log
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Scenario</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</th>
                  <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.history.length > 0 ? (
                  data.history.map((s: any, i: number) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-6 font-bold text-slate-700">{s.scenarioId}</td>
                      <td className="py-6">
                        <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {s.isPractice ? <Clock size={14} className="text-indigo-400" /> : <Globe size={14} className="text-emerald-400" />}
                          {s.isPractice ? "Practice Hub" : "Social Sandbox"}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                          <CheckCircle2 size={14} /> Complete
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-slate-400 font-medium italic">
                      No scenarios mastered yet. Your journey begins in the Hub.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}