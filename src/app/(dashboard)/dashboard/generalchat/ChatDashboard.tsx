"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  ArrowLeft,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Paperclip,
  Mic,
  MicOff,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAiResponse } from "@/actions/chat";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
  reflection?: string;
  reassurance?: string;
  suggestion?: string;
  attachment?: string;
}

export function ChatDashboard({
  userStage,
  scenarioId,
  scenarioContext,
  isPractice = false,
}: {
  userStage: string;
  scenarioId?: string;
  scenarioContext?: string;
  isPractice?: boolean;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPractice) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAttachedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !attachedImage) || isTyping) return;

    const userMsg = input.trim();
    const currentImg = attachedImage;

    setInput("");
    setAttachedImage(null);
    setIsRecording(false);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content:
          userMsg ||
          (currentImg
            ? "Shared a social artifact for decoding"
            : "Voice message sent"),
        attachment: currentImg || undefined,
      },
    ]);

    setIsTyping(true);

    try {
      const response = await getAiResponse({
        message: userMsg,
        lifeStage: userStage,
        scenarioId: scenarioId || "General",
        scenarioContext: scenarioContext || "General open-ended conversation.",
        isPractice: isPractice,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.reflection,
          reassurance: response.reassurance,
          suggestion: response.suggestion,
        },
      ]);
    } catch (error) {
      console.error("Mirror Connection Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] relative">
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-widest group shrink-0"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back to Hub</span>
        </Link>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 uppercase tracking-tighter text-sm">
            {isPractice ? `Mirror: ${scenarioId}` : "Social Sandbox"}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 shadow-sm shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">
            {userStage} Mode
          </span>
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && isPractice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-8 border-dashed border-2 border-indigo-200 bg-indigo-50/50 rounded-[2.5rem] text-center">
                <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
                <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight mb-2">
                  Mission Brief
                </h2>
                <p className="text-indigo-700 font-medium italic">
                  "{scenarioContext}"
                </p>
              </Card>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%] gap-4`}
                >
                  {msg.attachment && (
                    <img
                      src={msg.attachment}
                      alt="Context"
                      className="w-64 rounded-2xl shadow-sm border border-slate-200"
                    />
                  )}

                  <div
                    className={`p-6 rounded-[2rem] font-medium shadow-sm leading-relaxed ${msg.role === "user" ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white border text-slate-700 rounded-tl-none"}`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "ai" && (
                    <div className="flex flex-col gap-3 w-full animate-in fade-in slide-in-from-left-2 duration-500">
                      {/* Reassurance/Validation Block */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 flex items-start gap-3"
                      >
                        <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600 shrink-0">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <span className="block text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">
                            Validation
                          </span>
                          <p className="text-[11px] font-bold text-emerald-800 italic leading-tight">
                            "{msg.reassurance}"
                          </p>
                        </div>
                      </motion.div>

                      {/* Suggestion/Action Block */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 shadow-sm flex items-start gap-3"
                      >
                        <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600 shrink-0">
                          <Sparkles size={16} />
                        </div>
                        <div>
                          <span className="block text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">
                            Next Step
                          </span>
                          <p className="text-[11px] font-bold text-blue-800 leading-tight">
                            Try: {msg.suggestion}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white px-6 py-4 rounded-[2rem] shadow-sm flex items-center gap-3 border border-slate-100">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Consulting Mirror...
                </span>
              </div>
            </motion.div>
          )}
          <div ref={scrollRef} className="h-4" />
        </div>
      </main>

      <div className="sticky bottom-0 w-full bg-white pt-4 pb-8 px-6 border-t border-slate-100">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex items-center gap-3"
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() =>
              isPractice
                ? setIsRecording(!isRecording)
                : fileInputRef.current?.click()
            }
            className={`p-4 rounded-full transition-all border-2 ${isRecording ? "bg-rose-100 text-rose-600 border-rose-200 animate-pulse ring-4 ring-rose-50" : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"}`}
          >
            {isPractice ? (
              isRecording ? (
                <MicOff size={24} />
              ) : (
                <Mic size={24} />
              )
            ) : (
              <Paperclip size={24} />
            )}
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isPractice
                ? "Practice your response..."
                : "Upload or ask the mirror..."
            }
            className="flex-1 h-16 px-8 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-indigo-500 outline-none font-medium transition-all"
          />

          <Button
            type="submit"
            disabled={isTyping || (!input.trim() && !attachedImage)}
            className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shrink-0"
          >
            {isTyping ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              <Send className="w-6 h-6 text-white" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
