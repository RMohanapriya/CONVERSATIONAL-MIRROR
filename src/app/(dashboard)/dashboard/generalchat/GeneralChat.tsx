"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAiResponse } from "@/actions/chat";

export function GeneralChat({ lifeStage }: { lifeStage: string }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: `Hello! I'm your Mirror. Calibrated for ${lifeStage}. What's on your mind?`,
      suggestion: "",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMsg,
        suggestion: "",
      },
    ]);
    setIsLoading(true);

    try {
      // FIX: Call the Server Action directly instead of using fetch
      const data = await getAiResponse({
        message: userMsg,
        lifeStage:
          lifeStage === "school" || lifeStage === "college"
            ? lifeStage
            : "adult",
        scenarioId: "General Chat",
      });

      // Handle the structured JSON response
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.summary, // Main AI output
          suggestion: data.suggestion,
        },
      ]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "The mirror is momentarily hazy. Please try again.",
          suggestion: "",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                    msg.role === "user"
                      ? "bg-slate-50 text-slate-400"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                </div>

                <div
                  className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-5 rounded-[2.2rem] text-[16px] font-medium leading-relaxed border shadow-sm ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white border-indigo-500 rounded-tr-none"
                        : "bg-slate-50 text-slate-800 border-slate-100 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* STRUCTURED OUTPUT: Only show for AI responses with content */}
                  {msg.role === "ai" && msg.suggestion && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-sm text-indigo-900 max-w-sm"
                    >
                      <strong className="block mb-1 text-indigo-600 uppercase text-[10px] tracking-widest">
                        Mirror Suggestion:
                      </strong>
                      {msg.suggestion}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start gap-4 items-center ml-14">
              <div className="bg-white p-3 rounded-full border border-slate-100 flex items-center gap-2 shadow-sm">
                <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Mirror is reflecting...
                </span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        <form
          onSubmit={handleSendMessage}
          className="flex gap-4 max-w-4xl mx-auto items-center"
        >
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Talk to the mirror..."
              className="h-16 rounded-[2.2rem] border-none bg-white shadow-inner pl-14 pr-8 text-lg focus-visible:ring-indigo-500"
            />
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <Paperclip size={22} />
            </button>
          </div>

          <button
            type="button"
            className="h-16 w-16 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
          >
            <Mic size={22} />
          </button>

          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-16 w-16 rounded-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shrink-0"
          >
            <Send className="w-6 h-6 text-white" />
          </Button>
        </form>
      </div>
    </div>
  );
}
