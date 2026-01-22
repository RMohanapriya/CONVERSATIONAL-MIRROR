"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { School, GraduationCap, Briefcase, UserCircle } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStage, setSelectedStage] = useState(""); 
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedStage) {
      setError("Please select your current focus area.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login?message=Account created! Please sign in.");
    }
  }

  const stages = [
    { id: "school", label: "School", icon: School, desc: "Academic Socializing" },
    { id: "college", label: "College", icon: GraduationCap, desc: "Campus Life" },
    { id: "job", label: "Workplace", icon: Briefcase, desc: "Professional Career" },
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- CONTEXT SELECTION --- */}
        <div className="space-y-4">
          <label className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
            <UserCircle className="w-4 h-4 text-blue-600" />
            Current Focus Area
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stages.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedStage(s.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all duration-300 group ${
                  selectedStage === s.id 
                  ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-xl shadow-blue-100 scale-[1.03]" 
                  : "border-slate-100 bg-white text-slate-400 hover:border-blue-200"
                }`}
              >
                <div className={`p-3 rounded-2xl mb-3 transition-colors ${selectedStage === s.id ? "bg-blue-600 text-white" : "bg-slate-50 group-hover:bg-blue-100"}`}>
                  <s.icon className="w-7 h-7" />
                </div>
                <span className="text-base font-black uppercase tracking-tight">{s.label}</span>
                <span className="text-[10px] font-bold opacity-50 mt-1">{s.desc}</span>
              </button>
            ))}
          </div>
          <input type="hidden" name="lifeStage" value={selectedStage} />
        </div>

        {/* --- USER DETAILS --- */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
              <Input name="name" placeholder="Vignesh" required className="h-12 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
              <Input name="email" type="email" placeholder="vignesh@example.com" required className="h-12 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <Input name="password" type="password" required minLength={6} className="h-12 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-4 rounded-2xl border border-red-100">{error}</p>}
        
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 py-8 text-lg font-black rounded-[1.5rem] shadow-2xl shadow-blue-200 transition-all active:scale-95" 
          disabled={loading}
        >
          {loading ? "INITIALIZING MIRROR..." : "FINISH REGISTRATION"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-medium text-slate-400">
        Member already?{" "}
        <Link href="/login" className="text-blue-600 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}