"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Briefcase,
  School,
  ArrowLeft,
  Loader2,
  Lock,
  Mail,
  User,
  Sparkles,
} from "lucide-react";
import { registerUser } from "@/actions/register";
import Link from "next/link";

function RegisterFormContent() {
  const [stage, setStage] = useState<"school" | "college" | "job" | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const stages = [
    { id: "school" as const, label: "School", icon: School },
    { id: "college" as const, label: "College", icon: GraduationCap },
    { id: "job" as const, label: "Workplace", icon: Briefcase },
  ];

  async function handleSubmit(formData: FormData) {
    if (!stage) {
      setError("Please select your current life stage.");
      return;
    }

    setLoading(true);
    setError("");
    formData.append("lifeStage", stage);

    try {
      const result = await registerUser(formData);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Consistent redirect with message parameter
        router.push("/login?message=Account created! Please sign in.");
      }
    } catch {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => {
              setStage(s.id);
              setError("");
            }}
            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center group relative ${
              stage === s.id
                ? "border-indigo-600 bg-indigo-50 shadow-md scale-[1.02]"
                : "border-slate-100 bg-white hover:border-indigo-200"
            }`}
          >
            <div
              className={`p-4 rounded-2xl mb-3 transition-colors ${
                stage === s.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-50 text-slate-400 group-hover:text-indigo-400"
              }`}
            >
              <s.icon className="w-6 h-6" />
            </div>
            <span
              className={`font-black text-xs uppercase tracking-widest ${
                stage === s.id ? "text-indigo-600" : "text-slate-800"
              }`}
            >
              {s.label}
            </span>
            {stage === s.id && (
              <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            className="w-full pl-12 p-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full pl-12 p-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            name="password"
            type="password"
            placeholder="Create Password (min 6 chars)"
            required
            minLength={6}
            className="w-full pl-12 p-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100 text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={!stage || loading}
          className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 text-lg font-black transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-2xl">
        <Link
          href="/login"
          className="inline-flex items-center text-slate-400 hover:text-indigo-600 font-bold text-sm mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <Card className="shadow-2xl border-none rounded-[3.5rem] bg-white p-10 overflow-hidden">
          <CardHeader className="text-center space-y-2 mb-6">
            <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
              Conversational Mirror
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium text-base">
              Select your environment to calibrate the Mirror.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Suspense
              fallback={
                <div className="h-64 animate-pulse bg-slate-50 rounded-3xl" />
              }
            >
              <RegisterFormContent />
            </Suspense>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-sm font-medium text-slate-400">
          Already a member?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
