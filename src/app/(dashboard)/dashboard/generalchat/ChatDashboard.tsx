"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAiResponse } from "@/actions/chat";

interface Message {
  role: "user" | "ai";
  content: string;
  suggestion?: string;
}

export function ChatDashboard({ lifeStage }: { lifeStage: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `Hello! I'm your Mirror. Calibrated for ${lifeStage}. What's on your mind?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        handleSendMessage(e as any);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const maxHeight = 96;
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
  }, [input]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getAiResponse({
        message: userMsg,
        scenarioId: "General Chat",
        lifeStage:
          lifeStage === "school" || lifeStage === "college"
            ? lifeStage
            : "adult",
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.summary || "",
          suggestion: response.suggestion || "",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "The mirror is momentarily hazy. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* --- ANALYTICS-STYLE NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 h-16 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-widest transition-all group shrink-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </Link>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 uppercase tracking-tighter text-lg">
            Social Sandbox
          </span>
        </div>
      </nav>

      {/* --- MESSAGES --- */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-4 max-w-[85%] ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                      msg.role === "user"
                        ? "bg-slate-50 text-slate-400"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={20} />
                    ) : (
                      <Bot size={20} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div
                      className={`p-5 rounded-[2.2rem] text-[16px] font-medium leading-relaxed border shadow-sm ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white border-indigo-500 rounded-tr-none"
                          : "bg-white text-slate-800 border-slate-100 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {msg.role === "ai" && msg.suggestion && (
                      <div className="mt-2 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-sm text-indigo-900 max-w-sm">
                        <strong className="block mb-1 text-indigo-600 uppercase text-[10px] tracking-widest">
                          Mirror Suggestion
                        </strong>
                        {msg.suggestion}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              Mirror is reflecting…
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </main>

      {/* --- INPUT --- */}
      <footer className="sticky bottom-0 w-full py-4 px-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-center gap-3"
        >
          <div className="flex items-end flex-1 min-h-[3.5rem] rounded-[1.75rem] bg-slate-100 border border-slate-200 px-2 py-2 shadow-outer focus-within:ring-2 focus-within:ring-indigo-500 transition-[height] duration-150 ease-out">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Talk to the mirror…"
              rows={1}
              className="flex-1 resize-none bg-transparent border-none px-4 py-2 text-[17px] font-medium leading-relaxed focus:outline-none overflow-y-auto transition-[height] duration-150 ease-out"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}
