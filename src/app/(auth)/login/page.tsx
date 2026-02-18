"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function LoginFormContent() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.refresh();
        router.push("/dashboard");
      }
    } catch {
      setError("Something went wrong. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* Logo and Welcome Section */}
      <div className="text-center mb-10">
        <div className="inline-flex p-4 bg-indigo-600 rounded-3xl mb-4 shadow-xl shadow-indigo-100">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
          Conversational <br /> Mirror
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Sign in to start your practice.
        </p>
      </div>

      {/* Success Message from Registration */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 text-xs font-bold mb-6"
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="pl-14 h-16 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-50 transition-all text-lg font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="pl-14 h-16 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-50 transition-all text-lg font-medium"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 text-xs font-bold"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-lg font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
          ) : (
            "Enter the Mirror"
          )}
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-500 text-sm font-medium">
          New to the platform?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-black hover:underline underline-offset-4"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-10 md:p-12 rounded-[3.5rem] border-none shadow-2xl bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
          {/* Suspense required because useSearchParams is used inside */}
          <Suspense
            fallback={
              <div className="h-96 animate-pulse bg-slate-50 rounded-3xl" />
            }
          >
            <LoginFormContent />
          </Suspense>
        </Card>
      </motion.div>
    </div>
  );
}
