import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  MessageCircle,
  Target,
  BarChart3,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/login");

  const userStage = (session.user as any).lifeStage || "college";
  const userName = session.user.name || "Practitioner";

  const modules = [
    {
      title: "General Chat",
      desc: "An open-ended sandbox to practice any conversation with real-time AI mirroring.",
      href: "/dashboard/generalchat",
      icon: MessageCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Practice Hub",
      // Academic Justification: Context-awareness for Level 1 ASD (Article 2)
      desc: `Launch a randomized social scenario calibrated for your ${userStage} environment.`,
      // FIXED: Changed from /practice/start to /practice to prevent 404s
      href: "/dashboard/practice",
      icon: Target,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Analytics",
      desc: "Track your social progress, reflection accuracy, and metacognitive trends.",
      href: "/dashboard/analytics",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <nav className="px-8 py-2 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-lg tracking-tighter text-slate-800 uppercase">
            Conversational Mirror
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-slate-400">
            Mode: <span className="text-indigo-600">{userStage}</span>
          </div>
          <SignOutButton />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto pt-12 px-6">
        <header className="space-y-2 mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome, <span className="text-indigo-600">{userName}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg italic">
            Your personal space for social reflection. Select a module to
            continue.
          </p>
        </header>

        <div className="space-y-4">
          {modules.map((m) => (
            <Link key={m.title} href={m.href} className="block">
              <div className="group bg-white p-4 pr-6 rounded-[3rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 flex items-center gap-5 border border-white hover:border-indigo-100 hover:scale-[1.01] active:scale-[0.99]">
                <div
                  className={`w-24 h-24 ${m.bg} rounded-[2rem] flex items-center justify-center shrink-0 group-hover:scale-95 transition-transform duration-500`}
                >
                  <m.icon className={`${m.color} w-10 h-10`} />
                </div>

                <div className="flex-grow py-4">
                  <h3 className="text-xl font-black text-slate-800 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-auto">
                    {m.desc}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
