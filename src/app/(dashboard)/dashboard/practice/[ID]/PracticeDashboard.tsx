"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  ArrowLeft,
  Loader2,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPracticeResponse } from "@/actions/practice";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage, PracticeResponse } from "../../../../../../types";

export function PracticeDashboard({
  scenarioId,
  scenarioTitle,
  scenarioContext,
  lifeStage,
}: {
  scenarioId: string;
  scenarioTitle: string;
  scenarioContext: string;
  lifeStage: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState(""); // ✅ track last suggestion
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || hasSucceeded) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const response: PracticeResponse = await getPracticeResponse({
        userMessage: userMsg,
        scenarioContext,
        scenarioId,
        lifeStage,
        lastSuggestion, // ✅ pass for copy-paste detection
      });

      if (response.isSuccessful) setHasSucceeded(true);

      setLastSuggestion(response.suggestion || ""); // ✅ update for next turn

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.reflection,
          suggestion: response.suggestion || "",
        },
      ]);
    } catch (error) {
      console.error("Practice Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Mirror encountered an error. Please try your response again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetPractice = () => {
    setMessages([]);
    setHasSucceeded(false);
    setInput("");
    setLastSuggestion(""); // ✅ reset on restart
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <nav className="p-4 bg-white border-b flex items-center justify-between shadow-sm sticky top-0 z-10">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-indigo-600 p-2 rounded-full transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">
            Exit to Home
          </span>
        </Link>

        <div className="text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Mission Rehearsal
          </h2>
          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px]">
            {scenarioTitle}
          </p>
        </div>

        <div className="w-10 md:w-24" />
      </nav>

      {/* MESSAGES */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-[2.5rem] p-8 text-center shadow-inner"
          >
            <Sparkles className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">
              The Situation
            </h3>
            <p className="text-indigo-900 font-semibold italic text-base leading-relaxed">
              "{scenarioContext}"
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-[85%] md:max-w-[75%] space-y-3">
                  <div
                    className={`p-6 rounded-[2rem] font-medium shadow-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-100"
                        : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "ai" && msg.suggestion && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-5 rounded-3xl border-2 bg-white border-indigo-100 flex gap-4 shadow-sm"
                    >
                      <Sparkles
                        className="text-indigo-500 shrink-0 mt-1"
                        size={18}
                      />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                          Rehearsal Script
                        </p>
                        <p className="text-sm font-bold text-slate-800 leading-snug">
                          {msg.suggestion}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Analyzing response...
                </span>
              </div>
            </div>
          )}

          {hasSucceeded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-black uppercase tracking-tighter text-sm shadow-xl shadow-emerald-100">
                <CheckCircle2 size={18} />
                Practice Complete
              </div>

              <div className="flex flex-col items-center gap-3 pt-4">
                <Button
                  onClick={resetPractice}
                  variant="ghost"
                  className="text-indigo-600 font-bold text-xs uppercase tracking-widest hover:bg-indigo-50"
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  Try another approach
                </Button>

                <Link
                  href="/dashboard/practice"
                  className="text-slate-400 text-xs font-medium hover:underline"
                >
                  Return to Practice Hub
                </Link>
              </div>
            </motion.div>
          )}

          <div ref={scrollRef} className="h-20" />
        </div>
      </main>

      {/* INPUT */}
      <footer
        className={`p-6 bg-white border-t transition-all duration-500 ${
          hasSucceeded
            ? "opacity-40 grayscale pointer-events-none"
            : "opacity-100"
        }`}
      >
        <form
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto flex items-center gap-4"
        >
          <input
            autoFocus
            disabled={hasSucceeded || isTyping}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              hasSucceeded
                ? "Social goal reached."
                : "Type your spoken response here..."
            }
            className="flex-1 h-14 px-8 rounded-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 outline-none font-medium text-slate-700 transition-all shadow-inner"
          />
          <Button
            type="submit"
            disabled={isTyping || hasSucceeded || !input.trim()}
            className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-95 transition-transform shrink-0"
          >
            {isTyping ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <Send size={20} className="text-white" />
            )}
          </Button>
        </form>
      </footer>
    </div>
  );
}