"use client";

import { signOut } from "next-auth/react";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * SignOutButton Component
 * Purpose: Securely invalidates the session and redirects to the authentication portal.
 * Design Choice: Uses a rose-toned hover state to visually signal an "Exit" action,
 * following the project's high-legibility and soft-contrast guidelines.
 */
export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    // atomic sign-out: invalidates JWT and redirects to login
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      variant="ghost"
      disabled={loading}
      onClick={handleSignOut}
      className={`
        flex items-center gap-2 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest text-[10px] h-12 px-6
        ${loading 
          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
          : "text-slate-500 hover:text-rose-600 hover:bg-rose-50 hover:shadow-lg hover:shadow-rose-100 active:scale-95 border border-transparent hover:border-rose-100"
        }
      `}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      ) : (
        <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      )}
      
      <span>{loading ? "Cleaning Session..." : "Exit Mirror"}</span>
    </Button>
  );
}