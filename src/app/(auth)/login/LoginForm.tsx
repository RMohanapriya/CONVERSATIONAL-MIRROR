"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // ✅ Moving this here prevents the "Blocking Route" error
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      {message && (
        <p className="text-green-600 text-sm bg-green-50 p-3 rounded-xl text-center font-medium">
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <Input name="email" type="email" placeholder="name@example.com" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <Input name="password" type="password" required />
        </div>
        
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg rounded-2xl" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 font-medium hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
}