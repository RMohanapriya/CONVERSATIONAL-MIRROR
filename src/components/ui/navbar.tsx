"use client";

import { signOut, useSession } from "next-auth/react";
import { Bot, LogOut, UserCircle, LayoutDashboard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Determine if we are on a sub-page of the dashboard
  const isDashboardRoot = pathname === "/dashboard";
  const currentPathName = pathname.split("/").pop();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex justify-between items-center transition-all">
      {/* BRANDING & BREADCRUMBS */}
      <div className="flex items-center gap-4 group">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-800 uppercase">
            Mirror <span className="text-primary">AI</span>
          </span>
        </Link>

        {/* Dynamic Breadcrumb for Navigation Context */}
        {!isDashboardRoot && currentPathName && (
          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <ChevronRight className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              {currentPathName.replace("chat", "Chat")}
            </span>
          </div>
        )}
      </div>

      {/* USER CONTEXT & ACTIONS */}
      <div className="flex items-center gap-6">
        {session?.user && (
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <UserCircle className="w-5 h-5 text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest leading-none mb-1">
                {(session.user as any).lifeStage || "Student"} Mode
              </span>
              <span className="text-xs font-bold text-slate-700">{session.user.name}</span>
            </div>
          </div>
        )}

        <Button 
          variant="ghost" 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-2xl font-black text-[10px] uppercase tracking-widest gap-2 h-10 px-5"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
}