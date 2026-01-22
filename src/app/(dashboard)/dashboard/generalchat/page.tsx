import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ChatDashboard } from "./ChatDashboard"; 
import { LayoutDashboard } from "lucide-react";

export default async function GeneralChatPage() {
  const session = await auth();
  
  if (!session) redirect("/login");

  const userStage = (session.user as any).lifeStage || "college";

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      
      {/* --- 1. CLEAN PAGE HEADER --- */}
      {/* We removed the <Link> from the right corner here to avoid redundancy */}
      <nav className="px-8 py-6 bg-white/50 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
              Social Sandbox
            </h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Theory of Mind Training
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <LayoutDashboard className="w-4 h-4 text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
              Live Mode
            </span>
          </div>
        </div>
      </nav>

      {/* --- 2. CENTERED DASHBOARD --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-5xl">
          {/* The White Box Dashboard */}
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/40 border border-slate-100 overflow-hidden h-[780px] w-full">
            {/* This component contains its own internal "Back to Hub" 
                link on the left, which is sufficient for navigation.
            */}
            <ChatDashboard 
              userStage={userStage} 
              isPractice={false} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}